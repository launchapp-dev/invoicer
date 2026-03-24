---
repo: launchapp-nuxt
date: 2026-03-24T07:20:00Z
build_status: pass
test_status: skip
lint_status: fail
commit: 32a8b70
pr_burst: "2026-03-24 - 7 PRs merged (2 new since TASK-607)"
prs_merged:
  - PR #226: feat(TASK-667): add vue-ui-kit plugin for global component registration
  - PR #227: fix(dashboard): remove duplicate plan badge in stat card
  - PR #224: refactor(auth): migrate auth pages to use @repo/vue-ui-kit Button + Input
  - PR #233: fix(apps/web): add missing COPY for packages/upload and packages/mcp in Dockerfile
  - PR #225: TASK-670: Add POST /:id/unread endpoint for notifications
  - PR #230: fix: Biome lint errors in packages/api security files
  - PR #229: fix(apps/web): add explicit @nuxtjs/sitemap dependency
---

# Quality Audit Report: launchapp-nuxt

**Audit Date:** 2026-03-24
**Previous Audit:** TASK-607 (2026-03-24 ~01:56Z)
**Audited Commit:** 32a8b70
**Trigger:** 2 new PRs merged since last audit (#226, #227)

## Executive Summary

| Check | Status | Exit Code | Time | Change from TASK-607 |
|-------|--------|-----------|------|---------------------|
| Install | ✅ PASS | 0 | 32s | Improved (-27s) |
| Build | ✅ PASS | 0 | 2m14s | Slower (+79s, full rebuild) |
| Test | ⏭️ SKIP | 0 | 0.3s | No change |
| Lint (Biome) | ❌ FAIL | 1 | 2.6s | ✅ **IMPROVED** (7 → 3 errors) |

**Overall Quality Gate: FAILING** — Lint errors remain but reduced by 57%.

---

## Key Findings

### ✅ Improvement: Lint Errors Reduced from 7 to 3

Previous audit (TASK-607): 7 errors → Current audit: 3 errors

Fixed since last audit (likely by commit 32a8b70):
- `apps/web/app/pages/auth/login.vue` — Formatting (line length)
- `apps/web/app/pages/dashboard/settings/passkeys.vue` — Formatting (line length)
- `apps/web/app/pages/blog/[slug].vue:89` — Forbidden non-null assertion
- `packages/auth/src/auth.ts:1` — Import sorting
- `packages/auth/src/client.ts:1` — Import sorting
- `packages/auth/src/index.ts:1` — Import sorting

---

## Detailed Results

### ✅ Build Status: PASSING

All 18 packages built successfully:

```
Tasks:    18 successful, 18 total
Time:    2m12.637s
```

**Packages built:** @repo/config, @repo/core, @repo/database, @repo/email, @repo/auth, @repo/api, @repo/api-hooks, @repo/billing, @repo/analytics, @repo/ai, @repo/i18n, @repo/observability, @repo/search, @repo/storage, @repo/upload, @repo/vue-ui-kit, @repo/mcp, @repo/infrastructure, @repo/web

**Warnings:**
- Turbo: `no output files found for task @repo/web#build` — Configuration warning, not a build failure
- @parcel/watcher, core-js, esbuild, protobufjs, sharp — Build scripts ignored (expected in CI)
- @nuxt/image sharp binaries included for darwin-arm64

---

### ❌ Lint Status: FAILING (3 errors)

**Command:** `pnpm lint` (biome check .)
**Exit Code:** 1
**Time:** 2.6s

#### Remaining Issues

| File | Issue | Rule | Fixable |
|------|-------|------|---------|
| `apps/web/app/plugins/vue-ui-kit.ts:111` | Trailing newline | format | ✅ `lint:fix` |
| `packages/auth/src/vue-client.ts:1` | Import sorting | assist/source/organizeImports | ✅ `lint:fix` |
| `packages/database/src/schema/passkeys.ts:1` | Import sorting | assist/source/organizeImports | ✅ `lint:fix` |

**Analysis:**
- **2 import sorting errors** — from PR #224 (auth refactor) and passkey schema
- **1 formatting error** — from PR #226 (vue-ui-kit plugin), specifically trailing whitespace

---

### ⏭️ Test Status: SKIPPED

**Command:** `pnpm test`
**Result:** `"No tests configured yet"` — No test suite configured.

---

## PR Impact Analysis

### New PRs Since TASK-607 (This Audit)

| PR | Description | Impact on Quality |
|----|-------------|-------------------|
| #226 | vue-ui-kit plugin (TASK-667) | ⚠️ Minor formatting error introduced (trailing newline) |
| #227 | Dashboard duplicate badge fix | ✅ Clean — no issues |

### All 7 PRs in This Burst

| PR | Status | Notes |
|----|--------|-------|
| #233 | ✅ Clean | Dockerfile COPY fix |
| #230 | ✅ Clean | Biome lint fix in API |
| #229 | ✅ Clean | @nuxtjs/sitemap dependency |
| #227 | ✅ Clean | Dashboard duplicate badge fix |
| #226 | ⚠️ Minor | vue-ui-kit plugin — 1 formatting error |
| #225 | ✅ Clean | Notifications endpoint |
| #224 | ⚠️ Partial | Auth refactor — 2 import sorting errors remain |

---

## Comparison with TASK-607 (Earlier Today)

| Metric | TASK-607 | Current (TASK-609) | Change |
|--------|----------|-------------------|--------|
| Build | ✅ PASS | ✅ PASS | Stable |
| Lint Errors | 7 | 3 | ✅ **-57%** |
| Test | ⏭️ SKIP | ⏭️ SKIP | No change |
| Typecheck | ❌ Not run | ❌ Not run | N/A |

**Improvements Since TASK-607:**
- 4 lint errors fixed (likely by commit 32a8b70 addressing PR feedback)
- Install time reduced by 27s (cache reuse)

**Remaining Issues:**
- 3 auto-fixable Biome errors (import sorting, trailing newline)

---

## Recommended Actions

### 🔴 P0 — Fix Immediately

1. **Run lint:fix** — Auto-fix remaining 3 errors
   ```bash
   pnpm lint:fix
   git add .
   git commit -m "fix: resolve remaining Biome lint errors"
   ```

### 🟡 P1 — Nice to Have

2. **Add lint to CI** — Prevent future regressions
   ```yaml
   - name: Lint
     run: pnpm lint
   ```

3. **Add test infrastructure** — Currently no tests configured

---

## Action Items

| Priority | Task | ETA |
|----------|------|-----|
| P0 | Run `pnpm lint:fix` and commit | 5 min |
| P1 | Add lint check to CI workflow | 30 min |

---

## Conclusion

The 7-PR merge burst on 2026-03-24 has **improved code quality**:

1. ✅ **Lint errors reduced** from 3,271 (pre-TASK-607) → 7 (TASK-607) → **3 (current)**
2. ✅ **Build remains stable** — All 18 packages build successfully
3. ✅ **2 new PRs (#226, #227)** introduced only 1 minor formatting issue

**Quality Gate Status:** Still **FAILING** due to 3 lint errors, but these are auto-fixable.

**Recommendation:** Run `pnpm lint:fix` to achieve a passing quality gate.

---

*Report generated by AO quality-audit workflow (TASK-609)*
