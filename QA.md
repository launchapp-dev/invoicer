# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | 2026-03-28 |
| Result | PARTIAL PASS (1 new critical bug; 2 prior bugs fixed) |
| Steps Passed | 4/6 (Step 5 partial — build error crashes app; Step 6 fail — 22 console errors) |
| Duration | ~20 min |
| Console Errors | 22 (missing @radix-ui/react-popover and cmdk — crashes entire app) |
| Network Errors | Multiple 500s (all pages after build error triggered) |

## Test Results History

<!-- QA agent: append each run result here. Format: | Date | Passed | Failed | Bugs Created | Notes | -->
| Date | Passed | Failed | Bugs Created | Notes |
|------|--------|--------|-------------|-------|
| 2026-03-28 | 5 | 2 | 2 | /clients 404; AI command bar missing from dashboard |
| 2026-03-28 | 4 | 3 | 2 | /clients 404 persists (TASK-235 regression); auth login failure + duplicate signup bug (TASK-240); AI command bar now fixed |
| 2026-03-28 | 4 | 2 | 1 | TASK-239 (/clients 404) FIXED; TASK-240 (auth) FIXED; new CRITICAL: missing @radix-ui/react-popover + cmdk packages crash entire app (TASK-249) |

## Known Issues

<!-- QA agent: track active bugs found during E2E testing. Remove when fixed. -->
- **[2026-03-28] Missing npm packages crash entire app — TASK-249** — `@radix-ui/react-popover` and `cmdk` are imported by `combobox.tsx` (added in TASK-241 for client autofill) but not installed. This causes a build error that makes ALL pages return HTTP 500. The Next.js dev overlay blocks the login page entirely. Fix: `pnpm add @radix-ui/react-popover cmdk`. CRITICAL — complete app crash.

## Regression Tracker

<!-- QA agent: if a previously passing test starts failing, log it here with the date and suspected cause. -->
| Date | Test | Was | Now | Suspected Cause |
|------|------|-----|-----|-----------------|
| 2026-03-28 | Login with existing credentials | PASS | ~~FAIL~~ PASS | TASK-240 fixed — login now works correctly |
| 2026-03-28 | /invoices/new and /invoices/[id] — all pages | PASS | FAIL | TASK-241 added combobox.tsx importing missing packages (TASK-249) |

## Test Coverage

### Auth Flow
- [x] Landing page loads without errors
- [x] Signup with email/password works
- [x] Login with existing credentials works — **FIXED (TASK-240)**
- [x] Protected routes redirect to login when unauthenticated
- [x] Logout redirects to landing/login
- [ ] Duplicate signup shows appropriate error — **NOT TESTED this run**
- [x] Google OAuth button present on login/signup pages
- [x] GitHub OAuth button present on login/signup pages

### Invoice Creation
- [x] New invoice form loads
- [x] Sender info fields work
- [x] Recipient info fields work
- [x] Add line item works
- [ ] Remove line item works
- [x] Auto-calculations update in real-time
- [x] Save invoice succeeds
- [x] Saved invoice appears in dashboard

### Invoice Dashboard
- [x] Dashboard loads with invoice list
- [x] Search works — filters by recipient name, shows Clear button
- [ ] Status filter works
- [x] Date range filter works (Issue Date From/To fields present)
- [x] Edit invoice navigates correctly — actions menu → Edit opens /invoices/[id]
- [ ] Delete invoice with confirmation works
- [ ] Duplicate invoice works
- [x] Quick stats show total outstanding, paid this month, overdue amount
- [x] Bulk select checkboxes appear
- [ ] Bulk delete works
- [ ] Bulk mark-as-sent works

### PDF Generation
- [x] Generate PDF button exists
- [x] PDF downloads without errors
- [ ] PDF contains correct invoice data

### Live Preview
- [x] Preview updates as form is edited
- [x] Preview shows sender/recipient info
- [x] Preview shows line items and totals

### Settings
- [x] Settings page loads at /settings
- [x] Business profile fields (name, address, logo, tax ID) render
- [x] Invoice defaults section renders (payment terms, tax rate, notes)
- [ ] Settings pre-fill new invoice form with saved defaults

### Client Management
- [x] /clients page loads and lists clients — **FIXED (TASK-239)**
- [x] Create new client works — form saves, redirects to detail page
- [x] /clients/[id] detail page loads with invoice history — shows total billed, outstanding, overdue stats and invoice table
- [ ] Client autofill works when creating new invoice — **BLOCKED: missing packages (TASK-249) crash invoice form**

### Payment Recording
- [ ] Mark invoice as paid with date, method, reference number
- [ ] Paid status is reflected in dashboard

### Recurring Invoices
- [x] Recurring invoice schedule UI is accessible (/dashboard/recurring loads)
- [ ] Can set up a recurring invoice (weekly/monthly/etc.)

### AI Smart Invoice Creation
- [x] Command bar or natural language input exists on dashboard — "Create with AI" button opens dialog
- [x] AI dialog opens without errors and accepts natural language input

### Navigation
- [ ] All nav links work (no 404s) — **PARTIAL: /dashboard/recurring and /settings crash (TASK-249 build error)**
- [ ] Mobile navigation works
- [ ] Back/forward browser buttons work
- [x] Settings nav link present in authenticated layout
- [x] Recurring nav link present in authenticated layout
- [x] Clients nav link present in authenticated layout

### Console & Network
- [ ] No console.error messages — **FAIL: 22 errors — missing @radix-ui/react-popover and cmdk (TASK-249)**
- [ ] No uncaught exceptions — **FAIL: build error throws uncaught exception**
- [ ] No failed network requests (4xx/5xx) — **FAIL: all pages return 500 after build error triggered**
- [x] No CORS errors

### Multi-Currency
- [x] Currency selector present on invoice form (USD — US Dollar visible)
- [ ] Other currencies render correctly in preview and PDF

### Multi-Tax Rate
- [ ] Multiple tax rates can be added per invoice
- [ ] Each rate is labeled and calculated independently

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3000") -->
- App URL: http://localhost:3000
- Database: SQLite via Drizzle ORM — run `pnpm db:push` before testing
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
