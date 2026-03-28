# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | 2026-03-28 |
| Result | PARTIAL PASS (3 bugs found) |
| Steps Passed | 4/6 (Step 5 partial — /clients 404; Step 2 partial — auth login bug) |
| Duration | ~15 min |
| Console Errors | 2 (GET /clients 404; POST /sign-in/email 401) |
| Network Errors | 2 (GET /clients 404; POST /sign-in/email 401) |

## Test Results History

<!-- QA agent: append each run result here. Format: | Date | Passed | Failed | Bugs Created | Notes | -->
| Date | Passed | Failed | Bugs Created | Notes |
|------|--------|--------|-------------|-------|
| 2026-03-28 | 5 | 2 | 2 | /clients 404; AI command bar missing from dashboard |
| 2026-03-28 | 4 | 3 | 2 | /clients 404 persists (TASK-235 regression); auth login failure + duplicate signup bug (TASK-240); AI command bar now fixed |

## Known Issues

<!-- QA agent: track active bugs found during E2E testing. Remove when fixed. -->
- **[2026-03-28] /clients returns 404** — TASK-239. Client management page not found. TASK-235 was marked done but route still returns 404 at runtime. Regression. Blocks all client management tests.
- **[2026-03-28] Duplicate signup with existing email succeeds silently; login fails after session drop** — TASK-240. Signing up with an already-registered email does not show an error — it creates a new session and wipes previous invoice data. Additionally, after a session drop, login with the original credentials returns 401 "Invalid email or password". Likely duplicate user records in DB. High severity — users can lose their data.

## Regression Tracker

<!-- QA agent: if a previously passing test starts failing, log it here with the date and suspected cause. -->
| Date | Test | Was | Now | Suspected Cause |
|------|------|-----|-----|-----------------|
| 2026-03-28 | Login with existing credentials | PASS | FAIL | Duplicate signup creates new DB record, breaking password auth for original account (TASK-240) |

## Test Coverage

### Auth Flow
- [x] Landing page loads without errors
- [x] Signup with email/password works
- [ ] Login with existing credentials works — **FAIL: 401 after session drop (TASK-240)**
- [x] Protected routes redirect to login when unauthenticated
- [x] Logout redirects to landing/login
- [ ] Duplicate signup shows appropriate error — **FAIL: silently succeeds (TASK-240)**
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
- [ ] Search works
- [ ] Status filter works
- [x] Date range filter works (Issue Date From/To fields present)
- [ ] Edit invoice navigates correctly
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
- [ ] /clients page loads and lists clients — **FAIL: 404**
- [ ] Create new client works
- [ ] /clients/[id] detail page loads with invoice history
- [ ] Client autofill works when creating new invoice

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
- [ ] All nav links work (no 404s) — **PARTIAL: /clients is 404 (TASK-239)**
- [ ] Mobile navigation works
- [ ] Back/forward browser buttons work
- [x] Settings nav link present in authenticated layout
- [x] Recurring nav link present in authenticated layout

### Console & Network
- [ ] No console.error messages — **PARTIAL: /clients 404, sign-in 401**
- [x] No uncaught exceptions
- [ ] No failed network requests (4xx/5xx) — **PARTIAL: /clients 404; /api/auth/sign-in/email 401**
- [x] No CORS errors

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3000") -->
- App URL: http://localhost:3000
- Database: SQLite via Drizzle ORM — run `pnpm db:push` before testing
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
