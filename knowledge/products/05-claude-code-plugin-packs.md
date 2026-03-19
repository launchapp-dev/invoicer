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

| Pack | Commands | Agents | Key Capabilities |
|------|----------|--------|-----------------|
| `supabase-pack` | `auth-setup`, `db-schema`, `edge-function`, `migrate`, `rls-check`, `seed-data`, `storage-manage` | `schema-reviewer` | Auth, storage, edge functions, migrations, RLS |
| `postgres-pack` | `connection-pool`, `create-migration`, `explain-query`, `index-advisor`, `schema-diff`, `table-stats` | `query-optimizer`, `schema-designer` | Schema design, migrations, query optimization, explain plans |
| `firebase-pack` | `auth-users`, `deploy-functions`, `emulator`, `firestore-browse`, `hosting-deploy`, `security-rules`, `storage-manage` | `function-debugger`, `security-rules-reviewer` | Firestore, auth, Cloud Functions, hosting, storage |

### Cloud & DevOps Packs

| Pack | Commands | Agents | Key Capabilities |
|------|----------|--------|-----------------|
| `aws-pack` | `cloudwatch-alarms`, `cost-report`, `ec2-instances`, `iam-audit`, `lambda-logs`, `s3-browse`, `security-groups` | `deployment-manager`, `infra-auditor` | S3, Lambda, EC2, CloudWatch, IAM |
| `docker-pack` | `compose-up`, `containers`, `dockerfile-review`, `image-scan`, `logs`, `network-inspect` | `container-debugger` | Container management, compose workflows, image inspection |
| `monitoring-pack` | `alert-check`, `dashboard-query`, `disk-usage`, `network-stats`, `processes`, `system-health` | `alert-responder`, `capacity-planner` | System metrics, Grafana dashboards, process management, alerts |

### Development Packs

| Pack | Commands | Agents | Key Capabilities |
|------|----------|--------|-----------------|
| `playwright-pack` | `accessibility-audit`, `performance-audit`, `record-flow`, `scrape-page`, `screenshot`, `test-flow` | `form-tester`, `visual-regression` | E2E testing, screenshots, accessibility audits |
| `stripe-pack` | `create-checkout`, `customers`, `payments`, `subscriptions`, `webhook-debug` | `payment-debugger` | Payment flows, webhook debugging, subscription management |
| `figma-pack` | `component-spec`, `export-assets`, `extract-tokens`, `list-components`, `style-guide` | `design-reviewer`, `design-to-code` | Design token extraction, component specs, design-to-code |
| `research-pack` | `changelog`, `compare-libs`, `find-examples`, `lookup-docs`, `research` | `deep-researcher`, `docs-assistant` | Web search, docs lookup, citation management (Brave/Tavily/Context7) |
| `ollama-pack` | `benchmark`, `chat-local`, `embeddings`, `models`, `prompt-test`, `pull-model` | `model-evaluator`, `prompt-optimizer` | Local LLM inference, model management, prompt testing |

### Productivity Packs

| Pack | Commands | Agents | Key Capabilities |
|------|----------|--------|-----------------|
| `google-workspace-pack` | `calendar-today`, `create-doc`, `draft-email`, `drive-search`, `inbox-summary`, `schedule-meeting`, `search-emails` | `email-triage`, `meeting-prep`, `weekly-digest` | Gmail, Calendar, Drive, Docs, Sheets |
| `slack-pack` | `channel-summary`, `search-messages`, `send-message`, `standup`, `thread-summary` | `incident-responder`, `standup-bot` | Channel monitoring, standup automation, notifications |
| `linear-pack` | `backlog-triage`, `create-issue`, `link-pr`, `my-issues`, `sprint-summary`, `team-velocity` | `issue-linker`, `sprint-planner` | Issue tracking, sprint planning, triage automation |
| `pdf-pack` | `extract-tables`, `extract-text`, `fill-form`, `merge-pdfs`, `pdf-summary`, `pdf-to-markdown` | `contract-reviewer`, `document-analyzer` | PDF generation, parsing, form filling, OCR |

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
