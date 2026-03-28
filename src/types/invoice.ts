export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";

  senderName: string;
  senderEmail: string;
  senderAddress: string;

  recipientName: string;
  recipientEmail: string;
  recipientAddress: string;

  lineItems: LineItem[];
  taxRate: number;
  discountRate: number;
  notes: string;
}

export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}
