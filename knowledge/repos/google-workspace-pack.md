# google-workspace-pack

> Claude Code plugin pack: Google Workspace

## Purpose

Google Workspace integration — Gmail, Calendar, Drive, Docs, Sheets

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/calendar-today` | Show today's calendar events |
| `/create-doc` | Create a new Google Doc |
| `/draft-email` | Draft an email in Gmail |
| `/drive-search` | Search for files in Google Drive |
| `/inbox-summary` | Summarize unread Gmail inbox messages |
| `/schedule-meeting` | Schedule a meeting on Google Calendar |
| `/search-emails` | Search Gmail for specific emails |

## Subagents

| Agent | Purpose |
|-------|---------|
| `email-triage` | Triage and prioritize unread emails |
| `meeting-prep` | Prepare briefs and agendas for upcoming meetings |
| `weekly-digest` | Generate a weekly digest of emails and calendar activity |

## Installation

```
claude plugin add launchapp-dev/google-workspace-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
