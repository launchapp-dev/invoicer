import type { LineItem, InvoiceTotals } from "@/types/invoice";

export function calculateTotals(
  lineItems: LineItem[],
  taxRate: number,
  discountRate: number
): InvoiceTotals {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = subtotal * (discountRate / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (taxRate / 100);
  const total = taxableAmount + taxAmount;

  return { subtotal, taxAmount, discountAmount, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
