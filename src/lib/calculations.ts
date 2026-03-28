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

export const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "JPY", label: "JPY — Japanese Yen" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "CHF", label: "CHF — Swiss Franc" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "SGD", label: "SGD — Singapore Dollar" },
  { code: "AED", label: "AED — UAE Dirham" },
  { code: "MXN", label: "MXN — Mexican Peso" },
  { code: "BRL", label: "BRL — Brazilian Real" },
  { code: "NZD", label: "NZD — New Zealand Dollar" },
  { code: "HKD", label: "HKD — Hong Kong Dollar" },
  { code: "SEK", label: "SEK — Swedish Krona" },
  { code: "NOK", label: "NOK — Norwegian Krone" },
  { code: "DKK", label: "DKK — Danish Krone" },
  { code: "ZAR", label: "ZAR — South African Rand" },
  { code: "CNY", label: "CNY — Chinese Yuan" },
  { code: "KRW", label: "KRW — South Korean Won" },
  { code: "THB", label: "THB — Thai Baht" },
  { code: "MYR", label: "MYR — Malaysian Ringgit" },
  { code: "IDR", label: "IDR — Indonesian Rupiah" },
  { code: "TRY", label: "TRY — Turkish Lira" },
  { code: "SAR", label: "SAR — Saudi Riyal" },
] as const;

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
