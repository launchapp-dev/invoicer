# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | 2026-03-28 |
| Result | PARTIAL PASS (2 bugs found) |
| Steps Passed | 5/6 (Step 5 partial — /clients 404) |
| Duration | ~10 min |
| Console Errors | 1 (GET /clients 404) |
| Network Errors | 1 (GET /clients 404) |

## Test Results History

<!-- QA agent: append each run result here. Format: | Date | Passed | Failed | Bugs Created | Notes | -->
| Date | Passed | Failed | Bugs Created | Notes |
|------|--------|--------|-------------|-------|
| 2026-03-28 | 5 | 2 | 2 | /clients 404; AI command bar missing from dashboard |

## Known Issues

<!-- QA agent: track active bugs found during E2E testing. Remove when fixed. -->
- **[2026-03-28] /clients returns 404** — Client management page not found. TASK-227 (build /clients page) is marked done but the route does not exist at runtime. Blocks all client management tests.
- **[2026-03-28] AI command bar missing from dashboard** — TASK-234 (AI smart invoice creation via natural language command bar) is marked done but no command bar or natural language input is visible on the dashboard.

## Regression Tracker

<!-- QA agent: if a previously passing test starts failing, log it here with the date and suspected cause. -->
| Date | Test | Was | Now | Suspected Cause |
|------|------|-----|-----|-----------------|

## Test Coverage

### Auth Flow
- [x] Landing page loads without errors
- [x] Signup with email/password works
- [x] Login with existing credentials works
- [x] Protected routes redirect to login when unauthenticated
- [x] Logout redirects to landing/login
- [ ] Duplicate signup shows appropriate error
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
- [ ] Edit invoice navigates correctly
- [ ] Delete invoice with confirmation works
- [ ] Duplicate invoice works
- [x] Quick stats show total outstanding, paid this month, overdue amount

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
- [ ] Command bar or natural language input exists on dashboard — **FAIL: not found**
- [ ] AI-assisted invoice creation does not throw errors

### Navigation
- [ ] All nav links work (no 404s) — **PARTIAL: /clients is 404**
- [ ] Mobile navigation works
- [ ] Back/forward browser buttons work
- [x] Settings nav link present in authenticated layout

### Console & Network
- [x] No console.error messages
- [x] No uncaught exceptions
- [ ] No failed network requests (4xx/5xx) — **PARTIAL: /clients returns 404**
- [x] No CORS errors

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3000") -->
- App URL: http://localhost:3000
- Database: SQLite via Drizzle ORM — run `pnpm db:push` before testing
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
