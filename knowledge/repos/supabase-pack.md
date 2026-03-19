# supabase-pack

> Claude Code plugin pack: Supabase

## Purpose

Supabase workflow — auth, storage, edge functions, migrations, SQL

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/auth-setup` | Configure Supabase Auth providers and settings |
| `/db-schema` | Inspect the current database schema |
| `/edge-function` | Deploy or invoke a Supabase Edge Function |
| `/migrate` | Run pending database migrations |
| `/rls-check` | Audit Row Level Security policies on tables |
| `/seed-data` | Seed the database with test or fixture data |
| `/storage-manage` | Manage files and buckets in Supabase Storage |

## Subagents

| Agent | Purpose |
|-------|---------|
| `schema-reviewer` | Review database schema for design issues and missing RLS policies |

## Installation

```
claude plugin add launchapp-dev/supabase-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
