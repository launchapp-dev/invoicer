import { z } from "zod";

const contactInfoSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email").or(z.literal("")),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  taxId: z.string().optional(),
});

const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  rate: z.number().min(0),
  amount: z.number().min(0),
});

const taxLineSchema = z.object({
  id: z.string(),
  name: z.string(),
  rate: z.number().min(0).max(100),
  amount: z.number(),
});

export const RECURRING_FREQUENCIES = ["weekly", "biweekly", "monthly", "quarterly", "annually"] as const;
export type RecurringFrequency = typeof RECURRING_FREQUENCIES[number];

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  from: contactInfoSchema,
  to: contactInfoSchema,
  lineItems: z.array(lineItemSchema).min(1, "At least one line item is required"),
  subtotal: z.number(),
  taxLines: z.array(taxLineSchema),
  taxAmount: z.number(),
  discount: z.number().min(0),
  total: z.number(),
  notes: z.string(),
  currency: z.string().min(1),
  recurring: z.boolean().optional(),
  recurringFrequency: z.enum(RECURRING_FREQUENCIES).optional(),
  paymentTerms: z.enum(["net15", "net30", "net60", "due_on_receipt", "custom"]).optional(),
}).refine(
  (data) => !data.issueDate || !data.dueDate || data.dueDate >= data.issueDate,
  { message: "Due date must be on or after issue date", path: ["dueDate"] }
);

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
