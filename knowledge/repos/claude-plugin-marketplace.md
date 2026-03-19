# claude-plugin-marketplace

**Repo:** launchapp-dev/claude-plugin-marketplace
**Description:** AudioGenius plugin marketplace — indexes all plugin packs
**Last pushed:** 2026-03-17
**Visibility:** Public
**Maturity:** Active (initial release 2026-03-17)

## Purpose

A Claude Code plugin marketplace index that registers all 15 AudioGenius plugin packs into a single installable marketplace. Users install the marketplace once and gain access to all indexed packs via `claude plugin add`.

## Structure

```
claude-plugin-marketplace/
├── README.md
├── LICENSE
└── .claude-plugin/
    └── marketplace.json    # Claude Code marketplace manifest
```

## Marketplace Manifest

- **Schema:** `https://anthropic.com/claude-code/marketplace.schema.json`
- **Name:** `audiogenius-plugins`
- **Owner:** AudioGenius AI (dev@audiogenius.ai)
- **Plugin count:** 15

## Installation

```bash
claude plugin marketplace add AudioGenius-ai/claude-plugin-marketplace
```

## Indexed Packs by Category

### Productivity
| Pack | Description |
|------|-------------|
| google-workspace-pack | Gmail, Calendar, Drive, Docs, Sheets |
| slack-pack | Channel monitoring, standups, incident response |
| linear-pack | Issue tracking, sprint planning, triage |
| pdf-pack | PDF processing, extraction, conversion |

### Database
| Pack | Description |
|------|-------------|
| supabase-pack | Auth, storage, edge functions, migrations |
| postgres-pack | Query optimization, schema design, migrations |
| firebase-pack | Firestore, auth, Cloud Functions, hosting |

### DevOps & Cloud
| Pack | Description |
|------|-------------|
| docker-pack | Container management, Dockerfile review |
| monitoring-pack | System metrics, Grafana, alert response |
| aws-pack | EC2, S3, Lambda, IAM audit, cost optimization |

### Development & Testing
| Pack | Description |
|------|-------------|
| playwright-pack | E2E testing, accessibility audits |
| stripe-pack | Payment flows, webhook debugging |
| figma-pack | Design tokens, component specs, design-to-code |
| research-pack | Web search, docs lookup, library comparison |

### AI
| Pack | Description |
|------|-------------|
| ollama-pack | Local LLM inference, model management, prompt testing |

## Dependencies

Each pack in the marketplace is sourced from its own GitHub repo under the `AudioGenius-ai` org:
```
"source": { "source": "url", "url": "https://github.com/AudioGenius-ai/<pack-name>.git" }
```

## Relationship to ao-bundled-packs

This marketplace is for **Claude Code** plugin packs only. The `ao-bundled-packs` repo serves the **AO CLI** runtime with a different pack format (`ao.pack.v1`). These are parallel distribution systems targeting different runtimes.
