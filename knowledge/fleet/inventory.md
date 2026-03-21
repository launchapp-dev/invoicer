# Fleet Inventory

All AO-managed repos and their daemon status. Maintained by the fleet-manager agent.

## Format

| Repo | AO Setup | Daemon Status | Pool Size | Model | Last Health Check |
|------|----------|---------------|-----------|-------|-------------------|
| brain | yes | running | 5 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| ao | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| ao-cli | yes | running | 3 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| ao-skills | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| design-system | yes | running | 3 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| saas-template-launch-app-test | yes | running | 3 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| launchapp-nextjs | yes | running | 2 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| launchapp-nuxt | yes | running | 4 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| launchapp-sveltekit | yes | running | 2 | claude-sonnet-4-6 | 2026-03-20T22:30Z |
| launchapp.dev | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| launchpad-baas | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |
| agent-orchestrator | yes | running | 3 | minimax/MiniMax-M2.7 | 2026-03-20T22:30Z |

## Status

**CRITICAL UPDATE (2026-03-21T02:05Z)**: Fleet-scan phase (2026-03-20T23:56Z) identified regressions after TASK-149:
- **10/12 daemons RUNNING + HEALTHY**: brain, ao, ao-skills, design-system, launchapp-nextjs, launchapp-nuxt, launchapp-sveltekit, launchapp.dev, launchpad-baas, agent-orchestrator
- **2/12 DOWN (NEW)**:
  - ao-cli: STOPPED (workflow execution failures during scheduled runs)
  - saas-template-launch-app-test: CRASHED (workflow runner failures, tasks escalated)
- **Root causes identified**: Workflow config references undefined sub-workflows (TASK-216); scheduled workflows failing on execution
- **Impact**: HIGH — ao-cli and saas-template-test cannot dispatch own work; Phase 2 template repos (nextjs, nuxt, sveltekit) all healthy and operational
- **Recovery in progress**: TASK-216 (workflow config fix) and TASK-206 (daemon recovery) queued for immediate dispatch
