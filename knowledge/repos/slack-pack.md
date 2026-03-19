# slack-pack

> Claude Code plugin pack: Slack

## Purpose

Slack channel monitoring, standup automation, notifications

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/channel-summary` | Summarize recent activity in a Slack channel |
| `/search-messages` | Search Slack messages across channels |
| `/send-message` | Send a message to a channel or user |
| `/standup` | Post or collect standup updates |
| `/thread-summary` | Summarize a Slack thread |

## Subagents

| Agent | Purpose |
|-------|---------|
| `incident-responder` | Coordinate incident response via Slack channels |
| `standup-bot` | Automate daily standup collection and reporting |

## Installation

```
claude plugin add launchapp-dev/slack-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
