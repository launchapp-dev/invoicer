# Claude Code Plugin Packs

> 15+ plugin packs for Claude Code + marketplace + ao-skills

## Purpose

A suite of Claude Code plugin packs that extend Claude Code with domain-specific slash commands and subagents. Each pack targets a specific service or workflow domain.

## Maturity: Active Development

All packs updated 2026-03-16 to 2026-03-17 in a coordinated release.

## Visibility: Mixed (most private, some public via marketplace)

---

## `claude-plugin-marketplace` (private)

- **Purpose**: Index/registry of all AudioGenius/LaunchApp Claude Code plugin packs
- **Installation**: `claude plugin marketplace add AudioGenius-ai/claude-plugin-marketplace`
- **Last updated**: 2026-03-17

The marketplace meta-pack provides a discovery interface for all other packs.

---

## Available Plugin Packs

All packs follow the pattern:
- Install: `claude plugin add AudioGenius-ai/<pack-name>`
- Structure: `commands/` for slash commands, `agents/` for subagents
- License: MIT

### Database Packs

| Pack | Description | Key Capabilities |
|------|-------------|-----------------|
| `supabase-pack` | Supabase workflow | Auth, storage, edge functions, migrations, SQL |
| `postgres-pack` | PostgreSQL | Schema design, migrations, query optimization, explain plans |
| `firebase-pack` | Firebase | Firestore, auth, Cloud Functions, hosting, storage |

### Cloud & DevOps Packs

| Pack | Description | Key Capabilities |
|------|-------------|-----------------|
| `aws-pack` | AWS | S3, Lambda, EC2, CloudWatch, infrastructure |
| `docker-pack` | Docker | Container management, compose workflows, image inspection |
| `monitoring-pack` | Monitoring | System metrics, Grafana dashboards, process management, alerts |

### Development Packs

| Pack | Description | Key Capabilities |
|------|-------------|-----------------|
| `playwright-pack` | Browser automation | E2E testing, screenshots, accessibility audits |
| `stripe-pack` | Stripe | Payment flows, webhook debugging, subscription management |
| `figma-pack` | Figma | Design token extraction, component specs, design-to-code |
| `research-pack` | Research | Web search, docs lookup, citation management (Brave/Tavily/Context7) |
| `ollama-pack` | Ollama | Local LLM inference, model management, prompt testing |

### Productivity Packs

| Pack | Description | Key Capabilities |
|------|-------------|-----------------|
| `google-workspace-pack` | Google Workspace | Gmail, Calendar, Drive, Docs, Sheets |
| `slack-pack` | Slack | Channel monitoring, standup automation, notifications |
| `linear-pack` | Linear | Issue tracking, sprint planning, triage automation |
| `pdf-pack` | PDF processing | Generation, parsing, form filling, OCR, document processing |

---

## `ao-skills` (public)

- **Purpose**: Claude Code plugin providing AO-specific slash commands and reference skills
- **Install**: `/plugin marketplace add launchapp-dev/ao-skills`
- **Last updated**: 2026-03-19

See [02-ao-agent-orchestrator.md](./02-ao-agent-orchestrator.md) for full details.

---

## `ao-bundled-packs` (private)

- **Purpose**: AO workflow extension packs (differs from Claude Code packs — these extend AO's workflow system, not Claude Code directly)
- **Last updated**: 2026-03-18

### Available AO Packs

| Pack | Description | Required |
|------|-------------|---------|
| `ao.reddit` | Reddit monitoring, comment drafting, engagement tasks | `TAVILY_API_KEY` |

---

## Pack Architecture

Each Claude Code plugin pack follows this structure:
```
<pack-name>/
  commands/   - Slash command definitions (YAML/Markdown)
  agents/     - Subagent definitions
  README.md   - Pack description
```

The `claude-plugin-marketplace` acts as an index, allowing users to browse and install packs from a single entry point.

---

## Notes

- All 15 Claude Code packs were created on 2026-03-16/17 in a single batch release
- Packs are currently private but MIT-licensed (likely going public)
- The `ao-bundled-packs` is a different system: it uses AO's pack system (`pack.toml` format), not Claude Code's plugin format
