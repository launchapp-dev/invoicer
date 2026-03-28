"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

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
