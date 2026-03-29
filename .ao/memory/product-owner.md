# Product Owner — Run Memory

This file is read and updated by the Product Owner agent every run.
It tracks decisions made, requirements created, tasks created, and
the current product state assessment so work is not repeated.

## Last Run
| Field | Value |
|-------|-------|
| Date | 2026-03-29 |
| Health Check | PASS — pnpm build succeeded, all 19 routes compiled |
| Tasks Created | TASK-320 (tax presets by jurisdiction), TASK-321 (expand currency list) |
| Requirements Created | None |
| Pipeline Status | 6 active tasks, all medium priority |

## Decisions Log
| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-29 | Created TASK-320: tax presets by jurisdiction | VISION explicitly lists this; current form only has AI suggestions, no static presets |
| 2026-03-29 | Created TASK-321: expand currency list to 25+ | VISION says "all major currencies"; currently only 10; CURRENCIES constant is duplicated in 4 files |
| 2026-03-29 | Did not create task for OAuth credentials | Not a code gap — just missing env vars at deploy time |
| 2026-03-29 | Did not create NL search for expenses/clients | Clients missing basic search first (TASK-317); expenses has client-side search. Lower priority than tax/currency gaps |

## Requirements Created
| Date | ID | Title | Status |
|------|-----|-------|--------|
| — | — | — | — |

## Tasks Created
| Date | ID | Title | Priority |
|------|-----|-------|----------|
| 2026-03-29 | TASK-320 | Add tax presets by jurisdiction to invoice form | medium |
| 2026-03-29 | TASK-321 | Expand currency list to 25+ major global currencies | medium |

## Features Assessed
| Feature | Status | Last Checked | Notes |
|---------|--------|-------------|-------|
| Authentication | Implemented | 2026-03-29 | Email/password + OAuth UI; OAuth needs env vars at deploy |
| Invoice Form | Implemented | 2026-03-29 | Multi-tax lines (taxLines array), line items, attachments, duplicate detection, AI autofill |
| Live Preview | Implemented | 2026-03-29 | Side-by-side desktop, tab toggle mobile |
| PDF Generation | Implemented | 2026-03-29 | 3 templates (classic/modern/minimal), brand color+font, share link /i/[token] |
| Invoice Dashboard | Implemented | 2026-03-29 | Stats, search, filter, sort, pagination, bulk delete/status/CSV export, AI NL search, cash flow widget |
| Client Management | Partially implemented | 2026-03-29 | CRUD+CSV import done; search/sort/pagination missing (TASK-317) |
| Multi-Currency | Partial | 2026-03-29 | 10 currencies available; VISION wants 25+; TASK-321 created |
| Invoice Lifecycle | Mostly implemented | 2026-03-29 | Status workflow, payment recording, partial payments done; audit trail missing (TASK-318) |
| Recurring Invoices | Implemented | 2026-03-29 | Full CRUD at /dashboard/recurring |
| Settings | Implemented | 2026-03-29 | Business profile, logo, templates, payment instructions, brand color+font, invoice defaults |
| Landing Page | Mostly implemented | 2026-03-29 | Hero, features, how-it-works, pricing, CTA, footer present; social proof (TASK-316) and dark mode toggle (TASK-319) missing |
| AI: Smart Creation | Implemented | 2026-03-29 | NL to invoice via ai-invoice-command, prefill via URL param |
| AI: Autofill | Implemented | 2026-03-29 | Line item suggestions, tax suggestions, smart defaults, duplicate detection |
| AI: Cash Flow | Implemented | 2026-03-29 | CashFlowWidget on dashboard with AI insight |
| AI: Reminders | Implemented | 2026-03-29 | AI-drafted reminder messages in invoice-actions sheet |
| AI: Expenses | Implemented | 2026-03-29 | Full expense manager at /expenses with AI categorization |
| AI: NL Search | Partial | 2026-03-29 | Works for invoices in dashboard; not implemented for clients or expenses |
| Tax Presets | Missing | 2026-03-29 | No static jurisdiction presets; TASK-320 created |

## Current Assessment

**Overall health: Strong.** 295 tasks done, build passes, all major VISION.md features implemented. Product is in a polishing/stabilizing phase.

**Active pipeline (6 tasks, all medium):**
- TASK-316 [backlog] — Social proof stats on landing page (E2E bug — code never merged)
- TASK-317 [backlog] — Client search/sort/pagination (E2E bug — code never merged)
- TASK-318 [ready] — Invoice audit trail (E2E bug — code never merged)
- TASK-319 [ready] — Dark mode toggle on landing page (E2E bug — code never merged)
- TASK-320 [ready] — Tax presets by jurisdiction (new feature gap)
- TASK-321 [ready] — Expand currency list to 25+ (new feature gap)

**Pattern to watch:** Multiple tasks being marked "done" but branches not being merged. TASK-316/317/318/319 are all re-implementations of things that were supposedly done but never merged. The planner/merge workflow may need attention.

**Next run focus:** Check if TASK-319/318 have been completed. If the E2E bug backlog persists, consider recommending a fix to the merge workflow rather than creating more fix tasks.
