export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface ContactInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  from: ContactInfo;
  to: ContactInfo;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes: string;
  currency: string;
}

export type InvoiceFormValues = {
  lineItems: LineItem[];
  taxRate: number;
  discount: number;
};
