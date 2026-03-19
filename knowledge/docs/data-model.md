# Brain Knowledge Base — Data Model

> Describes the structured SQLite layer over the brain markdown knowledge base.
> Source: `tools/brain-db/schema.sql` | Migration: `tools/brain-db/migrate.ts`

## Overview

The brain knowledge base has two layers:

1. **Markdown layer** (`knowledge/`) — human-readable, version-controlled, edited by agents and humans
2. **SQLite layer** (`brain.db`) — machine-queryable index derived from markdown, rebuilt on demand

Agents query the SQLite layer via the `brain-knowledge` MCP server instead of parsing markdown files.

---

## knowledge_items table

All knowledge types are stored in a single table with a discriminated `type` column.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `type` | TEXT | Knowledge type (see Types below) |
| `slug` | TEXT | Filename without `.md` extension |
| `title` | TEXT | Title from frontmatter or first H1 |
| `status` | TEXT | Lifecycle status (open, proposed, active, stale, archived, etc.) |
| `priority` | TEXT | Priority level (critical, high, medium, low) |
| `effort` | TEXT | Effort estimate for actions (small, medium, large) |
| `category` | TEXT | Domain category |
| `owner` | TEXT | Assigned owner |
| `body` | TEXT | Full markdown content |
| `metadata` | TEXT | JSON blob of all YAML frontmatter fields |
| `file_path` | TEXT | Repo-relative path (e.g. `knowledge/repos/ao-cli.md`) |
| `imported_at` | TEXT | ISO 8601 timestamp of last import |

**Unique constraint**: `(type, slug)`

---

## Knowledge Types

| Type | Source Dir | Primary Fields | Example Queries |
|------|-----------|----------------|-----------------|
| `repos` | `knowledge/repos/` | status, (parsed from body) | `type=repos AND status=archived` |
| `questions` | `knowledge/questions/` | priority, status, category | `type=questions AND priority=high` |
| `actions` | `knowledge/actions/` | priority, status, effort, category, owner | `type=actions AND status=proposed AND effort=small` |
| `products` | `knowledge/products/` | — | `type=products` |
| `architecture` | `knowledge/architecture/` | — | `type=architecture` |
| `competitive` | `knowledge/competitive/` | — | `type=competitive` |
| `revenue` | `knowledge/revenue/` | — | `type=revenue` |
| `ideas` | `knowledge/ideas/` | — | `type=ideas` |
| `fleet` | `knowledge/fleet/` | — | `type=fleet` |
| `gtm` | `knowledge/gtm/` | — | `type=gtm` |
| `team` | `knowledge/team/` | — | `type=team` |

---

## Indexes

- `(type)` — fast type filtering
- `(status)` — fast status filtering
- `(priority)` — fast priority filtering
- `(type, status)` — combined type + status queries
- `(type, priority)` — combined type + priority queries
- `(category)` — category filtering

## Full-Text Search

A FTS5 virtual table `knowledge_fts` indexes `slug`, `title`, and `body` fields. Kept in sync with `knowledge_items` via triggers.

---

## MCP Server: brain-knowledge

Agents access the knowledge base via the `brain-knowledge` MCP server (`tools/brain-knowledge-mcp/server.ts`).

### Connection (add to `.mcp.json`)

```json
{
  "brain-knowledge": {
    "command": "node",
    "args": ["--experimental-strip-types", "<repo-root>/tools/brain-knowledge-mcp/server.ts"]
  }
}
```

### Available Tools

| Tool | Description |
|------|-------------|
| `list_knowledge_types` | List all types with item counts |
| `list_items` | List items of a type with optional status/priority filters |
| `get_item` | Fetch full item by type + slug (returns body + metadata) |
| `query_items` | Filter by any combination of type/status/priority/category/owner/effort |
| `search_knowledge` | Full-text search across all knowledge items |

### Example Queries

```
# All repos with stale status
query_items(type="repos", status="stale")

# High-priority open questions
query_items(type="questions", priority="high", status="open")

# Small-effort proposed actions
query_items(type="actions", effort="small", status="proposed")

# Full-text search for "auth" in repos
search_knowledge(query="auth", type="repos")
```

---

## Setup & Migration

```bash
# 1. Install dependencies
cd tools/brain-db && npm install

# 2. Run migration (creates/updates brain.db at repo root)
npm run migrate

# 3. Install MCP server dependencies
cd ../brain-knowledge-mcp && npm install

# 4. Start MCP server
npm start
```

The migration is idempotent — safe to re-run after adding or editing markdown files.
