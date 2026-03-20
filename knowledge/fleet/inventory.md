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

TASK-149 fixes verified complete. Fleet recovery completed 2026-03-20T22:30Z:
- 5 previously unhealthy repos (ao, ao-skills, launchapp.dev, launchpad-baas, agent-orchestrator) daemons started and verified healthy
- 3 stopped daemons (ao-cli, design-system, saas-template-launch-app-test) restarted and verified healthy
- All 12/12 daemons now running and healthy
- Workflow configs valid in all repos (verified via ao workflow config validate)
