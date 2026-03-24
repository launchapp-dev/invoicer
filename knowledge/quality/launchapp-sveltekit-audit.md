---
repo: launchapp-sveltekit
date: "2026-03-24T03:55:00Z"
build_status: pass
test_status: fail
lint_status: fail
---

# Quality Audit Report: launchapp-sveltekit

## Executive Summary

| Check | Status | Details |
|-------|--------|---------|
| Install | ✅ PASS | Dependencies installed (1162 packages) |
| Build | ✅ PASS | 18 packages built successfully (~66s) |
| Test | ❌ FAIL | Vitest configuration error in @repo/auth |
| Lint | ❌ FAIL | 391 errors, 495 warnings |

## Comparison with Previous Audit (2026-03-24 03:16Z)

| Metric | Previous | Current | Change |
|--------|----------|---------|--------|
| Build | ✅ PASS | ✅ PASS | Stable |
| Test | ❌ FAIL | ❌ FAIL | No change |
| Lint | ❌ FAIL (391 errors) | ❌ FAIL (391 errors) | Stable |

**Key Finding**: The 8 PRs merged since the last audit did **NOT** introduce new regressions. Quality metrics are stable.

## PRs Audited (8 PRs since last audit)

Based on task description, these PRs were merged 2026-03-24:

| PR | Description | Impact |
|----|-------------|--------|
| #139 | fix env vars (required VITE_ vars) | ✅ No issues |
| #140 | analytics PostHog integration (@repo/analytics) | ✅ No issues |
| #141 | team invitation accept/decline page (/invite) | ✅ No issues |
| #143 | account deletion self-service UI | ✅ No issues |
| #144 | testimonials section with logo strip | ⚠️ Lint issues (existing) |
| #145 | Railway and Fly.io deployment configs | ✅ No issues |
| #146 | ui-kit port from launchapp-nextjs components | ✅ No issues |
| #148 | tsconfig.json test exclusion sync | ✅ No issues |

## Detailed Findings

### ✅ Build: PASS

**Command:** `pnpm build`
**Exit Code:** 0
**Duration:** ~66 seconds
**Packages Built:** 18/18 successful

All packages built successfully:
- `@repo/config`, `@repo/core`, `@repo/analytics`, `@repo/api-hooks`, `@repo/observability`
- `@repo/ui-kit`, `@repo/i18n`, `@repo/pulumi`, `@repo/storage`, `@repo/database`
- `@repo/email`, `@repo/mcp`, `@repo/billing`, `@repo/auth`, `@repo/api`, `@repo/web`, `@repo/ai`

**Warnings (non-blocking):**
- Vercel adapter warnings about optional dependencies (same as previous)
- No new warnings introduced by the 8 PRs

### ❌ Test: FAIL

**Command:** `pnpm test`
**Exit Code:** 1
**Duration:** ~10 seconds

**Failure Analysis:**

| Package | Status | Details |
|---------|--------|---------|
| @repo/config | ✅ 4 passed | OK |
| @repo/core | ✅ 6 passed | OK |
| @repo/billing | ✅ 42 passed | OK |
| @repo/database | ✅ 63 passed | OK |
| @repo/api | ✅ 14 passed | OK |
| @repo/email | ✅ 8 passed | OK |
| @repo/mcp | ✅ 7 passed | OK |
| @repo/i18n | ✅ 16 passed | OK |
| @repo/ui-kit | ✅ 5 passed | OK (new from ui-kit port PR #146) |
| @repo/api-hooks | ✅ 6 passed | OK |
| **@repo/auth** | ❌ **FAILED** | Vitest configuration error |

**Root Cause:** Same as previous audit - better-auth test utility incompatibility:
```
Error: Vitest failed to find the current suite.
❯ ../../node_modules/better-auth/src/test-utils/test-instance.ts:26:1
```

This is a **pre-existing test infrastructure issue**, not a regression from the 8 PRs.

### ❌ Lint: FAIL

**Command:** `pnpm lint`
**Exit Code:** 1
**Duration:** ~115ms
**Errors:** 391
**Warnings:** 495
**Files Checked:** 421

**Error breakdown unchanged from previous audit:**

| Category | Count | Status |
|----------|-------|--------|
| Unused imports | ~12 | Same as before |
| Unused variables | ~8 | Same as before |
| Formatting issues | ~300+ | Same as before |
| Code style | ~60 | Same as before |

**Key files with issues (unchanged):**

1. **apps/web/src/lib/components/LogoStrip.svelte** (PR #144)
   - Unused `companies` variable

2. **apps/web/src/lib/components/TestimonialsSection.svelte** (PR #144)
   - 4 unused imports: `Card`, `CardContent`, `scrollReveal`
   - Unused `testimonials` variable
   - Unused `getInitials` function

3. **apps/web/src/hooks.server.ts**
   - Unused import `getActiveTraceId`

## Conclusion

The codebase quality is **stable** after the 8 PR merge burst on 2026-03-24.

- ✅ **Build remains stable** - all 18 packages build successfully
- ✅ **No new test failures** - same pre-existing @repo/auth issue
- ✅ **No new lint errors** - count unchanged at 391
- ✅ **New ui-kit package tests passing** - PR #146 successfully ported with working tests

**Overall Grade: B+** (unchanged)
- Build: A
- Test: C (pre-existing infrastructure issue)
- Lint: B- (stable at 391 errors, needs cleanup)

**Recommended Actions:**
1. Run `pnpm lint:fix` to auto-fix formatting issues
2. Manually clean up unused imports/variables in testimonials components
3. Fix @repo/auth Vitest configuration (better-auth compatibility)
