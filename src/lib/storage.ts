import type { Invoice } from "@/types/invoice";

const STORAGE_KEY = "invoicer:invoices";

type StoredInvoice = Invoice & { _updatedAt: string };

function getAll(): Record<string, StoredInvoice> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveInvoice(invoice: Invoice): void {
  const all = getAll();
  all[invoice.id] = { ...invoice, _updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function listInvoices(): Invoice[] {
  const all = getAll();
  return Object.values(all)
    .sort((a, b) => b._updatedAt.localeCompare(a._updatedAt))
    .map(({ _updatedAt: _, ...invoice }) => invoice as Invoice);
}

export function loadInvoice(id: string): Invoice | null {
  const stored = getAll()[id];
  if (!stored) return null;
  const { _updatedAt: _, ...invoice } = stored;
  return invoice as Invoice;
}

export function deleteInvoice(id: string): void {
  const all = getAll();
  delete all[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
