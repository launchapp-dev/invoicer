"use server";

import { and, eq, lte } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { recurringInvoices, invoices } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

type Frequency = "weekly" | "biweekly" | "monthly" | "quarterly" | "annually";

async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function advanceDate(dateStr: string, frequency: Frequency): string {
  const date = new Date(dateStr);
  switch (frequency) {
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "biweekly":
      date.setDate(date.getDate() + 14);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    case "annually":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  return date.toISOString().split("T")[0];
}

export interface CreateRecurringInvoiceData {
  title: string;
  frequency: Frequency;
  nextRunAt: string;
  template: InvoiceFormValues;
}

export async function createRecurringInvoice(
  userId: string,
  data: CreateRecurringInvoiceData
): Promise<void> {
  const now = new Date().toISOString();
  await db.insert(recurringInvoices).values({
    id: crypto.randomUUID(),
    userId,
    title: data.title,
    frequency: data.frequency,
    nextRunAt: data.nextRunAt,
    templateJson: JSON.stringify(data.template),
    updatedAt: now,
  });
}

export async function listRecurringInvoices(userId: string) {
  return db
    .select()
    .from(recurringInvoices)
    .where(eq(recurringInvoices.userId, userId))
    .orderBy(recurringInvoices.createdAt);
}

export async function pauseRecurringInvoice(userId: string, id: string): Promise<void> {
  await db
    .update(recurringInvoices)
    .set({ status: "paused", updatedAt: new Date().toISOString() })
    .where(and(eq(recurringInvoices.id, id), eq(recurringInvoices.userId, userId)));
}

export async function resumeRecurringInvoice(userId: string, id: string): Promise<void> {
  await db
    .update(recurringInvoices)
    .set({ status: "active", updatedAt: new Date().toISOString() })
    .where(and(eq(recurringInvoices.id, id), eq(recurringInvoices.userId, userId)));
}

export async function deleteRecurringInvoice(userId: string, id: string): Promise<void> {
  await db
    .delete(recurringInvoices)
    .where(and(eq(recurringInvoices.id, id), eq(recurringInvoices.userId, userId)));
}

export async function generateDueInvoices(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const due = await db
    .select()
    .from(recurringInvoices)
    .where(
      and(
        eq(recurringInvoices.status, "active"),
        lte(recurringInvoices.nextRunAt, today)
      )
    );

  const now = new Date().toISOString();

  for (const series of due) {
    let template: InvoiceFormValues;
    try {
      template = JSON.parse(series.templateJson) as InvoiceFormValues;
    } catch {
      continue;
    }

    const newInvoiceId = crypto.randomUUID();
    await db.insert(invoices).values({
      id: newInvoiceId,
      userId: series.userId,
      invoiceNumber: template.invoiceNumber
        ? `${template.invoiceNumber}-${today}`
        : `REC-${newInvoiceId.slice(0, 8)}`,
      status: "draft",
      issueDate: today,
      dueDate: today,
      fromJson: JSON.stringify(template.from),
      toJson: JSON.stringify(template.to),
      lineItemsJson: JSON.stringify(template.lineItems),
      taxLinesJson: JSON.stringify(template.taxLines ?? []),
      subtotal: template.subtotal,
      taxRate: template.taxLines
        ? template.taxLines.reduce((sum: number, l: { rate: number }) => sum + (l.rate || 0), 0)
        : 0,
      taxAmount: template.taxAmount,
      discount: template.discount,
      total: template.total,
      notes: template.notes,
      currency: template.currency,
      updatedAt: now,
    });

    const nextRunAt = advanceDate(series.nextRunAt, series.frequency as Frequency);
    await db
      .update(recurringInvoices)
      .set({ nextRunAt, lastRunAt: today, updatedAt: now })
      .where(eq(recurringInvoices.id, series.id));
  }
}

export async function myPauseRecurringInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await pauseRecurringInvoice(userId, id);
}

export async function myResumeRecurringInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await resumeRecurringInvoice(userId, id);
}

export async function myDeleteRecurringInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await deleteRecurringInvoice(userId, id);
}

export async function myListRecurringInvoices() {
  const userId = await getCurrentUserId();
  return listRecurringInvoices(userId);
}
