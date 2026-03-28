export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled" | "partial";

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paidAt: string;
  method: string;
  reference?: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface TaxLine {
  id: string;
  name: string;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  clientId?: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  from: ContactInfo;
  to: ContactInfo;
  lineItems: LineItem[];
  subtotal: number;
  taxLines: TaxLine[];
  taxRate?: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes: string;
  currency: string;
  paidAt?: string;
  paidMethod?: "bank_transfer" | "cash" | "check" | "card" | "other";
  paidReference?: string;
  payments?: Payment[];
  shareToken?: string;
  paymentTerms?: "net15" | "net30" | "net60" | "due_on_receipt" | "custom";
}

