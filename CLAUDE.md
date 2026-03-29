# Brain — AO Fleet Command Center

This is the org-wide AI workforce command center for the `launchapp-dev` GitHub org. It orchestrates AO daemons across all managed repos, stores knowledge, tracks tasks/requirements, and runs fleet-level workflows.

## AO CLI (v0.2.33)

AO is the Agent Orchestrator — a Rust CLI that runs AI coding agents autonomously. Binary at `~/.local/bin/ao`. Project root: `/Users/samishukri/brain`.

### Core Commands

```bash
ao daemon start --autonomous --auto-run-ready true --pool-size 5 --interval-secs 15
ao daemon stop
ao daemon status                # runtime status (PID, pool, agents)
ao daemon health                # health diagnostics
ao daemon logs                  # read daemon logs
ao daemon stream --pretty       # live structured log stream
ao daemon config                # view automation config
ao daemon config-set <key> <val>
ao daemon pause / resume
ao daemon agents                # list daemon-managed agents
```

### Tasks

```bash
ao task list                    # list with optional filters
ao task create --title "..." --description "..." --priority high --task-type feature
ao task get <id>
ao task update <id> --field value
ao task status <id> <new-status> # backlog|ready|in-progress|review|done|cancelled
ao task assign <id> <assignee>
ao task pause / resume / cancel / reopen <id>
ao task set-priority <id> <priority>
ao task set-deadline <id> <date>
ao task next                    # get next ready task
ao task stats                   # task statistics
ao task history <id>            # workflow dispatch history
ao task checklist-add <id> --item "..."
ao task checklist-update <id> <item-idx> --complete
ao task dependency-add <id> --depends-on <other-id>
```

### Requirements

```bash
ao requirements list
ao requirements create --title "..." --description "..."
ao requirements get <id>
ao requirements update <id> --field value
ao requirements delete <id>
ao requirements execute <id>    # generate tasks + workflows from requirement
ao requirements graph           # view dependency graph
ao requirements mockups <id>    # manage linked mockups/assets
ao requirements recommendations # scan and apply recommendations
```

### Workflows

```bash
ao workflow list
ao workflow get <id>
ao workflow run <definition> [--sync]  # enqueue to daemon (--sync for foreground)
ao workflow resume / pause / cancel <id>
ao workflow decisions <id>      # show workflow decisions
ao workflow checkpoints list <id>
ao workflow phases list / get
ao workflow phase approve <id> <phase>
ao workflow definitions list
ao workflow config get / validate
ao workflow prompt <id> <phase> # inspect rendered prompts
```

### Queue

```bash
ao queue list                   # list queued dispatches
ao queue stats                  # queue statistics
ao queue enqueue --task-id <id> --workflow-ref <name>
ao queue hold / release / drop <id>
ao queue reorder <id1> <id2>    # reorder by subject id
```

### Agent Runs

```bash
ao agent run <prompt>           # start an agent run
ao agent control <run-id> <action>
ao agent status <run-id>
```

### Output & Artifacts

```bash
ao output run <run-id>          # read run event payloads
ao output phase-outputs <id>    # read workflow phase outputs
ao output artifacts <exec-id>   # list artifacts
ao output monitor               # inspect with task/phase filtering
ao output jsonl <run-id>        # aggregated JSONL streams
ao output tail <run-id>         # tail output
```

### Runner

```bash
ao runner health                # runner process health
ao runner orphans-detect        # find orphaned runners
ao runner orphans-cleanup       # clean orphaned runners
ao runner restart-stats         # restart statistics
```

### Skills & Packs

```bash
ao skill search <query>
ao skill install <name>
ao skill list
ao skill show <name>
ao skill update [name]
ao skill publish <path>

ao pack install <path-or-registry>
ao pack list
ao pack inspect <name>
ao pack pin <name> [--enable|--disable]
ao pack search <query>
```

### Utilities

```bash
ao status                       # unified project dashboard
ao doctor                       # environment diagnostics
ao doctor --fix                 # auto-fix common issues
ao setup                        # guided onboarding wizard
ao project                      # manage project metadata
ao git                          # manage repos, worktrees, confirmations
ao history                      # search execution history
ao errors                       # inspect/retry recorded errors
ao model                        # inspect model availability
ao sync                         # sync with remote ao-sync server
ao web                          # serve the AO web UI
ao mcp serve                    # start MCP server (used by .mcp.json)
```

### Global Flags

```
--json                          # machine-readable JSON output (ao.cli.v1 envelope)
--project-root <PATH>           # override project root
```

### Fleet Operations

To start a daemon for a different repo:
```bash
env -u CLAUDECODE -u CLAUDE_CODE_SESSION_ACCESS_TOKEN ao daemon start \
  --autonomous --auto-run-ready true --pool-size 5 --interval-secs 15 \
  --project-root /Users/samishukri/brain/repos/<repo-name>
```

Fleet monitor script: `~/.local/bin/ao-fleet-monitor.sh`

### MCP Integration

AO exposes all CLI operations as MCP tools via `ao mcp serve`. The `.mcp.json` at project root configures this. MCP tool names follow the pattern `mcp__ao__ao_<group>_<command>` (e.g., `mcp__ao__ao_task_create`).

## Project Structure

```
.ao/                    # AO state (config, workflows, state)
  config.json           # project name + version
  workflows/custom.yaml # workflow definitions, agent configs, MCP servers
  state/                # runtime state
knowledge/              # org-wide knowledge base
  architecture.md       # full org architecture doc
  active-workstreams.md # current workstreams across all repos
  fleet/                # fleet status and inventory
  competitive/          # competitor analysis
  products/             # product docs
  repos/                # per-repo knowledge
  yc/                   # YC application materials
repos/                  # cloned org repos (gitignored)
tools/                  # custom MCP servers and scripts
  brain-db/             # brain database tooling
  brain-fleet-mcp/      # fleet MCP server
  brain-knowledge-mcp/  # knowledge MCP server
  brain-products-mcp/   # products MCP server
brain.db                # SQLite database (gitignored)
.mcp.json               # MCP server config for Claude Code
```

## Managed Fleet (12 repos)

brain, ao, ao-cli, ao-skills, design-system, saas-template-launch-app-test, launchapp-nextjs, launchapp-nuxt, launchapp-sveltekit, launchapp.dev, launchpad-baas, agent-orchestrator

## Rules

- Never add yourself as author or co-author to commits
- Never add comments in code unless requested
- Never make new files unless absolutely necessary — confirm first
- Read this file every couple of steps during long tasks
- Use `ao` MCP tools for task/workflow/daemon operations — don't shell out when MCP is available
- When starting daemons, always strip `CLAUDECODE` and `CLAUDE_CODE_SESSION_ACCESS_TOKEN` env vars
- Fleet health checks: use `ao daemon health` per repo or `ao-fleet-monitor.sh` for all
