import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { readFile, unlink } from "fs/promises";
import path from "path";
import { db } from "@/db";
import { attachments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { id } = await params;

  const [row] = await db
    .select()
    .from(attachments)
    .where(and(eq(attachments.id, id), eq(attachments.userId, userId)));

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const absPath = path.join(/*turbopackIgnore: true*/ process.cwd(), row.filePath);
  let bytes: Buffer;
  try {
    bytes = await readFile(absPath);
  } catch {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": row.mimeType,
      "Content-Disposition": `attachment; filename="${row.fileName}"`,
      "Content-Length": String(bytes.length),
    },
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const { id } = await params;

  const [row] = await db
    .select()
    .from(attachments)
    .where(and(eq(attachments.id, id), eq(attachments.userId, userId)));

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const absPath = path.join(/*turbopackIgnore: true*/ process.cwd(), row.filePath);
  try {
    await unlink(absPath);
  } catch {
    // file may already be gone
  }

  await db.delete(attachments).where(and(eq(attachments.id, id), eq(attachments.userId, userId)));

  return NextResponse.json({ success: true });
}
