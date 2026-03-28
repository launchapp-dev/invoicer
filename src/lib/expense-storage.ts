"use server";

import { and, desc, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { expenses } from "@/db/schema";
import { auth } from "@/lib/auth";

export type ExpenseCategory = "software" | "hardware" | "travel" | "meals" | "contractor" | "marketing" | "other";

export interface Expense {
  id: string;
  userId: string;
  clientId: string | null;
  vendor: string;
  amount: number;
  currency: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  receiptPath: string | null;
  createdAt: string;
}

async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function rowToExpense(row: typeof expenses.$inferSelect): Expense {
  return {
    id: row.id,
    userId: row.userId,
    clientId: row.clientId ?? null,
    vendor: row.vendor,
    amount: row.amount,
    currency: row.currency,
    date: row.date,
    category: row.category as ExpenseCategory,
    description: row.description,
    receiptPath: row.receiptPath ?? null,
    createdAt: row.createdAt,
  };
}

export async function listExpenses(): Promise<Expense[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, userId))
    .orderBy(desc(expenses.date), desc(expenses.createdAt));
  return rows.map(rowToExpense);
}

export async function createExpense(
  data: Omit<Expense, "id" | "userId" | "createdAt">
): Promise<Expense> {
  const userId = await getCurrentUserId();
  const id = crypto.randomUUID();
  await db.insert(expenses).values({
    id,
    userId,
    clientId: data.clientId ?? null,
    vendor: data.vendor,
    amount: data.amount,
    currency: data.currency,
    date: data.date,
    category: data.category,
    description: data.description,
    receiptPath: data.receiptPath ?? null,
  });
  const [row] = await db.select().from(expenses).where(eq(expenses.id, id));
  return rowToExpense(row);
}

export async function updateExpense(
  id: string,
  data: Partial<Omit<Expense, "id" | "userId" | "createdAt">>
): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(expenses)
    .set({
      ...(data.clientId !== undefined ? { clientId: data.clientId } : {}),
      ...(data.vendor !== undefined ? { vendor: data.vendor } : {}),
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.currency !== undefined ? { currency: data.currency } : {}),
      ...(data.date !== undefined ? { date: data.date } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.receiptPath !== undefined ? { receiptPath: data.receiptPath } : {}),
    })
    .where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}

export async function deleteExpense(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .delete(expenses)
    .where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}

export async function getClientExpenses(clientId: string): Promise<Expense[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(expenses)
    .where(and(eq(expenses.userId, userId), eq(expenses.clientId, clientId)))
    .orderBy(desc(expenses.date));
  return rows.map(rowToExpense);
}

export async function getClientExpenseTotal(clientId: string): Promise<number> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select({ total: sql<number>`COALESCE(SUM(${expenses.amount}), 0)` })
    .from(expenses)
    .where(and(eq(expenses.userId, userId), eq(expenses.clientId, clientId)));
  return row?.total ?? 0;
}
