import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/db";
import { attachments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES_PER_INVOICE = 10;

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const invoiceId = formData.get("invoiceId") as string | null;

  if (!file || !invoiceId) {
    return NextResponse.json({ error: "Missing file or invoiceId" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 400 });
  }

  const existingCount = await db
    .select({ id: attachments.id })
    .from(attachments)
    .where(and(eq(attachments.invoiceId, invoiceId), eq(attachments.userId, userId)));

  if (existingCount.length >= MAX_FILES_PER_INVOICE) {
    return NextResponse.json({ error: "Maximum 10 files per invoice" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const relDir = path.join("uploads", "invoices", invoiceId);
  const absDir = path.join(/*turbopackIgnore: true*/ process.cwd(), relDir);
  await mkdir(absDir, { recursive: true });

  const filePath = path.join(relDir, `${id}-${safeFileName}`);
  const absPath = path.join(/*turbopackIgnore: true*/ process.cwd(), filePath);
  const bytes = await file.arrayBuffer();
  await writeFile(absPath, Buffer.from(bytes));

  const now = new Date().toISOString();
  await db.insert(attachments).values({
    id,
    invoiceId,
    userId,
    fileName: file.name,
    filePath,
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
    createdAt: now,
  });

  return NextResponse.json({
    id,
    invoiceId,
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
    createdAt: now,
  });
}
