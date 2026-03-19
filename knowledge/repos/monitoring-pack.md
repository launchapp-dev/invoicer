# monitoring-pack

> Claude Code plugin pack: Monitoring

## Purpose

System metrics, Grafana dashboards, process management, alerts

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-17

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/alert-check` | Check the status of active monitoring alerts |
| `/dashboard-query` | Query Grafana dashboards for metrics |
| `/disk-usage` | Report disk usage across volumes and paths |
| `/network-stats` | Display network throughput and connection stats |
| `/processes` | List and inspect running system processes |
| `/system-health` | Run a full system health check |

## Subagents

| Agent | Purpose |
|-------|---------|
| `alert-responder` | Diagnose and respond to triggered monitoring alerts |
| `capacity-planner` | Analyze usage trends and forecast capacity needs |

## Installation

```
claude plugin add launchapp-dev/monitoring-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
