import { z } from "zod";

const contactInfoSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email").or(z.literal("")),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  rate: z.number().min(0),
  amount: z.number().min(0),
});

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  from: contactInfoSchema,
  to: contactInfoSchema,
  lineItems: z.array(lineItemSchema),
  subtotal: z.number(),
  taxRate: z.number().min(0).max(100),
  taxAmount: z.number(),
  discount: z.number().min(0),
  total: z.number(),
  notes: z.string(),
  currency: z.string().min(1),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
