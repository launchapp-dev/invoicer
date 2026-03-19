# brain-products MCP Server — API Reference

> Domain-specific MCP server for querying product, repo, SDK, and org knowledge.
> Server name: `brain-products` | Source: `tools/brain-products-mcp/server.ts`

## Overview

`brain-products` provides typed, filterable tools for every major domain in the brain knowledge base.
It reads from the SQLite layer (TASK-064) and falls back to raw markdown for files not in the DB.

**Performance**: All list operations hit SQLite indexes — sub-10ms response times typical.

---

## Setup

```bash
# 1. Install dependencies
cd tools/brain-products-mcp && npm install

# 2. Ensure brain.db is populated (run once, re-run after knowledge/ changes)
cd ../brain-db && npm install && npm run migrate
```

### Add to an agent (custom.yaml)

```yaml
mcp_servers:
  brain-products:
    command: node
    args: ["--experimental-strip-types", "/path/to/brain/tools/brain-products-mcp/server.ts"]
```

### Add to .mcp.json

```json
{
  "brain-products": {
    "command": "node",
    "args": ["--experimental-strip-types", "<repo-root>/tools/brain-products-mcp/server.ts"]
  }
}
```

### Custom DB path

```bash
node --experimental-strip-types server.ts --db /custom/path/brain.db
```

---

## Tools

### Products

#### `products_list`

List all products. Supports filtering and pagination.

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string? | Filter by status (e.g. `active`, `archived`) |
| `limit` | number? | Max results (default 50) |
| `offset` | number? | Pagination offset (default 0) |

```
products_list()
products_list(status="active")
products_list(limit=5, offset=0)
```

#### `products_get`

Fetch a product by slug (returns full markdown body + metadata).

```
products_get(slug="01-launchpad-baas")
products_get(slug="02-ao-agent-orchestrator")
```

#### `products_search`

Full-text search across products.

```
products_search(query="authentication SDK")
products_search(query="payments", limit=5)
```

---

### Repos

#### `repos_list`

List repos with optional status/category filters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string? | Filter by status (e.g. `active`, `stale`, `archived`) |
| `category` | string? | Filter by category |
| `limit` | number? | Max results (default 50) |
| `offset` | number? | Pagination offset (default 0) |

```
repos_list(status="active")
repos_list(category="auth", limit=20)
```

#### `repos_get`

```
repos_get(slug="launchpad-baas")
repos_get(slug="ao-cli")
```

#### `repos_search`

```
repos_search(query="auth middleware")
repos_search(query="Hono API", limit=5)
```

---

### SDKs

#### `sdks_list`

List SDK repos (repos whose slug contains `sdk`).

```
sdks_list()
sdks_list(limit=20)
```

#### `sdks_get`

```
sdks_get(slug="launchpad-auth-sdk")
sdks_get(slug="launchpad-db-sdk")
```

---

### Competitors

#### `competitors_list`

```
competitors_list()
competitors_list(limit=10, offset=0)
```

#### `competitors_get`

```
competitors_get(slug="supabase")
competitors_get(slug="firebase")
```

---

### Team & Vision

#### `team_founders`

Get the founders profile (reads `knowledge/team/founders.md`).

```
team_founders()
```

#### `vision_get`

Get the org vision and mission (`knowledge/vision.md`). Always reads from filesystem.

```
vision_get()
```

---

### Ideas

#### `ideas_list`

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string? | Filter by status |
| `limit` | number? | Max results (default 50) |
| `offset` | number? | Pagination offset (default 0) |

```
ideas_list()
ideas_list(status="proposed")
```

#### `ideas_get`

```
ideas_get(slug="new-products")
ideas_get(slug="feature-proposals")
```

---

### Actions

#### `actions_list`

Full filter support across all action fields.

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string? | e.g. `proposed`, `in-progress`, `done` |
| `priority` | string? | `critical`, `high`, `medium`, `low` |
| `effort` | string? | `small`, `medium`, `large` |
| `category` | string? | Domain category |
| `owner` | string? | Assigned owner |
| `limit` | number? | Max results (default 50) |
| `offset` | number? | Pagination offset (default 0) |

```
actions_list(status="proposed", priority="high")
actions_list(effort="small", status="proposed")
actions_list(owner="sami", limit=20)
```

#### `actions_get`

```
actions_get(slug="fix-sdk-readmes")
```

---

### Questions

#### `questions_list`

| Parameter | Type | Description |
|-----------|------|-------------|
| `priority` | string? | `critical`, `high`, `medium`, `low` |
| `status` | string? | e.g. `open`, `answered` |
| `category` | string? | Domain category |
| `limit` | number? | Max results (default 50) |
| `offset` | number? | Pagination offset (default 0) |

```
questions_list(priority="high", status="open")
questions_list(category="monetization")
```

#### `questions_get`

```
questions_get(slug="pricing-strategy")
```

---

### Architecture

#### `architecture_list`

```
architecture_list()
architecture_list(limit=10, offset=0)
```

#### `architecture_get`

```
architecture_get(slug="launchpad-baas-overview")
architecture_get(slug="ao-agent-workflow")
```

---

## Response Format

All tools return JSON. List tools return arrays of summary objects:

```json
[
  {
    "slug": "01-launchpad-baas",
    "title": "LaunchPad BaaS",
    "status": "active",
    "priority": null,
    "effort": null,
    "category": null,
    "owner": null,
    "file_path": "knowledge/products/01-launchpad-baas.md"
  }
]
```

Get tools return the full object with `body` (markdown) and `metadata` (parsed frontmatter):

```json
{
  "slug": "01-launchpad-baas",
  "title": "LaunchPad BaaS",
  "status": "active",
  "file_path": "knowledge/products/01-launchpad-baas.md",
  "metadata": { "title": "LaunchPad BaaS" },
  "body": "# LaunchPad BaaS\n\n> Backend-as-a-Service..."
}
```

---

## Difference from brain-knowledge MCP

| Feature | `brain-knowledge` | `brain-products` |
|---------|-------------------|------------------|
| API style | Generic (type param) | Domain-specific tools |
| Filtering | type + status + priority | Per-domain with all relevant fields |
| Pagination | No (limit only) | Yes (limit + offset) |
| Filesystem fallback | No | Yes (for get operations) |
| vision.md | No (not in DB) | `vision_get` reads directly |
| SDKs | Via `list_items(type=repos)` | `sdks_list` (pre-filtered) |
| Search | All types or one | Per-domain (`products_search`, `repos_search`) |

Use `brain-knowledge` for broad cross-type queries; use `brain-products` when you need typed, domain-focused access.
