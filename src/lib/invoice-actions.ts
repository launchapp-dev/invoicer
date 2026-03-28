"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { invoices } from "@/db/schema";
import type { Invoice } from "@/types/invoice";

type InvoiceRow = typeof invoices.$inferSelect;

function rowToInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    status: row.status,
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    from: JSON.parse(row.fromJson),
    to: JSON.parse(row.toJson),
    lineItems: JSON.parse(row.lineItemsJson),
    subtotal: 0,
    taxRate: row.taxRate,
    taxAmount: 0,
    discount: row.discount,
    total: 0,
    notes: row.notes,
    currency: row.currency,
  };
}

export async function saveInvoice(userId: string, data: Invoice): Promise<void> {
  const existing = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(and(eq(invoices.id, data.id), eq(invoices.userId, userId)))
    .get();

  const values = {
    invoiceNumber: data.invoiceNumber,
    status: data.status,
    issueDate: data.issueDate,
    dueDate: data.dueDate,
    fromJson: JSON.stringify(data.from),
    toJson: JSON.stringify(data.to),
    lineItemsJson: JSON.stringify(data.lineItems),
    taxRate: data.taxRate,
    discount: data.discount,
    notes: data.notes,
    currency: data.currency,
    updatedAt: new Date().toISOString(),
  };

  if (existing) {
    await db.update(invoices).set(values).where(eq(invoices.id, data.id));
  } else {
    await db.insert(invoices).values({ id: data.id, userId, ...values });
  }
}

export async function listInvoices(userId: string): Promise<Invoice[]> {
  const rows = await db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId))
    .orderBy(desc(invoices.updatedAt))
    .all();

  return rows.map(rowToInvoice);
}

export async function loadInvoice(userId: string, id: string): Promise<Invoice | null> {
  const row = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)))
    .get();

  return row ? rowToInvoice(row) : null;
}

export async function deleteInvoice(userId: string, id: string): Promise<void> {
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function duplicateInvoice(userId: string, id: string): Promise<Invoice | null> {
  const row = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)))
    .get();

  if (!row) return null;

  const now = new Date().toISOString();
  const newId = crypto.randomUUID();
  const newNumber = `${row.invoiceNumber}-copy`;

  await db.insert(invoices).values({
    id: newId,
    userId,
    invoiceNumber: newNumber,
    status: "draft",
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    fromJson: row.fromJson,
    toJson: row.toJson,
    lineItemsJson: row.lineItemsJson,
    taxRate: row.taxRate,
    discount: row.discount,
    notes: row.notes,
    currency: row.currency,
    createdAt: now,
    updatedAt: now,
  });

  return loadInvoice(userId, newId);
}
