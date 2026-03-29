# Work Planner — Run Memory

This file is read and updated by the Work Planner agent every run.
It tracks what was enqueued and skipped so decisions aren't repeated.

## Last Run
| Field | Value |
|-------|-------|
| Date | — |
| Open PRs | — |
| Queue Depth | — |
| Rework Enqueued | — |
| Rebase Enqueued | — |
| New Work Enqueued | — |
| Skipped (deps) | — |
| Skipped (queued) | — |
| Pipeline Idle | — |

## Recently Enqueued
<!-- Planner: track what you enqueued recently to avoid re-enqueuing -->
| Date | Task ID | Workflow | Reason |
|------|---------|---------|--------|

## Skipped Tasks (unmet deps)
<!-- Planner: track tasks you skipped due to dependencies so you re-check efficiently -->
| Task ID | Blocked By | Last Checked |
|---------|-----------|-------------|
