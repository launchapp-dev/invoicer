# QA Test Plan — Invoicer

This is a living document maintained by the QA agent. It tracks test results, known issues, regression history, and the current state of the application.

## Last Run

| Field | Value |
|-------|-------|
| Date | — |
| Result | — |
| Steps Passed | —/6 |
| Duration | — |
| Console Errors | — |
| Network Errors | — |

## Test Results History

<!-- QA agent: append each run result here. Format: | Date | Passed | Failed | Bugs Created | Notes | -->
| Date | Passed | Failed | Bugs Created | Notes |
|------|--------|--------|-------------|-------|

## Known Issues

<!-- QA agent: track active bugs found during E2E testing. Remove when fixed. -->

## Regression Tracker

<!-- QA agent: if a previously passing test starts failing, log it here with the date and suspected cause. -->
| Date | Test | Was | Now | Suspected Cause |
|------|------|-----|-----|-----------------|

## Test Coverage

### Auth Flow
- [ ] Landing page loads without errors
- [ ] Signup with email/password works
- [ ] Login with existing credentials works
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Logout redirects to landing/login
- [ ] Duplicate signup shows appropriate error

### Invoice Creation
- [ ] New invoice form loads
- [ ] Sender info fields work
- [ ] Recipient info fields work
- [ ] Add line item works
- [ ] Remove line item works
- [ ] Auto-calculations update in real-time
- [ ] Save invoice succeeds
- [ ] Saved invoice appears in dashboard

### Invoice Dashboard
- [ ] Dashboard loads with invoice list
- [ ] Search works
- [ ] Status filter works
- [ ] Edit invoice navigates correctly
- [ ] Delete invoice with confirmation works
- [ ] Duplicate invoice works

### PDF Generation
- [ ] Generate PDF button exists
- [ ] PDF downloads without errors
- [ ] PDF contains correct invoice data

### Live Preview
- [ ] Preview updates as form is edited
- [ ] Preview shows sender/recipient info
- [ ] Preview shows line items and totals

### Navigation
- [ ] All nav links work (no 404s)
- [ ] Mobile navigation works
- [ ] Back/forward browser buttons work

### Console & Network
- [ ] No console.error messages
- [ ] No uncaught exceptions
- [ ] No failed network requests (4xx/5xx)
- [ ] No CORS errors

## Environment Notes

<!-- QA agent: document any environment-specific findings here (e.g., "database must be seeded before auth works", "dev server must be running on port 3000") -->
- App URL: http://localhost:3000
- Database: SQLite via Drizzle ORM — run `pnpm db:push` before testing
- Auth: Better Auth — requires BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env
- Test credentials: qa-test@invoicer.dev / TestPass123!
