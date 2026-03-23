# Fleet Inventory

All AO-managed repos and their daemon status. Maintained by the fleet-manager agent.

## Format

| Repo | AO Setup | Daemon Status | Pool Size | Model | Last Health Check |
|------|----------|---------------|-----------|-------|-------------------|
| brain | yes | ✅ RUNNING (PID 94133) | 5 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| ao | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| ao-cli | yes | ⚠️ NO OWN DAEMON (shares brain) | — | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| ao-skills | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| design-system | yes | ❌ CRASHED | 5 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| saas-template-launch-app-test | yes | ❌ CRASHED | 8 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| launchapp-nextjs | yes | ✅ RUNNING (PID 68699) | 5 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| launchapp-nuxt | yes | ✅ RUNNING (PID 97335) | 4 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| launchapp-sveltekit | yes | ✅ RUNNING (PID 98532) | 5 | claude-sonnet-4-6 | 2026-03-25T13:55Z |
| launchapp.dev | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| launchpad-baas | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| agent-orchestrator | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |

## Status

**CRITICAL UPDATE (2026-03-25T13:55Z)**: Fleet-scan identified runner healthy but 2 daemons still crashed:
- **5/7 key daemons RUNNING**: brain (PID 94133), launchapp-nextjs (PID 68699), launchapp-nuxt (PID 97335), launchapp-sveltekit (PID 98532)
- **2/7 CRASHED (daemon_pid null, runners still connected)**:
  - design-system: 5 agents, 1 ready task, 11 blocked (needs restart)
  - saas-template-launch-app-test: 8 agents, 98 ready tasks (needs restart)
- **ao-cli**: No own daemon — shares brain daemon (verify intentional)
- **Runner PID 95057**: HEALTHY (3/7 runs completed, 2 failed, avg 412s)
- **3 orphaned runners** detected (PIDs 79496, 24124, 60555) — cleanup task created (TASK-529)
- **Recovery in progress**: TASK-507 (restart crashed daemons) READY but not yet dispatched
