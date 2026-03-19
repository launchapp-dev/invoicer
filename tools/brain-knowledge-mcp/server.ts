#!/usr/bin/env node
// brain-knowledge-mcp — MCP server for querying the brain knowledge base.
// Usage: node --experimental-strip-types server.ts [--db <path>]
//
// Tools exposed:
//   list_knowledge_types  — list all types with item counts
//   list_items            — list items of a type with optional status/priority filters
//   get_item              — fetch a single item by type + slug (returns full markdown body)
//   query_items           — filter by any combination of type/status/priority/category/owner
//   search_knowledge      — full-text search across all knowledge items
//
// Connect via MCP by adding to .mcp.json:
//   "brain-knowledge": {
//     "command": "node",
//     "args": ["--experimental-strip-types", "<repo-root>/tools/brain-knowledge-mcp/server.ts"]
//   }

import path from "node:path";
import { existsSync } from "node:fs";
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

if (!existsSync(dbPath)) {
  process.stderr.write(
    `brain.db not found at ${dbPath}. Run: cd tools/brain-db && npm install && npm run migrate\n`
  );
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });
db.pragma("journal_mode = WAL");

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

type CountRow = { type: string; count: number };

function rowToSummary(row: KnowledgeRow) {
  return {
    type: row.type,
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

const server = new Server(
  { name: "brain-knowledge", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_knowledge_types",
      description: "List all knowledge types in the brain DB with item counts.",
      inputSchema: { type: "object", properties: {}, required: [] },
    },
    {
      name: "list_items",
      description:
        "List knowledge items of a given type. Optionally filter by status or priority.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description:
              "Knowledge type: repos | questions | actions | products | architecture | competitive | revenue | ideas | fleet | gtm | team",
          },
          status: { type: "string", description: "Filter by status value" },
          priority: {
            type: "string",
            description: "Filter by priority value",
          },
          limit: {
            type: "number",
            description: "Max results (default 50)",
          },
        },
        required: ["type"],
      },
    },
    {
      name: "get_item",
      description:
        "Get a single knowledge item by type and slug. Returns full markdown body and metadata.",
      inputSchema: {
        type: "object",
        properties: {
          type: { type: "string", description: "Knowledge type" },
          slug: {
            type: "string",
            description: "Item slug (filename without .md)",
          },
        },
        required: ["type", "slug"],
      },
    },
    {
      name: "query_items",
      description:
        "Query knowledge items with flexible filters across any field combination.",
      inputSchema: {
        type: "object",
        properties: {
          type: { type: "string", description: "Filter by type" },
          status: { type: "string", description: "Filter by status" },
          priority: { type: "string", description: "Filter by priority" },
          category: { type: "string", description: "Filter by category" },
          owner: { type: "string", description: "Filter by owner" },
          effort: { type: "string", description: "Filter by effort" },
          limit: { type: "number", description: "Max results (default 50)" },
        },
        required: [],
      },
    },
    {
      name: "search_knowledge",
      description:
        "Full-text search across all knowledge items (title, slug, body).",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (FTS5 syntax supported)",
          },
          type: {
            type: "string",
            description: "Optionally restrict search to a type",
          },
          limit: { type: "number", description: "Max results (default 20)" },
        },
        required: ["query"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: input } = req.params;

  if (name === "list_knowledge_types") {
    const rows = db
      .prepare(
        "SELECT type, COUNT(*) as count FROM knowledge_items GROUP BY type ORDER BY type"
      )
      .all() as CountRow[];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rows, null, 2),
        },
      ],
    };
  }

  if (name === "list_items") {
    const params = z
      .object({
        type: z.string(),
        status: z.string().optional(),
        priority: z.string().optional(),
        limit: z.number().optional().default(50),
      })
      .parse(input);

    const conditions: string[] = ["type = @type"];
    const bindings: Record<string, unknown> = { type: params.type };

    if (params.status) {
      conditions.push("status = @status");
      bindings.status = params.status;
    }
    if (params.priority) {
      conditions.push("priority = @priority");
      bindings.priority = params.priority;
    }

    const rows = db
      .prepare(
        `SELECT id, type, slug, title, status, priority, effort, category, owner, file_path
         FROM knowledge_items WHERE ${conditions.join(" AND ")}
         ORDER BY slug LIMIT @limit`
      )
      .all({ ...bindings, limit: params.limit }) as KnowledgeRow[];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rows.map(rowToSummary), null, 2),
        },
      ],
    };
  }

  if (name === "get_item") {
    const params = z
      .object({ type: z.string(), slug: z.string() })
      .parse(input);

    const row = db
      .prepare(
        "SELECT * FROM knowledge_items WHERE type = @type AND slug = @slug"
      )
      .get(params) as KnowledgeRow | undefined;

    if (!row) {
      return {
        content: [
          { type: "text", text: `Not found: ${params.type}/${params.slug}` },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              ...rowToSummary(row),
              metadata: JSON.parse(row.metadata),
              body: row.body,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "query_items") {
    const params = z
      .object({
        type: z.string().optional(),
        status: z.string().optional(),
        priority: z.string().optional(),
        category: z.string().optional(),
        owner: z.string().optional(),
        effort: z.string().optional(),
        limit: z.number().optional().default(50),
      })
      .parse(input);

    const conditions: string[] = [];
    const bindings: Record<string, unknown> = {};

    for (const key of ["type", "status", "priority", "category", "owner", "effort"] as const) {
      if (params[key]) {
        conditions.push(`${key} = @${key}`);
        bindings[key] = params[key];
      }
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const rows = db
      .prepare(
        `SELECT id, type, slug, title, status, priority, effort, category, owner, file_path
         FROM knowledge_items ${where} ORDER BY type, slug LIMIT @limit`
      )
      .all({ ...bindings, limit: params.limit }) as KnowledgeRow[];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rows.map(rowToSummary), null, 2),
        },
      ],
    };
  }

  if (name === "search_knowledge") {
    const params = z
      .object({
        query: z.string(),
        type: z.string().optional(),
        limit: z.number().optional().default(20),
      })
      .parse(input);

    let sql = `
      SELECT ki.id, ki.type, ki.slug, ki.title, ki.status, ki.priority, ki.file_path,
             snippet(knowledge_fts, 2, '[', ']', '...', 10) as snippet
      FROM knowledge_fts
      JOIN knowledge_items ki ON ki.id = knowledge_fts.rowid
      WHERE knowledge_fts MATCH @query
    `;
    const bindings: Record<string, unknown> = { query: params.query };

    if (params.type) {
      sql += " AND ki.type = @type";
      bindings.type = params.type;
    }

    sql += " ORDER BY rank LIMIT @limit";
    bindings.limit = params.limit;

    const rows = db.prepare(sql).all(bindings) as (KnowledgeRow & { snippet: string })[];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            rows.map((r) => ({ ...rowToSummary(r), snippet: r.snippet })),
            null,
            2
          ),
        },
      ],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
