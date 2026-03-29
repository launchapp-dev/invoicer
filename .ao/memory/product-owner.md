# Product Owner — Run Memory

This file is read and updated by the Product Owner agent every run.
It tracks decisions made, requirements created, tasks created, and
the current product state assessment so work is not repeated.

## Last Run
| Field | Value |
|-------|-------|
| Date | 2026-03-29 |
| Health Check | PASS — pnpm build succeeded, 19 routes compiled (Next.js 16.2.1), no TypeScript errors |
| Tasks Created | TASK-325 (US state sales tax presets) |
| Requirements Created | None |
| Pipeline Status | 6 active tasks, all medium priority |

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

## Features Assessed
| Feature | Status | Last Checked | Notes |
|---------|--------|-------------|-------|
| Authentication | Implemented | 2026-03-29 | Email/password + OAuth UI; OAuth needs env vars at deploy |
| Invoice Form | Implemented | 2026-03-29 | Multi-tax lines (taxLines array), line items, attachments, duplicate detection, AI autofill |
| Live Preview | Implemented | 2026-03-29 | Side-by-side desktop, tab toggle mobile |
| PDF Generation | Implemented | 2026-03-29 | 3 templates (classic/modern/minimal), brand color+font, share link /i/[token] |
| Invoice Dashboard | Implemented | 2026-03-29 | Stats, search, filter, sort, pagination, bulk delete/status/CSV export, AI NL search, cash flow widget |
| Client Management | Partially implemented | 2026-03-29 | CRUD+CSV import done; search/sort/pagination missing (TASK-317) |
| Multi-Currency | Partial | 2026-03-29 | 10 currencies in 4 separate duplicate constants; TASK-322 created to fix |
| Invoice Lifecycle | Mostly implemented | 2026-03-29 | Status workflow, payment recording, partial payments done; audit trail missing (TASK-318) |
| Recurring Invoices | Implemented | 2026-03-29 | Full CRUD at /dashboard/recurring |
| Settings | Implemented | 2026-03-29 | Business profile, logo, templates, payment instructions, brand color+font, invoice defaults |
| Landing Page | Mostly implemented | 2026-03-29 | Hero, features, how-it-works, pricing, CTA, footer present; social proof (TASK-316) and dark mode toggle (TASK-319) missing |
| AI: Smart Creation | Implemented | 2026-03-29 | NL to invoice via ai-invoice-command, prefill via URL param |
| AI: Autofill | Implemented | 2026-03-29 | Line item suggestions, tax suggestions, smart defaults, duplicate detection |
| AI: Cash Flow | Implemented | 2026-03-29 | CashFlowWidget on dashboard with AI insight |
| AI: Reminders | Implemented | 2026-03-29 | AI-drafted reminder messages in invoice-actions sheet |
| AI: Expenses | Implemented | 2026-03-29 | Full expense manager at /expenses with AI categorization |
| AI: NL Search | Partial | 2026-03-29 | Works for invoices in dashboard; not implemented for expenses (TASK-323 created) or clients (blocked by TASK-317) |
| Tax Presets | Partial | 2026-03-29 | COUNTRY_TAX_MAP in invoice-form.tsx: UK VAT 20%, Germany VAT 19%, France VAT 20%, AU GST 10%, CA GST 5%, NZ GST 15%, India GST 18%, Singapore GST 9%. US states NOT in map — TASK-325 created to fix |

## Current Assessment

**Overall health: Strong.** Build passes (19 routes, Next.js 16.2.1), no TypeScript errors, only expected OAuth warnings. Product is in polishing/stabilizing phase.

**Active pipeline (6 tasks, all medium):**
- TASK-316 [backlog] — Social proof stats on landing page (E2E bug — code never merged)
- TASK-317 [backlog] — Client search/sort/pagination (E2E bug — code never merged)
- TASK-318 [ready] — Invoice audit trail (E2E bug — code never merged)
- TASK-319 [ready] — Dark mode toggle on landing page (E2E bug — code never merged)
- TASK-324 [backlog] — @repo/push module error (FALSE ALARM — stale dev cache only; prod build clean; no such imports in source)
- TASK-325 [ready] — US state sales tax presets (new feature, VISION-required)

**Progress since last run:**
- TASK-322 cancelled (was 3rd attempt at currency expansion; recurring cancellation pattern)
- TASK-323 marked done (NL search for expenses) — but code NOT in main (same unmerged pattern)
- TASK-321 marked done (currency expansion to 25+) — but code NOT in main (still 10 currencies in all 4 constant definitions)

**Critical pattern — unmerged work:** TASK-316/317/318/319/321/323 all represent "done" tasks with no code in main. Currency expansion has been attempted 3 times (TASK-321, cancelled TASK-322 x2). Re-creating these tasks is futile until the merge workflow is fixed. This is the most important systemic issue.

**Next run focus:**
- Check if TASK-318/319/325 have code in main
- After TASK-317 (client basic search) lands, create NL search for clients task
- TASK-324 can likely be cancelled (false alarm - stale dev cache, not a code issue)
