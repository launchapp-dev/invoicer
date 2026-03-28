import type { LineItem, TaxLine } from "@/types/invoice";

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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency,
  }).format(amount);
}
