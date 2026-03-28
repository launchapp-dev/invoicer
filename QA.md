# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | 2026-03-28 (run 5) |
| Result | IN PROGRESS |
| Steps Passed | TBD |
| Duration | TBD |
| Console Errors | TBD |
| Network Errors | TBD |

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
- [ ] Payment terms presets available (Net 15, Net 30, Net 60, Due on Receipt, Custom)
- [ ] Custom payment terms field appears when "Custom" selected

### Invoice Dashboard
- [x] Dashboard loads with invoice list
- [x] Search works — filters by recipient name, shows Clear button
- [ ] Status filter works
- [x] Date range filter works (Issue Date From/To fields present)
- [ ] Sort controls work (date, amount, status, client)
- [x] Edit invoice navigates correctly — actions menu → Edit opens /invoices/[id]
- [ ] Delete invoice with confirmation works
- [ ] Duplicate invoice works
- [x] Quick stats show total outstanding, paid this month, overdue amount
- [x] Bulk select checkboxes appear
- [ ] Bulk delete works
- [ ] Bulk mark-as-sent works
- [ ] Client filter dropdown works (filter by client name)
- [ ] Currency filter dropdown works

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
- [ ] Business logo upload works and persists
- [ ] Uploaded logo renders in invoice preview
- [ ] Uploaded logo renders in generated PDF
- [ ] Dark mode toggle exists in settings
- [ ] Dark mode toggle switches theme
- [ ] Brand color customization field present in settings
- [ ] Font customization field present in settings
- [ ] Brand color applies to invoice PDF output

### Client Management
- [x] /clients page loads and lists clients — **FIXED (TASK-239)**
- [x] Create new client works — form saves, redirects to detail page
- [x] /clients/[id] detail page loads with invoice history — shows total billed, outstanding, overdue stats and invoice table
- [ ] Client autofill works when creating new invoice — **BLOCKED: missing packages (TASK-249) crash invoice form**
- [ ] Client CSV import works (import clients from CSV file)

### Payment Recording
- [ ] Mark invoice as paid with date, method, reference number
- [ ] Paid status is reflected in dashboard

### Partial Payments
- [ ] Multiple payments can be recorded against one invoice
- [ ] Payment total tracks cumulative amount paid
- [ ] Remaining balance shown correctly after partial payment

### Public Invoice Share Link
- [ ] Share link is generated and accessible for an invoice
- [ ] Opening share link auto-updates invoice status to "Viewed"
- [ ] Share link is accessible without login

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

### File Attachments
- [ ] File attachment button/area exists on invoice form
- [ ] Can attach a file (contract, receipt, SOW) to an invoice
- [ ] Attached file persists after saving invoice

### Bulk CSV Export
- [ ] Bulk CSV export button/option exists on dashboard
- [ ] Exporting invoices downloads a CSV file
- [ ] CSV contains correct invoice data

### Expense Tracking
- [ ] /expenses page loads
- [ ] Can upload/add an expense
- [ ] AI receipt extraction works (extracts vendor, amount, date from uploaded receipt)
- [ ] Expenses linked to clients show in P&L view
- [ ] Client P&L shows revenue minus expenses

### AI Cash Flow Forecasting
- [ ] Cash flow forecasting widget appears on dashboard
- [ ] Widget shows "Expected this month" vs "At risk" breakdown

### AI Payment Reminders
- [ ] AI payment reminder feature accessible for overdue invoices
- [ ] AI draft reminder message generated for overdue invoice

### Natural Language AI Search
- [ ] Natural language search input present on dashboard
- [ ] Searching "unpaid invoices" returns filtered results

### Invoice Templates
- [ ] /settings/templates page loads
- [ ] Multiple invoice templates available for selection
- [ ] Selecting a template applies to invoice preview/PDF

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3002") -->
- App URL: http://localhost:3002
- Dev server: `pnpm dev` runs on port **3002** (dedicated — avoids conflict with CondoHub on 3000, PostPilot on 3001). Start with `pnpm dev` before running any E2E tests.
- Database: SQLite via Drizzle ORM — run `pnpm db:push` before testing
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
