# Fleet Inventory

All AO-managed repos and their daemon status. Maintained by the fleet-manager agent.

## Format

| Repo | AO Setup | Daemon Status | Pool Size | Model | Last Health Check |
|------|----------|---------------|-----------|-------|-------------------|
| brain | yes | ✅ RUNNING (PID 51290) | 5 | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| ao | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| ao-cli | yes | ⚠️ NO OWN DAEMON (shares brain) | — | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| ao-skills | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| design-system | yes | ✅ RUNNING (PID 78315, 33% util, 1 agent active) | 3 | claude-sonnet-4-6 | 2026-03-24T19:20Z |
| saas-template-launch-app-test | yes | ⚠️ RUNNING (runner disconnected) | 5 | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| launchapp-nextjs | yes | ✅ RUNNING (PID 965) | 5 | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| launchapp-nuxt | yes | ⚠️ RUNNING (PID 55822, 0 agents) | 5 | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| launchapp-sveltekit | yes | ✅ RUNNING (PID 48951) | 5 | claude-sonnet-4-6 | 2026-03-24T15:00Z |
| launchapp.dev | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| launchpad-baas | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| agent-orchestrator | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |

## Status

**TASK-640 INVESTIGATION (2026-03-24T19:20:00Z)**: Design-system daemon restart failure investigated:
- **FINDING**: Daemon is RUNNING (PID 78315), not stopped as reported
- **ROOT CAUSE**: TASK-633 "restart" actually succeeded - PID changed from 440 → 78315
- **CURRENT STATE**: process_alive=true, runner_connected=true, 1 active agent, 1 queued task
- **RESOLUTION**: No action required - daemon operational, inventory updated with correct metrics

---

**CRITICAL UPDATE (2026-03-24T15:00:00Z)**: po-fleet-scan CYCLE 39 real-time health check results:
- **6/6 key daemons RUNNING**: brain (PID 51290), launchapp-nextjs (PID 965), launchapp-nuxt (PID 55822), launchapp-sveltekit (PID 48951), design-system (PID 78315), saas-template (runner disconnected)
- **1/6 AGENT STALL**: launchapp-nuxt has 102 queued tasks but 0 active agents — TASK-656 created for recovery
- **Phase 2 Template Status**: nextjs operational (3 agents), nuxt stalled (0 agents), sveltekit operational (4 agents)
- **Fleet Recovery**: design-system running but over-utilized (133%), saas-template runner disconnected (0 queued work)

---

**Previous Update (2026-03-25T13:55Z)**: Fleet-scan identified runner healthy but 2 daemons still crashed:
- **5/7 key daemons RUNNING**: brain (PID 94133), launchapp-nextjs (PID 68699), launchapp-nuxt (PID 97335), launchapp-sveltekit (PID 98532)
- **2/7 CRASHED (daemon_pid null, runners still connected)**:
  - design-system: 5 agents, 1 ready task, 11 blocked (needs restart)
  - saas-template-launch-app-test: 8 agents, 98 ready tasks (needs restart)
- **ao-cli**: No own daemon — shares brain daemon (verify intentional)
- **Runner PID 95057**: HEALTHY (3/7 runs completed, 2 failed, avg 412s)
- **3 orphaned runners** detected (PIDs 79496, 24124, 60555) — cleanup task created (TASK-529)
- **Recovery in progress**: TASK-507 (restart crashed daemons) READY but not yet dispatched
