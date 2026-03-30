# Product Owner — Run Memory

This file is read and updated by the Product Owner agent every run.
It tracks decisions made, requirements created, tasks created, and
the current product state assessment so work is not repeated.

## Last Run
| Field | Value |
|-------|-------|
| Date | 2026-03-30 (cycle 4) |
| Health Check | PASS — pnpm install and pnpm build both clean; only warnings for missing OAuth env vars |
| Tasks Created | None (pipeline at capacity — 5 active tasks; all gaps covered by existing tasks) |
| Requirements Created | None |
| Pipeline Status | 5 active tasks: 1 critical (TASK-330 — PR #200 still open, not merged), 4 medium (TASK-316/317/318/319) |

## Decisions Log
| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-29 | Created TASK-320: tax presets by jurisdiction | VISION explicitly lists this; current form only had AI suggestions, no static presets |
| 2026-03-29 | Created TASK-321: expand currency list to 25+ | VISION says "all major currencies"; currently only 10; CURRENCIES constant is duplicated in 4 files |
| 2026-03-29 | Did not create task for OAuth credentials | Not a code gap — just missing env vars at deploy time |
| 2026-03-29 | Did not create NL search for expenses/clients | Clients missing basic search first (TASK-317); expenses has client-side search. Lower priority than tax/currency gaps |
| 2026-03-29 | Created TASK-322: currency list still 10 (E2E bug) | TASK-321 marked done but no code in main; same pattern as TASK-316/317/318/319 |
| 2026-03-29 | Created TASK-323: NL search for expenses | VISION section 16 requires NL search across invoices, clients, and expenses; invoices done; expenses has no NL search; no existing task covers this |
| 2026-03-29 | Did not create NL search for clients | TASK-317 (basic search/sort/pagination) must land first; NL search on top of no search makes no sense |
| 2026-03-29 | Created TASK-325: US state sales tax presets | VISION explicitly requires US states in tax presets; TASK-320 done but has no US states in COUNTRY_TAX_MAP |
| 2026-03-29 | Did not re-create currency expansion task | TASK-322 (3rd attempt) was cancelled; re-creating a 4th time likely futile until merge workflow is fixed |
| 2026-03-29 | Noted TASK-324 is false alarm | @repo/push errors are stale dev Turbopack cache only; prod build is clean, no such imports in source |
| 2026-03-29 | Created TASK-327: E2E bug NL search for expenses | TASK-323 marked done, branch ao/task-323 has 0 commits — no code written; expenses-manager.tsx has only client-side text filter |
| 2026-03-29 | Created TASK-328: E2E bug US state tax presets | TASK-325 marked done by reconciler but COUNTRY_TAX_MAP in invoice-form.tsx still has no US states |
| 2026-03-29 | Did not create new tasks (cycle 2) | Pipeline at capacity (5 tasks). TASK-330 critical (React 19 text input) already in pipeline. TASK-327 and TASK-328 were cancelled by reconciler. |
| 2026-03-29 | TASK-330 not enqueued | Critical task sitting in `ready` but not in dispatch queue — planner should enqueue with workflow_ref=triage |
| 2026-03-29 (cycle 3) | Did not create new tasks | Pipeline at capacity (5 tasks). TASK-330 PR #200 OPEN with fix — needs merge not new tasks. |
| 2026-03-29 (cycle 3) | Did not add *.png to .gitignore | Minor risk (159 untracked screenshots), not a VISION gap or build failure. Deferring. |
| 2026-03-30 (cycle 4) | Did not create new tasks | Pipeline still at 5 active tasks all stuck at ready. TASK-330 critical PR not merged. All VISION gaps have existing tasks. Expenses NL search gap confirmed (TASK-327 cancelled) but not re-creating — too many recycled tasks already. |
| 2026-03-30 (cycle 4) | Confirmed invoice sharing IS implemented | generateShareLink() in storage.ts + "Copy Share Link" in invoice-actions.tsx dropdown. No new task needed. |

## Requirements Created
| Date | ID | Title | Status |
|------|-----|-------|--------|
| — | — | — | — |

## Tasks Created
| Date | ID | Title | Priority |
|------|-----|-------|----------|
| 2026-03-29 | TASK-320 | Add tax presets by jurisdiction to invoice form | medium |
| 2026-03-29 | TASK-321 | Expand currency list to 25+ major global currencies | medium |
| 2026-03-29 | TASK-322 | E2E bug: Currency list still 10 currencies — TASK-321 marked done but no code in main | medium |
| 2026-03-29 | TASK-323 | Add AI natural language search to expenses page | medium |
| 2026-03-29 | TASK-325 | Add US state sales tax presets to invoice form | medium |
| 2026-03-29 | TASK-327 | E2E bug: NL search for expenses missing — TASK-323 done, branch has 0 commits | medium |
| 2026-03-29 | TASK-328 | E2E bug: US state sales tax presets missing — TASK-325 done but COUNTRY_TAX_MAP unchanged | medium |

## Features Assessed
| Feature | Status | Last Checked | Notes |
|---------|--------|-------------|-------|
| Authentication | Implemented | 2026-03-29 | Email/password + OAuth UI; OAuth needs env vars at deploy |
| Invoice Form | Broken (React 19) | 2026-03-29 (cycle 3) | Text fields non-functional. TASK-330 PR #200 fixes with Controller pattern — not merged yet |
| Live Preview | Implemented | 2026-03-29 | Side-by-side desktop, tab toggle mobile |
| PDF Generation | Implemented | 2026-03-29 | 3 templates (classic/modern/minimal), brand color+font, share link /i/[token] |
| Invoice Dashboard | Implemented | 2026-03-29 | Stats, search, filter, sort, pagination, bulk delete/status/CSV export, AI NL search, cash flow widget |
| Client Management | Partially implemented | 2026-03-29 | CRUD+CSV import done; search/sort/pagination missing (TASK-317 ready, no code on branch) |
| Client Detail Page | Implemented | 2026-03-29 | /clients/[id] has invoice history, P&L, expense tracking — fully implemented |
| Multi-Currency | Partial | 2026-03-29 | 10 currencies in 4 separate duplicate constants; 3+ failed attempts to expand; not re-creating |
| Invoice Lifecycle | Mostly implemented | 2026-03-29 | Status workflow, payment recording, partial payments done; audit trail missing (TASK-318 ready) |
| Recurring Invoices | Implemented | 2026-03-29 | Full CRUD at /dashboard/recurring |
| Settings | Implemented | 2026-03-29 | Business profile, logo, templates, payment instructions, brand color+font, invoice defaults |
| Settings/Templates | Implemented | 2026-03-29 | /settings/templates directory exists |
| Landing Page | Mostly implemented | 2026-03-29 | Hero, features, how-it-works, pricing, CTA, footer present; social proof (TASK-316) and dark mode toggle (TASK-319) missing |
| AI: Smart Creation | Implemented | 2026-03-29 | NL to invoice via ai-invoice-command, prefill via URL param |
| AI: Autofill | Implemented | 2026-03-29 | Line item suggestions, tax suggestions, smart defaults, duplicate detection |
| AI: Cash Flow | Implemented | 2026-03-29 | CashFlowWidget on dashboard with AI insight |
| AI: Reminders | Implemented | 2026-03-29 | AI-drafted reminder messages in invoice-actions sheet |
| AI: Expenses | Implemented | 2026-03-29 | Full expense manager at /expenses with AI categorization |
| AI: NL Search | Partial | 2026-03-29 | Works for invoices in dashboard; not implemented for expenses (TASK-327 cancelled) or clients (blocked by TASK-317) |
| Tax Presets | Partial | 2026-03-29 | COUNTRY_TAX_MAP: UK/DE/FR/AU/CA/NZ/IN/SG only. No US states. TASK-328 cancelled. |

## Current Assessment

**Overall health: Blocked on critical merge (cycle 4 — same as cycle 3).** Build passes cleanly. 5 active tasks all stuck at "ready".

**Critical path:**
- TASK-330 [ready][critical] — PR #200 still OPEN. React 19 Controller fix written. Invoice form text fields completely broken without this. **Must be merged urgently.**

**Active pipeline (5 tasks — no change from cycle 3):**
- TASK-330 [ready][critical] — PR #200 OPEN. React 19 text input bug blocking core invoice creation.
- TASK-316 [ready][medium] — Social proof stats on landing; confirmed missing in page.tsx
- TASK-317 [ready][medium] — Client search/sort/pagination; confirmed missing in clients/page.tsx
- TASK-318 [ready][medium] — Invoice audit trail; confirmed missing (no audit/activity files)
- TASK-319 [ready][medium] — Dark mode toggle on landing; confirmed missing in page.tsx

**Confirmed implemented (cycle 4 verification):**
- Invoice sharing: generateShareLink() + "Copy Share Link" in invoice-actions.tsx dropdown ✓
- Expenses page: vendor, amount, category filter, client filter, date range, sort ✓ (basic search only)
- Expenses NL/AI search: confirmed NOT implemented (expenses-manager.tsx has only client-side text filter)
- Dashboard: full search/filter/sort/pagination/bulk actions/cash flow widget ✓
- Landing page: hero, features, how-it-works, pricing, CTA — social proof and dark mode toggle missing

**VISION gaps not in pipeline (cycle 4):**
- Multi-currency (25+ currencies): 3+ prior attempts failed; not re-creating
- Expenses NL search: TASK-323 "done" (no commits), TASK-327 cancelled; gap is real but pattern suggests execution blocker
- US state tax presets: TASK-328 cancelled; gap confirmed; not re-creating
- Client NL search: blocked by TASK-317 landing first

**Next run focus:**
- TASK-330 PR #200 must merge — check if it's still open or if a fresh implementation is needed
- After pipeline drains below 3 tasks: revisit expenses NL search and US state tax presets
- After TASK-317 lands: create client NL search task
