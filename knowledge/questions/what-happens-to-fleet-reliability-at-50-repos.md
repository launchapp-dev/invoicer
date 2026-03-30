---
title: "What happens to fleet reliability when we scale from 12 repos to 50+?"
priority: high
status: open
category: technical-debt
source_files:
  - knowledge/fleet/inventory.md
  - knowledge/fleet/status.md
  - knowledge/phases/current.md
  - knowledge/architecture.md
generated_by: question-generator
generated_at: 2026-03-30
---

## Context

The fleet currently manages 12 repos with 86% health (1 daemon crashed, systemic runner failures). The vision describes a future with template marketplace, third-party workflows, and AO Cloud managing fleets for customers. If we can't reliably manage 12 repos, how will we manage 50+ or customer fleets?

## What We Know

- Current fleet: 12 repos, 6/7 key daemons RUNNING (86% health)
- launchapp-nuxt daemon crashed with orphaned runner (TASK-880)
- Systemic workflow runner failures blocking multiple tasks (TASK-463, TASK-520, TASK-716)
- design-system daemon idle at 0% utilization despite 13 CVEs (TASK-520 blocked)
- 64 queued tasks across fleet with capacity constraints
- 23 new repos created in late March without corresponding fleet capacity increase
- AO Pro and AO Team tiers promise multi-repo and fleet management capabilities
- No evidence of automated fleet recovery (manual TASK-880 created for daemon restart)

## What We Don't Know

- What is the root cause of systemic runner failures—is it resource exhaustion, configuration drift, or code defects?
- What is the fleet's actual capacity limit before reliability degrades non-linearly?
- How will we offer "fleet management" as a paid feature (AO Team) when our own fleet has 86% health?
- Is the current 10-minute conductor cycle creating too much scheduling pressure?
- What monitoring/alerting exists for daemon crashes, and why didn't it auto-recover nuxt?

## Suggested Investigation

1. **Root Cause Analysis**: Deep dive on TASK-463 (runner investigation) findings—document systemic failure patterns
2. **Load Testing**: Determine fleet capacity limits by measuring daemon stability vs. repo count
3. **Auto-Recovery Design**: Implement and test automated daemon restart on crash (currently manual TASK creation)
4. **Fleet Health SLA**: Define acceptable fleet health % for AO Team customer promises vs. internal operations
5. **Capacity Planning**: Model fleet infrastructure needed for 50 repos, 100 repos, and first customer fleet
6. **Observability Gap**: Add daemon crash alerting, queue depth monitoring, and utilization trending

## Answer

_To be filled in by the team or an investigating agent._
