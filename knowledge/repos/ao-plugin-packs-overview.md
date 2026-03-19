# AO Plugin Packs — Overview

All 15 plugin packs follow an identical structure and were published to the `launchapp-dev` GitHub org on 2026-03-16 to 2026-03-17. Each pack is also indexed in `claude-plugin-marketplace`.

## Common Structure

Every pack repo shares this layout:

```
<pack-name>/
├── README.md
├── LICENSE
├── pack.toml                        # AO pack manifest (schema: ao.pack.v1, mode: installed)
├── .claude-plugin                   # Claude Code plugin manifest
├── .mcp.json                        # MCP server bindings
├── setup.sh                         # Optional setup script
├── commands/                        # Slash commands (one .md file per command)
├── agents/                          # Subagent definitions (.md files)
├── skills/                          # Skill definitions
├── workflows/                       # AO workflow YAML
├── runtime/
│   └── agent-runtime.overlay.yaml  # Agent runtime overlay
└── hooks/                           # Claude Code hooks
```

### pack.toml schema

```toml
schema = "ao.pack.v1"
id = "<pack-id>"
version = "0.1.0"
kind = "connector-pack" | "capability-pack"
[compatibility]
ao_core = ">=0.1.0"
workflow_schema = "v2"
[workflows]
root = "workflows"
exports = [...]
[runtime]
agent_overlay = "runtime/agent-runtime.overlay.yaml"
[permissions]
tools = ["ao"]
```

**Pack kinds:**
- `connector-pack` — integrates an external service/API (AWS, Slack, Stripe, etc.)
- `capability-pack` — adds a general capability without a specific external service dependency (monitoring, ollama, playwright, pdf, research)

## Installation

```bash
claude plugin add AudioGenius-ai/<pack-name>
```

---

## Pack Catalog

### aws-pack

**Repo:** launchapp-dev/aws-pack
**Last pushed:** 2026-03-17
**Kind:** connector-pack
**Purpose:** AWS infrastructure management, cost optimization, and security audit workflows.

**Commands (7):**
- `cloudwatch-alarms` — view and manage CloudWatch alarms
- `cost-report` — AWS cost analysis
- `ec2-instances` — list and manage EC2 instances
- `iam-audit` — IAM policy and permission audit
- `lambda-logs` — tail and search Lambda function logs
- `s3-browse` — browse S3 buckets and objects
- `security-groups` — inspect and manage security groups

**Agents (2):** `deployment-manager`, `infra-auditor`

**Exported workflows:** `aws/security-audit`, `aws/cost-optimize`, `aws/deploy`

---

### docker-pack

**Repo:** launchapp-dev/docker-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Docker container management workflows and automation.

**Commands (6):**
- `compose-up` — manage Docker Compose stacks
- `containers` — list and inspect running containers
- `dockerfile-review` — review and lint Dockerfiles
- `image-scan` — scan images for vulnerabilities
- `logs` — tail container logs
- `network-inspect` — inspect Docker networks

**Agents (1):** `container-debugger`

**Exported workflows:** `docker/deploy`, `docker/debug`, `docker/review-dockerfile`

---

### figma-pack

**Repo:** launchapp-dev/figma-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Figma design token extraction, component specs, and design-to-code workflows.

**Commands (5):**
- `component-spec` — extract component specifications
- `export-assets` — export design assets
- `extract-tokens` — extract design tokens (colors, spacing, typography)
- `list-components` — list Figma components
- `style-guide` — generate style guide from Figma file

**Agents (2):** `design-reviewer`, `design-to-code`

**Exported workflows:** `figma/design-to-code`, `figma/design-review`, `figma/token-extraction`

---

### firebase-pack

**Repo:** launchapp-dev/firebase-pack
**Last pushed:** 2026-03-17
**Kind:** connector-pack
**Purpose:** Firebase Firestore, auth, Cloud Functions, and hosting workflows.

**Commands (7):**
- `auth-users` — manage Firebase auth users
- `deploy-functions` — deploy Cloud Functions
- `emulator` — start and manage Firebase emulators
- `firestore-browse` — browse Firestore collections
- `hosting-deploy` — deploy to Firebase Hosting
- `security-rules` — view and edit security rules
- `storage-manage` — manage Firebase Storage

**Agents (2):** `function-debugger`, `security-rules-reviewer`

**Exported workflows:** `firebase/deploy`, `firebase/security-audit`, `firebase/debug`

---

### google-workspace-pack

**Repo:** launchapp-dev/google-workspace-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Google Workspace integration — Gmail, Calendar, Drive, Docs, Sheets workflows.

**Commands (7):**
- `calendar-today` — show today's calendar events
- `create-doc` — create a new Google Doc
- `draft-email` — draft and send emails
- `drive-search` — search Google Drive
- `inbox-summary` — summarize inbox
- `schedule-meeting` — create calendar events
- `search-emails` — search Gmail

**Agents (3):** `email-triage`, `meeting-prep`, `weekly-digest`

**Exported workflows:** `google-workspace/email-triage`, `google-workspace/meeting-prep`, `google-workspace/weekly-digest`

---

### linear-pack

**Repo:** launchapp-dev/linear-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Linear issue tracking, sprint planning, and triage workflows.

**Commands (6):**
- `backlog-triage` — triage and prioritize backlog
- `create-issue` — create a new Linear issue
- `link-pr` — link a PR to a Linear issue
- `my-issues` — show assigned issues
- `sprint-summary` — summarize current sprint
- `team-velocity` — show team velocity metrics

**Agents (2):** `issue-linker`, `sprint-planner`

**Exported workflows:** `linear/sprint-plan`, `linear/triage`, `linear/retrospective`

---

### monitoring-pack

**Repo:** launchapp-dev/monitoring-pack
**Last pushed:** 2026-03-17
**Kind:** capability-pack
**Purpose:** System monitoring, Grafana dashboards, and alert response workflows.

**Commands (6):**
- `alert-check` — check active alerts
- `dashboard-query` — query Grafana dashboards
- `disk-usage` — analyze disk usage
- `network-stats` — show network statistics
- `processes` — list and manage processes
- `system-health` — overall system health check

**Agents (2):** `alert-responder`, `capacity-planner`

**Exported workflows:** `monitoring/incident-response`, `monitoring/health-check`, `monitoring/capacity-review`

---

### ollama-pack

**Repo:** launchapp-dev/ollama-pack
**Last pushed:** 2026-03-17
**Kind:** capability-pack
**Purpose:** Local LLM inference, model management, and prompt testing workflows via Ollama.

**Commands (6):**
- `benchmark` — benchmark model performance
- `chat-local` — chat with a local model
- `embeddings` — generate embeddings
- `models` — list available local models
- `prompt-test` — test prompts across models
- `pull-model` — download a new model

**Agents (2):** `model-evaluator`, `prompt-optimizer`

**Exported workflows:** `ollama/evaluate`, `ollama/prompt-optimize`

---

### pdf-pack

**Repo:** launchapp-dev/pdf-pack
**Last pushed:** 2026-03-17
**Kind:** capability-pack
**Purpose:** PDF generation, parsing, OCR, and document processing workflows.

**Commands (6):**
- `extract-tables` — extract tables from PDFs
- `extract-text` — extract text content
- `fill-form` — fill PDF forms
- `merge-pdfs` — merge multiple PDFs
- `pdf-summary` — summarize PDF content
- `pdf-to-markdown` — convert PDF to Markdown

**Agents (2):** `contract-reviewer`, `document-analyzer`

**Exported workflows:** `pdf/analyze`, `pdf/extract`, `pdf/convert`

---

### playwright-pack

**Repo:** launchapp-dev/playwright-pack
**Last pushed:** 2026-03-16
**Kind:** capability-pack
**Purpose:** Browser automation, E2E testing, and accessibility audit workflows.

**Commands (6):**
- `accessibility-audit` — run accessibility audit on a URL
- `performance-audit` — run performance audit
- `record-flow` — record a browser interaction
- `scrape-page` — scrape page content
- `screenshot` — take a screenshot
- `test-flow` — run an E2E test flow

**Agents (2):** `form-tester`, `visual-regression`

**Exported workflows:** `playwright/e2e-test`, `playwright/accessibility`, `playwright/visual-regression`

---

### postgres-pack

**Repo:** launchapp-dev/postgres-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** PostgreSQL schema design, query optimization, and migration workflows.

**Commands (6):**
- `connection-pool` — monitor connection pool
- `create-migration` — generate a new migration
- `explain-query` — run EXPLAIN ANALYZE on a query
- `index-advisor` — suggest missing indexes
- `schema-diff` — diff schema between environments
- `table-stats` — show table statistics

**Agents (2):** `query-optimizer`, `schema-designer`

**Exported workflows:** `postgres/optimize`, `postgres/migrate`, `postgres/audit`

---

### research-pack

**Repo:** launchapp-dev/research-pack
**Last pushed:** 2026-03-16
**Kind:** capability-pack
**Purpose:** Web search, documentation lookup, and deep research workflows via Brave/Tavily/Context7.

**Commands (5):**
- `changelog` — look up library changelogs
- `compare-libs` — compare libraries and frameworks
- `find-examples` — find code examples for a topic
- `lookup-docs` — look up library documentation
- `research` — deep multi-source research with citations

**Agents (2):** `deep-researcher`, `docs-assistant`

**Exported workflows:** `research/deep-dive`, `research/docs-lookup`, `research/compare`

---

### slack-pack

**Repo:** launchapp-dev/slack-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Slack communication, standup automation, and incident response workflows.

**Commands (5):**
- `channel-summary` — summarize a Slack channel
- `search-messages` — search Slack messages
- `send-message` — send a Slack message
- `standup` — run standup collection
- `thread-summary` — summarize a thread

**Agents (2):** `incident-responder`, `standup-bot`

**Exported workflows:** `slack/standup`, `slack/incident`, `slack/digest`

---

### stripe-pack

**Repo:** launchapp-dev/stripe-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Stripe payment flow, webhook debugging, and subscription workflows.

**Commands (5):**
- `create-checkout` — create a checkout session
- `customers` — search and inspect customers
- `payments` — view payment history
- `subscriptions` — manage subscriptions
- `webhook-debug` — debug webhook events

**Agents (1):** `payment-debugger`

**Exported workflows:** `stripe/payment-debug`, `stripe/integration-review`

---

### supabase-pack

**Repo:** launchapp-dev/supabase-pack
**Last pushed:** 2026-03-16
**Kind:** connector-pack
**Purpose:** Supabase workflow — auth, storage, edge functions, migrations, RLS audit.

**Commands (7):**
- `auth-setup` — configure Supabase auth
- `db-schema` — view and edit database schema
- `edge-function` — manage edge functions
- `migrate` — run and manage migrations
- `rls-check` — audit Row Level Security policies
- `seed-data` — generate and run seed data
- `storage-manage` — manage Supabase Storage

**Agents (1):** `schema-reviewer`

**Exported workflows:** `supabase/migrate`, `supabase/security-audit`, `supabase/edge-function`

---

## Summary Table

| Pack | Kind | Commands | Agents | AO Workflows | Last Pushed |
|------|------|----------|--------|--------------|-------------|
| aws-pack | connector | 7 | 2 | 3 | 2026-03-17 |
| docker-pack | connector | 6 | 1 | 3 | 2026-03-16 |
| figma-pack | connector | 5 | 2 | 3 | 2026-03-16 |
| firebase-pack | connector | 7 | 2 | 3 | 2026-03-17 |
| google-workspace-pack | connector | 7 | 3 | 3 | 2026-03-16 |
| linear-pack | connector | 6 | 2 | 3 | 2026-03-16 |
| monitoring-pack | capability | 6 | 2 | 3 | 2026-03-17 |
| ollama-pack | capability | 6 | 2 | 2 | 2026-03-17 |
| pdf-pack | capability | 6 | 2 | 3 | 2026-03-17 |
| playwright-pack | capability | 6 | 2 | 3 | 2026-03-16 |
| postgres-pack | connector | 6 | 2 | 3 | 2026-03-16 |
| research-pack | capability | 5 | 2 | 3 | 2026-03-16 |
| slack-pack | connector | 5 | 2 | 3 | 2026-03-16 |
| stripe-pack | connector | 5 | 1 | 2 | 2026-03-16 |
| supabase-pack | connector | 7 | 1 | 3 | 2026-03-16 |

**Total:** 15 packs — 10 connector-packs, 5 capability-packs
All packs: version 0.1.0, ao_core >=0.1.0, workflow_schema v2

## Dependencies

- **Claude Code** — primary runtime for slash commands and agents (`claude plugin add`)
- **ao-cli** — secondary runtime for AO workflow execution (`ao pack install`)
- **claude-plugin-marketplace** — indexes all 15 packs for discovery

Each pack is self-contained with no cross-pack dependencies. External service API keys/credentials are required for connector-packs.
