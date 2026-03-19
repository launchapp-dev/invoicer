# postgres-pack

> Claude Code plugin pack: PostgreSQL

## Purpose

PostgreSQL schema design, migrations, query optimization, explain plans

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/connection-pool` | Inspect and configure the database connection pool |
| `/create-migration` | Generate a new database migration file |
| `/explain-query` | Run EXPLAIN ANALYZE on a query and interpret the plan |
| `/index-advisor` | Recommend indexes for slow or missing-index queries |
| `/schema-diff` | Diff two database schemas or migration states |
| `/table-stats` | Show table size, row counts, and bloat statistics |

## Subagents

| Agent | Purpose |
|-------|---------|
| `query-optimizer` | Analyze and rewrite slow queries for better performance |
| `schema-designer` | Design normalized schemas and suggest improvements |

## Installation

```
claude plugin add launchapp-dev/postgres-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
