export const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CAD',
  'AUD',
  'CHF',
  'INR',
  'SGD',
  'AED',
] as const;

export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: 'US Dollar (USD)',
  EUR: 'Euro (EUR)',
  GBP: 'British Pound (GBP)',
  JPY: 'Japanese Yen (JPY)',
  CAD: 'Canadian Dollar (CAD)',
  AUD: 'Australian Dollar (AUD)',
  CHF: 'Swiss Franc (CHF)',
  INR: 'Indian Rupee (INR)',
  SGD: 'Singapore Dollar (SGD)',
  AED: 'UAE Dirham (AED)',
};

export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled" | "partial" | "archived";

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
