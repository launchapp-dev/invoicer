#!/usr/bin/env node
// brain-products-mcp — Domain-specific MCP server for querying product, repo, and org knowledge.
// Usage: node --experimental-strip-types server.ts [--db <path>]
//
// Tools exposed:
//   products_list       — list products (filter: status; pagination: limit, offset)
//   products_get        — fetch a product by slug (full markdown + metadata)
//   products_search     — full-text search across products
//   repos_list          — list repos (filter: status, category; pagination: limit, offset)
//   repos_get           — fetch a repo by slug
//   repos_search        — full-text search across repos
//   sdks_list           — list SDK repos (repos with "sdk" in slug)
//   sdks_get            — fetch an SDK repo by slug
//   competitors_list    — list competitive intelligence entries (pagination: limit, offset)
//   competitors_get     — fetch a competitor entry by slug
//   team_founders       — get founders profile
//   vision_get          — get org vision (reads knowledge/vision.md)
//   ideas_list          — list product ideas (filter: status; pagination: limit, offset)
//   ideas_get           — fetch an idea by slug
//   actions_list        — list action items (filter: status, priority, effort, category, owner)
//   actions_get         — fetch an action by slug
//   questions_list      — list strategic questions (filter: priority, status, category)
//   questions_get       — fetch a question by slug
//   architecture_list   — list architecture documents (pagination: limit, offset)
//   architecture_get    — fetch an architecture document by slug
//
// Add to custom.yaml mcp_servers or .mcp.json:
//   "brain-products": {
//     "command": "node",
//     "args": ["--experimental-strip-types", "<repo-root>/tools/brain-products-mcp/server.ts"]
//   }

import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import Database from "better-sqlite3";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const args = process.argv.slice(2);
const dbArg = args.indexOf("--db");
const repoRoot = path.resolve(import.meta.dirname, "../..");
const dbPath = dbArg >= 0 ? args[dbArg + 1] : path.join(repoRoot, "brain.db");

const dbAvailable = existsSync(dbPath);
if (!dbAvailable) {
  process.stderr.write(
    `brain.db not found at ${dbPath}. Run: cd tools/brain-db && npm install && npm run migrate\n` +
    `Falling back to markdown file reads for supported tools.\n`
  );
}

const db = dbAvailable ? new Database(dbPath, { readonly: true }) : null;
if (db) db.pragma("journal_mode = WAL");

type KnowledgeRow = {
  id: number;
  type: string;
  slug: string;
  title: string | null;
  status: string | null;
  priority: string | null;
  effort: string | null;
  category: string | null;
  owner: string | null;
  body: string;
  metadata: string;
  file_path: string;
  imported_at: string;
};

function rowToSummary(row: KnowledgeRow) {
  return {
    slug: row.slug,
    title: row.title,
    status: row.status,
    priority: row.priority,
    effort: row.effort,
    category: row.category,
    owner: row.owner,
    file_path: row.file_path,
  };
}

function rowToFull(row: KnowledgeRow) {
  return {
    ...rowToSummary(row),
    metadata: JSON.parse(row.metadata),
    body: row.body,
  };
}

function listItems(
  type: string,
  filters: Record<string, string | undefined>,
  limit: number,
  offset: number
): KnowledgeRow[] {
  if (!db) return [];
  const conditions: string[] = ["type = @type"];
  const bindings: Record<string, unknown> = { type, limit, offset };
  for (const [key, val] of Object.entries(filters)) {
    if (val !== undefined) {
      conditions.push(`${key} = @${key}`);
      bindings[key] = val;
    }
  }
  return db
    .prepare(
      `SELECT id, type, slug, title, status, priority, effort, category, owner, file_path, metadata, body, imported_at
       FROM knowledge_items WHERE ${conditions.join(" AND ")}
       ORDER BY slug LIMIT @limit OFFSET @offset`
    )
    .all(bindings) as KnowledgeRow[];
}

function getItem(type: string, slug: string): KnowledgeRow | undefined {
  if (!db) return undefined;
  return db
    .prepare("SELECT * FROM knowledge_items WHERE type = @type AND slug = @slug")
    .get({ type, slug }) as KnowledgeRow | undefined;
}

function searchItems(type: string | undefined, query: string, limit: number): unknown[] {
  if (!db) return [];
  let sql = `
    SELECT ki.slug, ki.title, ki.status, ki.priority, ki.file_path,
           snippet(knowledge_fts, 2, '[', ']', '...', 10) as snippet
    FROM knowledge_fts
    JOIN knowledge_items ki ON ki.id = knowledge_fts.rowid
    WHERE knowledge_fts MATCH @query
  `;
  const bindings: Record<string, unknown> = { query, limit };
  if (type) {
    sql += " AND ki.type = @type";
    bindings.type = type;
  }
  sql += " ORDER BY rank LIMIT @limit";
  return db.prepare(sql).all(bindings) as unknown[];
}

function readMarkdownFile(relPath: string): string | null {
  const full = path.join(repoRoot, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function notFound(slug: string): { content: [{ type: "text"; text: string }]; isError: true } {
  return { content: [{ type: "text", text: `Not found: ${slug}` }], isError: true };
}

function noDb(): { content: [{ type: "text"; text: string }]; isError: true } {
  return {
    content: [{ type: "text", text: "brain.db not available. Run: cd tools/brain-db && npm install && npm run migrate" }],
    isError: true,
  };
}

function json(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

const server = new Server(
  { name: "brain-products", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "products_list",
      description: "List all products. Filter by status. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filter by status (e.g. active, archived)" },
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "products_get",
      description: "Fetch a product by slug. Returns full markdown body and metadata.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Product slug (filename without .md)" },
        },
        required: ["slug"],
      },
    },
    {
      name: "products_search",
      description: "Full-text search across products.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query (FTS5 syntax supported)" },
          limit: { type: "number", description: "Max results (default 10)" },
        },
        required: ["query"],
      },
    },
    {
      name: "repos_list",
      description: "List repos. Filter by status or category. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filter by status (e.g. active, archived, stale)" },
          category: { type: "string", description: "Filter by category" },
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "repos_get",
      description: "Fetch a repo by slug. Returns full markdown body and metadata.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Repo slug (filename without .md)" },
        },
        required: ["slug"],
      },
    },
    {
      name: "repos_search",
      description: "Full-text search across repos.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query (FTS5 syntax supported)" },
          limit: { type: "number", description: "Max results (default 10)" },
        },
        required: ["query"],
      },
    },
    {
      name: "sdks_list",
      description: "List SDK repos (repos whose slug contains 'sdk'). Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "sdks_get",
      description: "Fetch an SDK repo by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "SDK repo slug" },
        },
        required: ["slug"],
      },
    },
    {
      name: "competitors_list",
      description: "List competitive intelligence entries. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "competitors_get",
      description: "Fetch a competitor entry by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Competitor slug" },
        },
        required: ["slug"],
      },
    },
    {
      name: "team_founders",
      description: "Get the founders profile.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "vision_get",
      description: "Get the org vision and mission statement (knowledge/vision.md).",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "ideas_list",
      description: "List product ideas. Filter by status. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filter by status" },
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "ideas_get",
      description: "Fetch a product idea by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Idea slug" },
        },
        required: ["slug"],
      },
    },
    {
      name: "actions_list",
      description: "List action items. Filter by status, priority, effort, category, or owner. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filter by status (e.g. proposed, in-progress, done)" },
          priority: { type: "string", description: "Filter by priority (critical, high, medium, low)" },
          effort: { type: "string", description: "Filter by effort (small, medium, large)" },
          category: { type: "string", description: "Filter by category" },
          owner: { type: "string", description: "Filter by owner" },
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "actions_get",
      description: "Fetch an action item by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Action slug" },
        },
        required: ["slug"],
      },
    },
    {
      name: "questions_list",
      description: "List strategic questions. Filter by priority, status, or category. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          priority: { type: "string", description: "Filter by priority (critical, high, medium, low)" },
          status: { type: "string", description: "Filter by status (e.g. open, answered)" },
          category: { type: "string", description: "Filter by category" },
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "questions_get",
      description: "Fetch a strategic question by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Question slug" },
        },
        required: ["slug"],
      },
    },
    {
      name: "architecture_list",
      description: "List architecture documents. Supports pagination.",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max results (default 50)" },
          offset: { type: "number", description: "Pagination offset (default 0)" },
        },
      },
    },
    {
      name: "architecture_get",
      description: "Fetch an architecture document by slug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Architecture doc slug" },
        },
        required: ["slug"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: input } = req.params;

  if (name === "products_list") {
    if (!db) return noDb();
    const p = z.object({ status: z.string().optional(), limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    return json(listItems("products", { status: p.status }, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "products_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("products", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/products/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "products_search") {
    if (!db) return noDb();
    const p = z.object({ query: z.string(), limit: z.number().optional().default(10) }).parse(input);
    return json(searchItems("products", p.query, p.limit));
  }

  if (name === "repos_list") {
    if (!db) return noDb();
    const p = z.object({ status: z.string().optional(), category: z.string().optional(), limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    return json(listItems("repos", { status: p.status, category: p.category }, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "repos_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("repos", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/repos/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "repos_search") {
    if (!db) return noDb();
    const p = z.object({ query: z.string(), limit: z.number().optional().default(10) }).parse(input);
    return json(searchItems("repos", p.query, p.limit));
  }

  if (name === "sdks_list") {
    if (!db) return noDb();
    const p = z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    const rows = db
      .prepare(
        `SELECT slug, title, status, priority, effort, category, owner, file_path
         FROM knowledge_items WHERE type = 'repos' AND slug LIKE '%sdk%'
         ORDER BY slug LIMIT @limit OFFSET @offset`
      )
      .all({ limit: p.limit, offset: p.offset }) as KnowledgeRow[];
    return json(rows.map(rowToSummary));
  }

  if (name === "sdks_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("repos", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/repos/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "competitors_list") {
    if (!db) return noDb();
    const p = z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    return json(listItems("competitive", {}, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "competitors_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("competitive", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/competitive/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "team_founders") {
    const row = getItem("team", "founders");
    if (!row) {
      const body = readMarkdownFile("knowledge/team/founders.md");
      if (!body) return notFound("founders");
      return json({ slug: "founders", body });
    }
    return json(rowToFull(row));
  }

  if (name === "vision_get") {
    const body = readMarkdownFile("knowledge/vision.md");
    if (!body) return notFound("vision");
    return json({ slug: "vision", file_path: "knowledge/vision.md", body });
  }

  if (name === "ideas_list") {
    if (!db) return noDb();
    const p = z.object({ status: z.string().optional(), limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    return json(listItems("ideas", { status: p.status }, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "ideas_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("ideas", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/ideas/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "actions_list") {
    if (!db) return noDb();
    const p = z
      .object({
        status: z.string().optional(),
        priority: z.string().optional(),
        effort: z.string().optional(),
        category: z.string().optional(),
        owner: z.string().optional(),
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0),
      })
      .parse(input);
    return json(listItems("actions", { status: p.status, priority: p.priority, effort: p.effort, category: p.category, owner: p.owner }, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "actions_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("actions", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/actions/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "questions_list") {
    if (!db) return noDb();
    const p = z
      .object({
        priority: z.string().optional(),
        status: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0),
      })
      .parse(input);
    return json(listItems("questions", { priority: p.priority, status: p.status, category: p.category }, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "questions_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("questions", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/questions/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  if (name === "architecture_list") {
    if (!db) return noDb();
    const p = z.object({ limit: z.number().optional().default(50), offset: z.number().optional().default(0) }).parse(input);
    return json(listItems("architecture", {}, p.limit, p.offset).map(rowToSummary));
  }

  if (name === "architecture_get") {
    const p = z.object({ slug: z.string() }).parse(input);
    const row = getItem("architecture", p.slug);
    if (!row) {
      const body = readMarkdownFile(`knowledge/architecture/${p.slug}.md`);
      if (!body) return notFound(p.slug);
      return json({ slug: p.slug, body });
    }
    return json(rowToFull(row));
  }

  return { content: [{ type: "text" as const, text: `Unknown tool: ${name}` }], isError: true };
});

const transport = new StdioServerTransport();
await server.connect(transport);
