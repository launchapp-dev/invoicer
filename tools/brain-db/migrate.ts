#!/usr/bin/env node
// Usage: node --experimental-strip-types migrate.ts [--db <path>] [--knowledge <path>]
// Imports all markdown files from knowledge/ into the brain SQLite database.
// Safe to run repeatedly — uses INSERT OR REPLACE to upsert existing entries.

import fs from "node:fs";
import path from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";
import Database from "better-sqlite3";
import matter from "gray-matter";

const args = process.argv.slice(2);
const dbArg = args.indexOf("--db");
const knowledgeArg = args.indexOf("--knowledge");

const repoRoot = path.resolve(import.meta.dirname, "../..");
const dbPath =
  dbArg >= 0 ? args[dbArg + 1] : path.join(repoRoot, "brain.db");
const knowledgeDir =
  knowledgeArg >= 0 ? args[knowledgeArg + 1] : path.join(repoRoot, "knowledge");

if (!fs.existsSync(knowledgeDir)) {
  console.error(`knowledge dir not found: ${knowledgeDir}`);
  process.exit(1);
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const schemaSQL = readFileSync(path.join(import.meta.dirname, "schema.sql"), "utf8");
const runDDL = (sql: string) => (db as unknown as Record<string, (s: string) => void>)["exec"](sql);
runDDL(schemaSQL);

const upsert = db.prepare(`
  INSERT INTO knowledge_items
    (type, slug, title, status, priority, effort, category, owner, body, metadata, file_path, imported_at)
  VALUES
    (@type, @slug, @title, @status, @priority, @effort, @category, @owner, @body, @metadata, @file_path, @imported_at)
  ON CONFLICT(type, slug) DO UPDATE SET
    title       = excluded.title,
    status      = excluded.status,
    priority    = excluded.priority,
    effort      = excluded.effort,
    category    = excluded.category,
    owner       = excluded.owner,
    body        = excluded.body,
    metadata    = excluded.metadata,
    file_path   = excluded.file_path,
    imported_at = excluded.imported_at
`);

const KNOWLEDGE_TYPES = [
  "repos",
  "questions",
  "actions",
  "products",
  "architecture",
  "competitive",
  "revenue",
  "ideas",
  "fleet",
  "gtm",
  "team",
];

function extractTitleFromBody(body: string): string | null {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function parseStatusFromBody(body: string): string | null {
  const match = body.match(/\*\*(?:Current Status|Status)\*\*[:\s]+([^\n]+)/i);
  if (!match) return null;
  const val = match[1].trim().toLowerCase();
  if (val.includes("active")) return "active";
  if (val.includes("archiv")) return "archived";
  if (val.includes("stale")) return "stale";
  if (val.includes("stable")) return "stable";
  if (val.includes("maintenance")) return "maintenance";
  if (val.includes("abandon")) return "abandoned";
  return null;
}

let imported = 0;

const importAll = db.transaction(() => {
  for (const type of KNOWLEDGE_TYPES) {
    const typeDir = path.join(knowledgeDir, type);
    if (!fs.existsSync(typeDir)) continue;

    const files = readdirSync(typeDir).filter(
      (f) => f.endsWith(".md") && f !== "README.md"
    );

    for (const file of files) {
      const filePath = path.join(typeDir, file);
      if (!statSync(filePath).isFile()) continue;

      const raw = readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(raw);

      const slug = file.replace(/\.md$/, "");
      const relativePath = `knowledge/${type}/${file}`;

      const title =
        frontmatter.title ?? extractTitleFromBody(content) ?? slug;
      const status =
        frontmatter.status ?? parseStatusFromBody(content) ?? null;

      upsert.run({
        type,
        slug,
        title,
        status,
        priority: frontmatter.priority ?? null,
        effort: frontmatter.effort ?? null,
        category: frontmatter.category ?? null,
        owner: frontmatter.owner ?? null,
        body: raw,
        metadata: JSON.stringify(frontmatter),
        file_path: relativePath,
        imported_at: new Date().toISOString(),
      });
      imported++;
    }
  }
});

importAll();

const row = db.prepare("SELECT COUNT(*) as c FROM knowledge_items").get() as { c: number };
console.log(`✓ Imported ${imported} items. Total in DB: ${row.c}`);
console.log(`  DB: ${dbPath}`);
