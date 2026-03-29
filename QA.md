# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | 2026-03-29 (run 7) |
| Result | 3 PASS / 2 FAIL (steps) |
| Steps Passed | 1 (smoke), 4 (PDF — FIXED), 5 (navigation/logout/login all OK) |
| Steps Failed | 3 (save invoice — client_id regression persists), dashboard crash |
| Console Errors | 3 (client_id SqliteError on dashboard/invoice save) + multiple 500s on /invoices/new |
| Network Errors | 0 (PDF font 404 FIXED) |

## Test Results History

<!-- QA agent: append each run result here. Format: | Date | Passed | Failed | Bugs Created | Notes | -->
| Date | Passed | Failed | Bugs Created | Notes |
|------|--------|--------|-------------|-------|
| 2026-03-28 | 5 | 2 | 2 | /clients 404; AI command bar missing from dashboard |
| 2026-03-28 | 4 | 3 | 2 | /clients 404 persists (TASK-235 regression); auth login failure + duplicate signup bug (TASK-240); AI command bar now fixed |
| 2026-03-28 | 4 | 2 | 1 | TASK-239 (/clients 404) FIXED; TASK-240 (auth) FIXED; new CRITICAL: missing @radix-ui/react-popover + cmdk packages crash entire app (TASK-249) |
| 2026-03-28 | 6 | 1 | 1 | TASK-249 FIXED (app no longer crashes); PDF generation fails — Inter font 404 from Google CDN; .env BETTER_AUTH_URL was :3000 not :3002 (fixed in env); all new features (expenses, templates, brand style, CSV export, share link) present |
| 2026-03-28 | 3 | 3 | 3 | CRITICAL regression: TASK-280 clientId FK added to schema but db:push not run — dashboard and invoice save crash (TASK-289). PDF font 404 persists (TASK-281 regression, TASK-290). Archived status missing from dropdown (TASK-275 regression, TASK-291). New features verified: TASK-279 tax ID/currency on client form, TASK-276 default payment terms in settings. |
| 2026-03-29 | 3 | 2 | 1 | TASK-290 (PDF) FIXED ✓. TASK-291 (Archived status) FIXED ✓. TASK-293 (Tax Presets) verified working. client_id SqliteError PERSISTS (TASK-289 marked done but db:push still not run — new task TASK-296 created). 500 errors on /invoices/new from duplicate detection background queries (same root cause). |

## Known Issues

<!-- QA agent: track active bugs found during E2E testing. Remove when fixed. -->
- **[2026-03-29] CRITICAL: SqliteError client_id column missing — dashboard + invoice save broken (TASK-296)** — TASK-289 was marked done but `pnpm db:push` was never run. Every route querying invoices crashes. Dashboard shows "Something went wrong", Save Invoice shows toast "table invoices has no column named client_id". Fix: run `pnpm db:push` in `/Users/samishukri/brain/repos/invoicer`.
- **[2026-03-29] 500 errors on /invoices/new from background duplicate detection queries** — When form data changes, duplicate detection fires background RSC POST requests that hit the broken invoices table and return 500. Same root cause as TASK-296 (client_id missing). Will auto-fix once db:push is run.

## Regression Tracker

<!-- QA agent: if a previously passing test starts failing, log it here with the date and suspected cause. -->
| Date | Test | Was | Now | Suspected Cause |
|------|------|-----|-----|-----------------|
| 2026-03-28 | Login with existing credentials | PASS | ~~FAIL~~ PASS | TASK-240 fixed — login now works correctly |
| 2026-03-28 | /invoices/new and /invoices/[id] — all pages | PASS | ~~FAIL~~ PASS | TASK-249 fixed — combobox packages now installed, invoice form works |
| 2026-03-28 | Dashboard loads | PASS | FAIL | TASK-280 added client_id FK but pnpm db:push not run — SqliteError (TASK-289) |
| 2026-03-28 | Save invoice succeeds | PASS | FAIL | Same root cause — client_id column missing from DB (TASK-289) |
| 2026-03-28 | PDF downloads without errors | PASS | FAIL | TASK-281 marked done but Inter font .woff 404 persists (TASK-290) |
| 2026-03-29 | PDF downloads without errors | FAIL | PASS | TASK-290 fixed — PDF now downloads successfully with no font 404 |
| 2026-03-29 | Archived status in invoice dropdown | FAIL | PASS | TASK-291 fixed — Archived now appears in Status dropdown |

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
- [ ] Save invoice succeeds — **FAIL: SqliteError client_id column missing (TASK-296)**
- [ ] Saved invoice appears in dashboard — **BLOCKED by save failure**
- [x] Payment terms presets available (Net 15, Net 30, Net 60, Due on Receipt, Custom)
- [ ] Custom payment terms field appears when "Custom" selected

### Invoice Dashboard
- [ ] Dashboard loads with invoice list — **FAIL: SqliteError client_id column missing (TASK-289)**
- [ ] Search works — **BLOCKED**
- [ ] Status filter works (including "viewed" and "archived" statuses — TASK-294 fix) — **BLOCKED**
- [ ] Date range filter works — **BLOCKED**
- [ ] Sort controls work (date, amount, status, client) — **BLOCKED**
- [ ] Edit invoice navigates correctly — **BLOCKED**
- [ ] Delete invoice with confirmation works — **BLOCKED**
- [ ] Duplicate invoice works — **BLOCKED**
- [ ] Quick stats show total outstanding, paid this month, overdue amount — **BLOCKED**
- [ ] Bulk select checkboxes appear — **BLOCKED**
- [ ] Bulk delete works — **BLOCKED**
- [ ] Bulk mark-as-sent works — **BLOCKED**
- [ ] Client filter dropdown works — **BLOCKED**
- [ ] Currency filter dropdown works — **BLOCKED**

### PDF Generation
- [x] Generate PDF button exists
- [x] PDF downloads without errors — **FIXED (TASK-290)**
- [ ] PDF contains correct invoice data

### Live Preview
- [x] Preview updates as form is edited
- [x] Preview shows sender/recipient info
- [x] Preview shows line items and totals

### Invoice Lifecycle & Status
- [x] Archived status option available in invoice Status dropdown — **FIXED (TASK-291)**
- [ ] Invoice can be archived from dashboard actions menu — **BLOCKED: dashboard broken**
- [ ] Archived invoices shown with "Archived" badge — **BLOCKED**
- [ ] Auto-overdue: sent/viewed invoices past due date flagged overdue (TASK-277) — **BLOCKED: dashboard broken**

### Settings
- [x] Settings page loads at /settings
- [x] Business profile fields (name, address, logo, tax ID) render
- [x] Invoice defaults section renders (payment terms, tax rate, notes)
- [ ] Settings pre-fill new invoice form with saved defaults
- [ ] Business logo upload works and persists
- [ ] Uploaded logo renders in invoice preview
- [ ] Uploaded logo renders in generated PDF
- [x] Theme combobox (System/Light/Dark) present in settings
- [ ] Dark mode toggle switches theme
- [x] Brand color customization field present in settings
- [x] Font customization field present in settings
- [ ] Brand color applies to invoice PDF output (TASK-278)
- [x] Default Payment Terms field in Invoice Defaults section (TASK-276)
- [ ] Default payment terms saved in settings pre-fill new invoice form

### Client Management
- [x] /clients page loads and lists clients — **FIXED (TASK-239)**
- [x] Create new client form loads at /clients/new
- [ ] Save new client works — **NOT TESTED this run**
- [ ] /clients/[id] detail page loads with invoice history — **NOT TESTED this run**
- [ ] Client autofill works when creating new invoice — **BLOCKED: invoice save broken (TASK-289)**
- [x] Client CSV import button present on /clients page
- [ ] Client CSV import works (import clients from CSV file)
- [x] Tax ID / VAT / EIN field present on client form (TASK-279)
- [x] Currency preference field present on client form (TASK-279)

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
- [ ] Command bar or natural language input exists on dashboard — **BLOCKED: dashboard broken**
- [ ] AI dialog opens without errors and accepts natural language input — **BLOCKED**

### Landing Page
- [x] Landing page loads (no 404, no console errors)
- [x] Invoice preview showcase section visible in hero (TASK-295)
- [x] Feature grid section present (AI invoice creation, Live PDF preview, Recurring, Client management, Multi-currency, Partial payments)
- [x] Pricing section present (Free $0/mo and Pro $19/mo tiers) (TASK-287)
- [x] "Built with AO" badge present in footer (TASK-288)
- [ ] Scroll animations on landing page sections (TASK-292) — NOT TESTED
- [ ] Dark mode toggle in nav switches theme (TASK-288) — NOT TESTED

### Navigation
- [x] Landing page loads (no 404)
- [x] /login loads
- [x] /signup loads
- [ ] /dashboard loads — **FAIL: client_id SqliteError (TASK-296 — TASK-289 regression)**
- [x] /invoices/new loads
- [x] /clients loads
- [x] /clients/new loads
- [x] /settings loads
- [x] /settings/templates loads
- [x] /dashboard/recurring loads
- [x] /expenses loads
- [x] Logout redirects to /login
- [ ] Mobile navigation works
- [ ] Back/forward browser buttons work
- [x] Settings nav link present in authenticated layout
- [x] Recurring nav link present in authenticated layout
- [x] Clients nav link present in authenticated layout

### Console & Network
- [ ] No console.error messages — **FAIL: client_id SqliteError (x3) on dashboard/save + 500s on /invoices/new**
- [ ] No uncaught exceptions — **FAIL: dashboard and invoice save throw**
- [ ] No failed network requests (4xx/5xx) — **FAIL: 500s on /invoices/new from duplicate detection queries**
- [x] No CORS errors

### Multi-Currency
- [x] Currency selector present on invoice form (USD — US Dollar visible)
- [ ] Other currencies render correctly in preview and PDF

### Multi-Tax Rate
- [x] Multiple tax rates can be added per invoice
- [x] Each rate is labeled and calculated independently
- [x] Tax Presets button available on invoice form (TASK-293)
- [x] Tax presets cover AU, CA, EU VAT, UK, US all 50 states (TASK-293)
- [x] Selecting a preset adds a correctly calculated tax line

### File Attachments
- [x] File attachment button/area exists on invoice form (drag-and-drop + Add files button)
- [ ] Can attach a file (contract, receipt, SOW) to an invoice
- [ ] Attached file persists after saving invoice

### Bulk CSV Export
- [ ] Bulk CSV export button exists on dashboard — **BLOCKED: dashboard broken**
- [ ] Exporting invoices downloads a CSV file
- [ ] CSV contains correct invoice data

### Expense Tracking
- [x] /expenses page loads with Add Expense button
- [ ] Can upload/add an expense
- [ ] AI receipt extraction works (extracts vendor, amount, date from uploaded receipt)
- [ ] Expenses linked to clients show in P&L view
- [ ] Client P&L shows revenue minus expenses

### AI Cash Flow Forecasting
- [ ] Cash flow forecasting widget appears on dashboard — **BLOCKED: dashboard broken**
- [ ] Widget shows "Expected this month" vs "At risk" breakdown

### AI Payment Reminders
- [ ] AI payment reminder feature accessible for overdue invoices
- [ ] AI draft reminder message generated for overdue invoice

### Natural Language AI Search
- [ ] Natural language search input present on dashboard — **BLOCKED: dashboard broken**
- [ ] Searching "unpaid invoices" returns filtered results

### Invoice Activity Log
- [ ] Activity log section visible on invoice detail/edit page — **NOT TESTED (TASK-284)**
- [ ] Status change events appear in activity log — **NOT TESTED**
- [ ] Payment events appear in activity log — **NOT TESTED**
- [ ] Edit events appear in activity log — **NOT TESTED**

### AI Tax Rate Auto-Suggest
- [ ] AI tax rate suggestion appears based on client jurisdiction (TASK-285) — **NOT TESTED (dashboard broken)**
- [ ] Suggestion auto-fills correct tax rate for client's location — **BLOCKED**

### Invoice Templates
- [x] /settings/templates page loads
- [x] Multiple invoice templates available for selection (Classic, Modern, Minimal)
- [ ] Selecting a template applies to invoice preview/PDF

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3002") -->
- App URL: http://localhost:3002
- Dev server: `pnpm dev` runs on port **3002** (dedicated — avoids conflict with CondoHub on 3000, PostPilot on 3001). Start with `pnpm dev` before running any E2E tests.
- Database: SQLite via Drizzle ORM — **MUST run `pnpm db:push` before testing and after any schema changes**. TASK-280 added client_id column but migration was not applied, causing TASK-289.
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
- **NOTE**: Database is reset between environments — if login fails with "Invalid email or password", use signup flow with qa-test@invoicer.dev / TestPass123!
