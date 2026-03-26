#!/usr/bin/env node
// Usage: node --experimental-strip-types query.ts [--db <path>] [--sql <query>] [--param key=value]
// Runs a read-only SQLite query against the derived brain DB and prints JSON.

import path from "node:path";
import Database from "better-sqlite3";

const args = process.argv.slice(2);
const repoRoot = path.resolve(import.meta.dirname, "../..");

function readFlag(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  return args[index + 1];
}

const dbPath = readFlag("--db") ?? path.join(repoRoot, "brain.db");
const sql =
  readFlag("--sql") ??
  "SELECT type, slug, title, status, priority, file_path FROM knowledge_items ORDER BY type, slug LIMIT 25";

const params: Record<string, string> = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] !== "--param") continue;
  const pair = args[i + 1];
  if (!pair || !pair.includes("=")) {
    console.error("Invalid --param. Expected key=value.");
    process.exit(1);
  }
  const [key, ...valueParts] = pair.split("=");
  params[key] = valueParts.join("=");
}

let db: Database.Database;
try {
  db = new Database(dbPath, { readonly: true });
} catch (error) {
  console.error(`Failed to open DB at ${dbPath}: ${String(error)}`);
  process.exit(1);
}

const normalizedSql = sql.trim().toLowerCase();
if (!normalizedSql.startsWith("select") && !normalizedSql.startsWith("pragma")) {
  console.error("Only read-only SELECT and PRAGMA statements are allowed.");
  process.exit(1);
}

try {
  const statement = db.prepare(sql);
  const rows = statement.all(params);
  process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
} catch (error) {
  console.error(`Query failed: ${String(error)}`);
  process.exit(1);
} finally {
  db.close();
}
