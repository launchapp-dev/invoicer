# linear-pack

> Claude Code plugin pack: Linear

## Purpose

Linear issue tracking, sprint planning, triage automation

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/backlog-triage` | Triage and prioritize backlog issues |
| `/create-issue` | Create a new Linear issue |
| `/link-pr` | Link a pull request to a Linear issue |
| `/my-issues` | List issues assigned to the current user |
| `/sprint-summary` | Summarize current sprint progress and blockers |
| `/team-velocity` | Report team velocity and cycle time metrics |

## Subagents

| Agent | Purpose |
|-------|---------|
| `issue-linker` | Automatically link commits and PRs to Linear issues |
| `sprint-planner` | Assist with sprint planning and capacity estimation |

## Installation

```
claude plugin add launchapp-dev/linear-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
