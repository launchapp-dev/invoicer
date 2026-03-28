"use server";

import { and, desc, eq } from "drizzle-orm";
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

function rowToInvoice(row: typeof invoices.$inferSelect): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    status: row.status,
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    from: JSON.parse(row.fromJson),
    to: JSON.parse(row.toJson),
    lineItems: JSON.parse(row.lineItemsJson),
    subtotal: row.subtotal,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
  };
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  await db
    .insert(invoices)
    .values({
      id: invoice.id,
      userId,
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
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: invoices.id,
      set: {
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
        updatedAt: now,
      },
    });
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
  const now = new Date().toISOString();
  const newId = crypto.randomUUID();
  await db.insert(invoices).values({
    id: newId,
    userId,
    invoiceNumber: `${row.invoiceNumber}-copy`,
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
