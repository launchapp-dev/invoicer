# docker-pack

> Claude Code plugin pack: Docker

## Purpose

Docker container management, compose workflows, image inspection

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/compose-up` | Start services defined in a Docker Compose file |
| `/containers` | List running and stopped containers |
| `/dockerfile-review` | Review a Dockerfile for best practices and issues |
| `/image-scan` | Scan a Docker image for vulnerabilities |
| `/logs` | Tail logs from a running container |
| `/network-inspect` | Inspect Docker networks and container connectivity |

## Subagents

| Agent | Purpose |
|-------|---------|
| `container-debugger` | Diagnose crashing or misbehaving containers |

## Installation

```
claude plugin add launchapp-dev/docker-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
