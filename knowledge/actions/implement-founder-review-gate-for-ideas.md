---
title: "Implement founder review gate for idea-to-task pipeline"
priority: critical
status: proposed
effort: small
category: operations
source_question: knowledge/questions/what-decision-framework-selects-from-93-ideas-and-who-decides.md
owner: unassigned
target_repos:
  - brain
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The brain's AI agents generate product ideas that accumulate without any decision-making filter. 93 ideas exist across 4 rounds, all scored 7-10/10, with no idea ever rejected or deprioritized. The founder answered that ideas must go through explicit founder approval (Sami or Rafael) before moving to execution. Currently, no workflow enforces this gate — ideas could theoretically flow directly into task queues.

Derived from: "What decision framework selects from 93 ideas — and who decides?"

## Scope

1. Ensure no AO workflow or agent auto-creates implementation tasks from generated ideas
2. Add a `status` field to idea files with values: `generated`, `under-review`, `approved`, `rejected`, `archived`
3. Create a lightweight review queue (e.g., `knowledge/ideas/review-queue.md`) that lists ideas awaiting founder decision
4. Document the decision flow in the brain's operational docs: idea generated → review queue → founder approves/rejects → approved ideas become tasks
5. Configure the idea-generation agents to set `status: generated` on new ideas and add them to the review queue automatically

## Dependencies

- None — this is a process/workflow change that can be implemented immediately

## Success Criteria

- No idea can become a task without an explicit `status: approved` set by a founder
- All 93 existing ideas have a `status` field added (defaulting to `generated`)
- New ideas automatically appear in the review queue
- The review queue is easy for founders to scan and make approve/reject decisions on

## Notes

- This gate is intentionally lightweight — the goal is a 30-second approve/reject decision per idea, not a heavy review process
- The (Impact × Confidence) / Effort scoring model suggested in the question's investigation section could be added later as a refinement
- The producer-consumer mismatch (AI generates, humans evaluate) means the review queue will always grow faster than it's processed — consider a weekly cadence for review sessions
