---
repo: launchapp-sveltekit
date: "2026-03-24T03:16:00Z"
build_status: pass
test_status: fail
lint_status: fail
---

# Quality Audit Report: launchapp-sveltekit

## Executive Summary

| Check | Status | Details |
|-------|--------|---------|
| Install | ✅ PASS | Dependencies installed (1162 packages) |
| Build | ✅ PASS | 17 packages built successfully (~100s) |
| Test | ❌ FAIL | Vitest configuration error in @repo/auth |
| Lint | ❌ FAIL | 391 errors, 495 warnings (down from 2209!) |

## Comparison with Previous Audit (2026-03-20)

| Metric | Previous (2026-03-20) | Current (2026-03-24) | Change |
|--------|----------------------|----------------------|--------|
| Build | ✅ PASS | ✅ PASS | Stable |
| Test | ✅ PASS | ❌ FAIL | ⚠️ Regression |
| Lint | ❌ FAIL (2209 errors) | ❌ FAIL (391 errors) | ✅ **82% improvement** |

**Major Win**: Previous audit recommendations were implemented:
- ✅ `.svelte-kit/` now excluded in `biome.json`
- ✅ `tailwindDirectives: true` enabled for CSS parser

This reduced lint errors from 2209 (mostly generated files) to 391 (actual source code issues).

## Detailed Findings

### ✅ Build: PASS

**Command:** `pnpm build`
**Exit Code:** 0
**Duration:** ~100 seconds
**Packages Built:** 17/17 successful

All packages built successfully:
- `@repo/config`, `@repo/core`, `@repo/analytics`, `@repo/api-hooks`, `@repo/observability`
- `@repo/ui-kit`, `@repo/i18n`, `@repo/pulumi`, `@repo/storage`, `@repo/database`
- `@repo/email`, `@repo/mcp`, `@repo/billing`, `@repo/auth`, `@repo/api`, `@repo/web`

**Warnings (non-blocking):**
- Svelte plugin warnings about non-reactive updates in admin pages (`revenueCanvas`, `statusCanvas`)
- Accessibility warnings: Buttons without aria-labels
- State reference warnings: `data` captured at initial value, should use derived
- Vercel adapter warnings about optional dependencies

### ❌ Test: FAIL

**Command:** `pnpm test`
**Exit Code:** 1
**Duration:** ~16 seconds

**Failure Analysis:**

| Package | Status | Details |
|---------|--------|---------|
| @repo/config | ✅ 4 passed | OK |
| @repo/core | ✅ 6 passed | OK |
| @repo/billing | ✅ 42 passed | OK |
| @repo/database | ✅ 63 passed | OK (increased from 31!) |
| @repo/api | ✅ 14 passed | OK (increased from 12) |
| @repo/email | ✅ 8 passed | OK |
| @repo/mcp | ✅ 7 passed | OK |
| @repo/i18n | ✅ 16 passed | OK |
| @repo/ui-kit | ✅ 5 passed | OK |
| @repo/api-hooks | ✅ 6 passed | OK |
| **@repo/auth** | ❌ **FAILED** | Vitest configuration error |

**Root Cause:** The @repo/auth package fails with:
```
Error: Vitest failed to find the current suite.
❯ ../../node_modules/better-auth/src/test-utils/test-instance.ts:26:1
```

This is a **test infrastructure issue**, not actual test failures. The better-auth test utility is causing Vitest to fail during test discovery. This likely stems from PRs adding admin features or analytics integration that modified the auth setup.

### ❌ Lint: FAIL

**Command:** `pnpm lint`
**Exit Code:** 1
**Duration:** ~0.2s
**Errors:** 391 (down from 2209!)
**Warnings:** 495
**Files Checked:** 421

**Error Breakdown:**

| Category | Count | Source |
|----------|-------|--------|
| Unused imports | ~12 | Recent PRs (#144 testimonials) |
| Unused variables | ~8 | Recent PRs (#144 testimonials) |
| Formatting issues | ~300+ | Various files |
| Import organization | ~8 | Various files |
| Code style | ~60 | Various files |

**Key Files with Issues:**

1. **apps/web/src/lib/components/LogoStrip.svelte** (PR #144)
   - Unused `companies` variable
   - Formatting (tabs vs spaces)

2. **apps/web/src/lib/components/TestimonialsSection.svelte** (PR #144)
   - 4 unused imports: `Card`, `CardContent`, `scrollReveal`, `LogoStrip`
   - Unused `testimonials` variable
   - Unused `getInitials` function
   - Import organization issues
   - Formatting issues

3. **apps/web/src/hooks.server.ts**
   - Unused import `getActiveTraceId`

4. **packages/observability/src/index.ts**
   - Formatting issues (indentation)

## Analysis: Recent PR Impact (2026-03-20 to 2026-03-24)

### PRs Since Last Audit:
- PR #148: chore: sync tsconfig.json test file exclusions
- PR #144: feat(TASK-098): add testimonials section with logo strip and scroll animations
- PR #140: feat(TASK-032): wire @repo/analytics PostHog integration
- PR #139: fix: add required environment variables to apps/web/.env
- PR #134: fix: Make vercel.json API rewrite configurable via env
- PR #133: feat(admin): create /admin overview page
- PR #132: ao/task-355
- PR #131: feat(database): add audit_logs and feature_flags tables
- PR #130: docs: document routes structure and SvelteKit file conventions
- PR #128: ao/task-350

### Impact Assessment:

| PR | Impact | Notes |
|----|--------|-------|
| #144 (testimonials) | ⚠️ Introduced lint errors | Unused imports/variables in new components |
| #140 (analytics) | ⚠️ May have affected auth tests | PostHog integration could conflict with better-auth test setup |
| #131 (database) | ✅ Positive | More tests passing (63 vs 31) |
| #133 (admin) | ⚠️ Build warnings | Non-reactive state warnings in admin pages |

## Recommended Fixes

### Priority 1: Fix Test Configuration

**File:** `packages/auth/vitest.config.ts` or `packages/auth/src/auth.test.ts`

The better-auth test utility is incompatible with the current Vitest setup. Options:
1. Exclude the auth test from CI temporarily
2. Update better-auth to a compatible version
3. Mock the better-auth test utilities

### Priority 2: Clean Up Lint Errors in New Components

Run auto-fix on the testimonials components:
```bash
pnpm lint:fix
```

This will resolve:
- Import organization (safe fix)
- Formatting issues (safe fix)

Then manually fix remaining unused imports/variables in:
- `apps/web/src/lib/components/LogoStrip.svelte`
- `apps/web/src/lib/components/TestimonialsSection.svelte`
- `apps/web/src/hooks.server.ts`

### Priority 3: Fix Admin Page Warnings

Address Svelte 5 reactivity warnings in:
- `apps/web/src/routes/(admin)/admin/subscriptions/+page.svelte`
- `apps/web/src/routes/(admin)/admin/users/+page.svelte`
- `apps/web/src/routes/(app)/settings/+page.svelte`

## Conclusion

The codebase is in **improved condition** compared to the previous audit:

- ✅ **Lint errors reduced by 82%** (2209 → 391) due to previous audit recommendations being implemented
- ✅ **Build remains stable** - all 17 packages build successfully
- ⚠️ **Test infrastructure regression** - @repo/auth has configuration issues
- ⚠️ **Recent PRs introduced code quality debt** - testimonials feature has unused code

**Overall Grade: B+** (up from B)
- Build: A
- Test: C (infrastructure issue)
- Lint: B- (significant improvement, but still needs cleanup)

**Recommended Action:**
1. Run `pnpm lint:fix` to auto-fix formatting and import issues
2. Manually clean up unused code in testimonials components
3. Investigate and fix the @repo/auth Vitest configuration
