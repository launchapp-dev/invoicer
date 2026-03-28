"use server";

import { and, count, desc, eq, like } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Invoice } from "@/types/invoice";

async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

const emptyParty = { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" };

function rowToInvoice(row: typeof invoices.$inferSelect): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    status: row.status,
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    from: safeJsonParse(row.fromJson, emptyParty),
    to: safeJsonParse(row.toJson, emptyParty),
    lineItems: safeJsonParse(row.lineItemsJson, []),
    subtotal: row.subtotal,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
  };
}

export async function getNextInvoiceNumber(): Promise<string> {
  const userId = await getCurrentUserId();
  const [result] = await db
    .select({ count: count() })
    .from(invoices)
    .where(eq(invoices.userId, userId));
  const n = (result?.count ?? 0) + 1;
  return `INV-${String(n).padStart(3, "0")}`;
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  const fields = {
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    fromJson: JSON.stringify(invoice.from),
    toJson: JSON.stringify(invoice.to),
    lineItemsJson: JSON.stringify(invoice.lineItems),
    subtotal: invoice.subtotal,
    taxRate: invoice.taxRate,
    taxAmount: invoice.taxAmount,
    discount: invoice.discount,
    total: invoice.total,
    notes: invoice.notes,
    currency: invoice.currency,
  };
  const existing = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(and(eq(invoices.id, invoice.id), eq(invoices.userId, userId)))
    .limit(1);
  if (existing.length > 0) {
    await db
      .update(invoices)
      .set({ ...fields, updatedAt: now })
      .where(and(eq(invoices.id, invoice.id), eq(invoices.userId, userId)));
  } else {
    await db.insert(invoices).values({ ...fields, id: invoice.id, userId, updatedAt: now });
  }
}

export async function listInvoices(): Promise<Invoice[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId))
    .orderBy(desc(invoices.updatedAt));
  return rows.map(rowToInvoice);
}

export async function loadInvoice(id: string): Promise<Invoice | null> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
  return row ? rowToInvoice(row) : null;
}

export async function deleteInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function duplicateInvoice(id: string): Promise<Invoice | null> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
  if (!row) return null;
  const baseNumber = row.invoiceNumber.replace(/ \(\d+\)$/, "");
  const existing = await db
    .select({ invoiceNumber: invoices.invoiceNumber })
    .from(invoices)
    .where(and(eq(invoices.userId, userId), like(invoices.invoiceNumber, `${baseNumber}%`)));
  let maxSuffix = 1;
  for (const { invoiceNumber } of existing) {
    const match = invoiceNumber.match(/ \((\d+)\)$/);
    if (match) maxSuffix = Math.max(maxSuffix, parseInt(match[1], 10));
  }
  const newInvoiceNumber = `${baseNumber} (${maxSuffix + 1})`;
  const now = new Date().toISOString();
  const newId = crypto.randomUUID();
  await db.insert(invoices).values({
    id: newId,
    userId,
    invoiceNumber: newInvoiceNumber,
    status: "draft",
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    fromJson: row.fromJson,
    toJson: row.toJson,
    lineItemsJson: row.lineItemsJson,
    subtotal: row.subtotal,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
    updatedAt: now,
  });
  const [newRow] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, newId));
  return newRow ? rowToInvoice(newRow) : null;
}
