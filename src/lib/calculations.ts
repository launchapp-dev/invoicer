import type { LineItem, TaxLine } from "@/types/invoice";

const CURRENCY_LOCALE: Record<string, string> = {
  USD: 'en-US',
  EUR: 'fr-FR',
  GBP: 'en-GB',
  JPY: 'ja-JP',
  CAD: 'en-CA',
  AUD: 'en-AU',
  CHF: 'de-CH',
  INR: 'en-IN',
  SGD: 'en-SG',
  AED: 'ar-AE',
};

export function calcLineAmount(quantity: number, rate: number): number {
  return Math.round(quantity * rate * 100) / 100;
}

export function calcSubtotal(lineItems: LineItem[]): number {
  return Math.round(lineItems.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;
}

export function calcTaxAmount(subtotal: number, taxRate: number): number {
  return Math.round(subtotal * (taxRate / 100) * 100) / 100;
}

export function calcTaxLines(subtotal: number, taxLines: TaxLine[]): TaxLine[] {
  return taxLines.map((line) => ({
    ...line,
    amount: Math.round(subtotal * (line.rate / 100) * 100) / 100,
  }));
}

export function calcTaxAmountFromLines(taxLines: TaxLine[]): number {
  return Math.round(taxLines.reduce((sum, line) => sum + line.amount, 0) * 100) / 100;
}

export function calcTotal(subtotal: number, taxAmount: number, discount = 0): number {
  return Math.max(0, Math.round((subtotal + taxAmount - discount) * 100) / 100);
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export function formatCurrency(amount: number, currency = "USD"): string {
  let safeCurrency = currency;
  try {
    new Intl.NumberFormat("en-US", { style: "currency", currency });
  } catch {
    safeCurrency = "USD";
  }
  const locale = CURRENCY_LOCALE[safeCurrency] ?? "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: safeCurrency,
  }).format(amount);
}

function safe(n: number): number {
  return Number.isFinite(n) ? n : 0;
}

export function lineItemTotal(item: Pick<LineItem, 'quantity' | 'rate'>): number {
  return safe(item.quantity) * safe(item.rate);
}

export function calculateTotals(
  lineItems: Pick<LineItem, 'quantity' | 'rate'>[],
  taxRate: number,
  discount: number
) {
  const subtotal = lineItems.reduce((sum, item) => sum + lineItemTotal(item), 0);
  const discountAmount = subtotal * (safe(discount) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (safe(taxRate) / 100);
  const total = taxableAmount + taxAmount;
  return { subtotal, discountAmount, taxAmount, total };
}
