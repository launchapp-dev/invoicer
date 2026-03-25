# Action: Address Systemic Workflow Runner Failure

**Date**: 2026-03-24T04:15Z  
**Created By**: Product Owner (brain-product-review phase)  
**Priority**: CRITICAL  
**Status**: Active

---

## Summary

Discovered **systemic workflow runner failure** blocking all brain task execution. 25 tasks blocked after 4 consecutive runner failures. Both dispatcher fix tasks (TASK-512, TASK-513) were cancelled due to runner failures. Root cause: workflow runner exits with code 1 on all task executions.

## Critical Findings

### Fleet Status
| Repo | Status | Pool | Util | Agents | Queue | Issue |
|------|--------|------|------|--------|-------|-------|
| brain | RUNNING | 5 | 80% | 4 | 23 ready | **0 in_progress — runner failing** |
| ao-cli | MISCONFIGURED | 5 | 0% | 0 | shared | using brain's daemon |
| launchapp-nextjs | RUNNING | 5 | 100% | 5 | 0 | healthy |
| launchapp-nuxt | RUNNING | 5 | 80% | 4 | 40 | healthy |
| launchapp-sveltekit | RUNNING | 5 | 100% | 5 | 39 | healthy |
| design-system | CRASHED | — | — | 0 | 1 stuck | daemon_pid: null |
| saas-template | CRASHED | — | — | 0 | 106 stuck | daemon_pid: null |

### Task Statistics
- **Total**: 512
- **Ready**: 23 (cannot dispatch — runner will fail)
- **In Progress**: 0 🔴
- **Blocked**: 25 (failed 4x, escalated to human review)
- **Cancelled**: 177 (including TASK-512, TASK-513)

### Root Cause Evidence
Daemon logs show repeated pattern:
```
ao-daemon: task TASK-XXX has been reset 4 times after runner failures 
— escalating to human review (blocked_reason=Some("workflow runner exited 
unsuccessfully with status Some(1)"))
```

## Action Items

### Immediate (Next 2 Hours)
1. **TASK-514**: Execute manual dispatch test
   - Try `ao.queue.enqueue --task_id TASK-383` (simple auth-status tool)
   - If succeeds: runner works outside workflow context
   - If fails: runner environment broken (GH_TOKEN, auth, etc.)

### Short Term (Today)
2. **Investigate runner environment**: Check GH_TOKEN, GitHub auth, environment variables
3. **Fix runner or bypass**: If environment issue, fix and restart runner. If systemic, consider manual task reset.
4. **Reset blocked tasks**: Once runner fixed, reset failure counts on 25 blocked tasks

### Medium Term (This Week)
5. **Dispatch TASK-507**: Restart crashed daemons (design-system, saas-template)
6. **Fix template lint issues**: Dispatch biome.json exclusion tasks to healthy repos
7. **Fix ao-cli misconfiguration**: Start separate daemon

## Success Criteria
- [ ] Manual dispatch test completes (TASK-514)
- [ ] At least 1 task transitions to `in_progress`
- [ ] 25 blocked tasks reset and re-queued
- [ ] TASK-507 dispatched and executing
- [ ] design-system and saas-template daemons recovered

## Related Tasks
- TASK-514: Emergency manual dispatch test (NEW)
- TASK-507: Restart 2 crashed daemons (READY)
- TASK-512: Dispatcher fix (CANCELLED — runner failure)
- TASK-513: Dispatcher investigation (CANCELLED — runner failure)

## Impact
- **Phase 2 Timeline**: 36 days remaining to 2026-04-30
- **Blocked**: All brain orchestration, daemon recovery, template quality fixes
- **At Risk**: Revenue targets, AO Pro launch, template sales

## Decision
This action file documents the systemic blocker. The conductor agent should prioritize TASK-514 for immediate execution to determine if manual enqueue works. If manual enqueue succeeds, we can bypass the broken workflow runner temporarily. If it fails, we need emergency runner environment repair.
