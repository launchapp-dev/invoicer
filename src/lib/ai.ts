"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type { CashFlowData } from "@/lib/storage";

const LineItemSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
});

const ParsedInvoiceSchema = z.object({
  recipientName: z.string(),
  recipientEmail: z.string().optional(),
  lineItems: z.array(LineItemSchema).min(1),
  paymentTerms: z.string(),
  notes: z.string().optional(),
});

export type ParsedInvoice = z.infer<typeof ParsedInvoiceSchema>;

function fmtAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export async function getCashFlowInsight(data: CashFlowData): Promise<string> {
  const fallback = [
    data.expectedThisMonthCount > 0
      ? `You have ${data.expectedThisMonthCount} ${data.expectedThisMonthCount === 1 ? "invoice" : "invoices"} totaling ${fmtAmount(data.expectedThisMonth, data.currency)} due this month.`
      : null,
    data.atRiskCount > 0
      ? `${data.atRiskCount} ${data.atRiskCount === 1 ? "invoice" : "invoices"} totaling ${fmtAmount(data.atRisk, data.currency)} ${data.atRiskCount === 1 ? "is" : "are"} overdue.`
      : null,
  ].filter(Boolean).join(" ") || "No outstanding invoices at this time.";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallback;

  try {
    const client = new Anthropic({ apiKey });
    const summary = [
      `Expected this month: ${data.expectedThisMonthCount} invoices totaling ${fmtAmount(data.expectedThisMonth, data.currency)}`,
      `Overdue/at risk: ${data.atRiskCount} invoices totaling ${fmtAmount(data.atRisk, data.currency)}`,
      data.upcomingByWeek.length > 0
        ? `Upcoming: ${data.upcomingByWeek.map((w) => `${w.weekLabel}: ${w.count} invoices, ${fmtAmount(w.amount, data.currency)}`).join("; ")}`
        : "No upcoming invoices in next 8 weeks",
    ].join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      system:
        "You are a financial assistant. Write a single concise sentence (max 30 words) summarizing the user's cash flow outlook based on the data provided. Be specific with numbers.",
      messages: [{ role: "user", content: summary }],
    });

    const block = response.content.find((b) => b.type === "text");
    return block?.type === "text" ? block.text : fallback;
  } catch {
    return fallback;
  }
}

const SearchFiltersSchema = z.object({
  status: z.enum(["draft", "sent", "viewed", "paid", "overdue", "cancelled"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  search: z.string().optional(),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

export async function parseSearchQuery(query: string): Promise<SearchFilters | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const client = new Anthropic({ apiKey });
    const today = new Date().toISOString().slice(0, 10);

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system:
        `You are an invoice search assistant. Today's date is ${today}. ` +
        "Extract search filters from the user's natural language query. Always call extract_search_filters.",
      tools: [
        {
          name: "extract_search_filters",
          description: "Extract structured search filters from a natural language invoice search query",
          input_schema: {
            type: "object" as const,
            properties: {
              status: {
                type: "string",
                enum: ["draft", "sent", "viewed", "paid", "overdue", "cancelled"],
                description: "Invoice status filter",
              },
              dateFrom: {
                type: "string",
                description: "Start date (YYYY-MM-DD) for issue date range",
              },
              dateTo: {
                type: "string",
                description: "End date (YYYY-MM-DD) for issue date range",
              },
              minAmount: {
                type: "number",
                description: "Minimum invoice total amount",
              },
              maxAmount: {
                type: "number",
                description: "Maximum invoice total amount",
              },
              search: {
                type: "string",
                description: "Client name or invoice number text to search for",
              },
            },
            required: [],
          },
        },
      ],
      tool_choice: { type: "tool", name: "extract_search_filters" },
      messages: [{ role: "user", content: query }],
    });

    const toolUse = response.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") return null;

    return SearchFiltersSchema.parse(toolUse.input);
  } catch {
    return null;
  }
}

export interface PaymentReminderInput {
  invoiceNumber: string;
  clientName: string;
  total: number;
  dueDate: string;
  daysOverdue: number;
  currency: string;
}

export async function generatePaymentReminder(input: PaymentReminderInput): Promise<string> {
  const { invoiceNumber, clientName, total, dueDate, daysOverdue, currency } = input;
  const formattedAmount = fmtAmount(total, currency);
  const formattedDue = new Date(dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const fallback =
    daysOverdue <= 7
      ? `Hi ${clientName},\n\nI hope you're doing well! I wanted to follow up on invoice ${invoiceNumber} for ${formattedAmount}, which was due on ${formattedDue}. It may have slipped through the cracks — no worries at all.\n\nCould you let me know when we might expect payment? Please don't hesitate to reach out if you have any questions.\n\nThank you!`
      : daysOverdue <= 30
      ? `Dear ${clientName},\n\nThis is a reminder that invoice ${invoiceNumber} for ${formattedAmount} was due on ${formattedDue} and remains outstanding.\n\nI'd appreciate it if you could arrange payment at your earliest convenience. Please let me know if there's anything I can help with.\n\nBest regards`
      : `Dear ${clientName},\n\nI'm writing regarding invoice ${invoiceNumber} for ${formattedAmount}, which was due on ${formattedDue} and is now ${daysOverdue} days overdue.\n\nThis matter requires your immediate attention. Please arrange payment promptly or contact me to discuss a resolution. Continued non-payment may require further action.\n\nRegards`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallback;

  const tone =
    daysOverdue <= 7
      ? "friendly and understanding, assume it was an oversight"
      : daysOverdue <= 30
      ? "polite but firm, referencing the invoice number and amount"
      : "professional and direct, mentioning potential consequences of continued non-payment";

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: `You are a professional invoice follow-up assistant. Write a concise payment reminder email body (no subject line, no sign-off with a name). Tone: ${tone}. Plain text only, no markdown.`,
      messages: [
        {
          role: "user",
          content: `Invoice number: ${invoiceNumber}\nClient: ${clientName}\nAmount due: ${formattedAmount}\nDue date: ${formattedDue}\nDays overdue: ${daysOverdue}`,
        },
      ],
    });

    const block = response.content.find((b) => b.type === "text");
    return block?.type === "text" ? block.text : fallback;
  } catch {
    return fallback;
  }
}

export async function parseInvoiceIntent(prompt: string): Promise<ParsedInvoice> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system:
      "You are an invoice parsing assistant. Extract invoice details from natural language descriptions. " +
      "Payment terms should be returned as a string like 'net 30', 'net 14', 'due on receipt', etc. " +
      "If the input is too vague to create a meaningful invoice (missing recipient name or any amount), " +
      "still do your best but use placeholder values. Always call extract_invoice_data.",
    tools: [
      {
        name: "extract_invoice_data",
        description:
          "Extract structured invoice data from a natural language description",
        input_schema: {
          type: "object" as const,
          properties: {
            recipientName: {
              type: "string",
              description: "The name of the invoice recipient or client",
            },
            recipientEmail: {
              type: "string",
              description: "The email address of the recipient (optional)",
            },
            lineItems: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                    description: "Description of the service or product",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity (default 1)",
                  },
                  unitPrice: {
                    type: "number",
                    description: "Price per unit in the invoice currency",
                  },
                },
                required: ["description", "quantity", "unitPrice"],
              },
              description: "List of invoice line items",
            },
            paymentTerms: {
              type: "string",
              description:
                "Payment terms, e.g. 'net 30', 'net 14', 'due on receipt'",
            },
            notes: {
              type: "string",
              description: "Additional notes for the invoice (optional)",
            },
          },
          required: ["recipientName", "lineItems", "paymentTerms"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "extract_invoice_data" },
    messages: [{ role: "user", content: prompt }],
  });

  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error(
      "Could not parse invoice details from your description. Please provide more specifics."
    );
  }

  const parsed = ParsedInvoiceSchema.parse(toolUse.input);
  return parsed;
}
