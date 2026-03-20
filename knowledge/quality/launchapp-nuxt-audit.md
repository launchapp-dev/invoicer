---
repo: launchapp-nuxt
date: 2026-03-20
build_status: FAILED
test_status: SKIPPED
lint_status: FAILED
typecheck_status: FAILED
---

# Quality Audit: launchapp-dev/launchapp-nuxt

**Audit Date:** 2026-03-20
**Repository:** https://github.com/launchapp-dev/launchapp-nuxt
**Commit:** a7dd46a (Merge pull request #6 from launchapp-dev/ao/task-020)

## Executive Summary

The `launchapp-nuxt` repository **fails critical quality checks** and is not suitable for production deployment. The build is broken due to missing type definitions, linting standards are not met, and there are no automated tests configured.

**Current Status:**
- ✗ **Build:** FAILED
- ✗ **Typecheck:** FAILED
- ✗ **Lint:** FAILED (167 errors, 133 warnings)
- ⊘ **Test:** SKIPPED (no tests configured)

---

## Build Results

**Status:** ❌ FAILED
**Exit Code:** 1
**Duration:** ~2 seconds

### Failure Details

Build fails in `@repo/core` package with critical TypeScript error:

```
error TS2688: Cannot find type definition file for 'cookie'.
  The file is in the program because:
    Entry point for implicit type library 'cookie'
```

**Root Cause:** Missing `@types/cookie` dependency in `@repo/core` package. The type definition is referenced but not explicitly declared as a dependency. This is likely a transitive dependency from one of the consuming packages (e.g., `@repo/billing` depends on stripe or @polar-sh/sdk which may reference cookie types).

**Failure Location:** `packages/core/src/index.ts`

### Recommended Fix

1. **Primary fix:** Add `@types/cookie` as a dependency in `packages/core/package.json`:
   ```json
   "devDependencies": {
     "@types/cookie": "^1.0.0",
     "@repo/typescript-config": "workspace:*"
   }
   ```

2. **Verify:** Run `pnpm install` to resolve dependencies across the workspace

3. **Alternative:** If the dependency is not needed in `@repo/core` directly, move it to the package that actually uses it (likely `@repo/billing` or a package that references the Stripe SDK)

---

## Typecheck Results

**Status:** ❌ FAILED
**Exit Code:** 1
**Duration:** ~1.7 seconds

### Failure Details

Typecheck fails with the **same missing `@types/cookie` error** as the build. The typecheck command cannot complete due to unresolved type references across the monorepo.

**Command:** `pnpm typecheck` (runs `turbo typecheck`)

### Recommended Fix

Resolving the build issue (adding `@types/cookie`) will automatically fix typecheck failures.

---

## Linting Results

**Status:** ❌ FAILED
**Exit Code:** 1
**Duration:** ~1 second

**Tool:** Biome 2.0.0
**Checks:** Both linting and formatting

### Summary Statistics

- **Total Errors:** 167
- **Total Warnings:** 133
- **Files Checked:** 223
- **Files with Issues:** Multiple

### Critical Issues (by category)

#### 1. Unused Variables (Primary Issue)

**Count:** Multiple instances across Vue components

**Examples:**
- `apps/web/app/components/AppFooter.vue:28` - unused variable `year`
- `apps/web/app/components/CookieBanner.vue:45` - unused variable `showBanner`
- `apps/web/app/components/CookieBanner.vue:47` - unused function `handleAccept`
- `apps/web/app/components/CookieBanner.vue:51` - unused function `handleReject`
- `apps/web/app/components/CookieConsent.vue:64` - unused function `accept`
- `apps/web/app/components/CookieConsent.vue:69` - unused function `decline`

**Impact:** Indicates incomplete refactoring or dead code. These are correctness issues that should be fixed, not ignored.

#### 2. Formatting Issues

**Count:** Extensive across codebase

**Examples:**
- `.mcp.json` - Indentation formatting (args array formatting)
- `package.json` - Missing trailing newline
- Multiple `tsconfig.json` files - Multiline array formatting inconsistency
- Vue component middleware files - Tab/space indentation inconsistency

**Impact:** Biome formatter would modify 20+ files. Build pipeline is inconsistent with team standards.

#### 3. Import Organization

**Count:** Multiple files

**Examples:**
- `apps/web/app/composables/useAnalytics.ts` - Imports not sorted
- `packages/vue-ui-kit/src/utils/cn.ts` - Type imports not sorted correctly

**Impact:** Code maintainability issue; inconsistent import ordering across packages.

### Recommended Fixes

1. **Fix unused variables immediately:**
   ```bash
   pnpm lint:fix
   ```
   This will resolve the formatting issues and help identify actual unused code.

2. **Review and remove unused code in Vue components:**
   - `CookieBanner.vue` - `showBanner`, `handleAccept`, `handleReject` are defined but not used in templates. Either use them or remove them.
   - `CookieConsent.vue` - `accept`, `decline` functions are unused. Check if these should be exported or removed.

3. **Commit formatting fixes:**
   After running `pnpm lint:fix`, stage and commit the formatting changes to establish a clean baseline.

4. **Enforce linting in CI/CD:**
   Add a pre-commit hook or CI check to prevent future linting failures:
   ```bash
   pnpm lint
   ```

---

## Test Results

**Status:** ⊘ SKIPPED
**Result:** No automated tests configured

The `test` script in `package.json` is a placeholder:
```json
"test": "echo \"No tests configured yet\""
```

### Recommended Actions

1. **Set up test framework:** Choose a test framework (recommended: Vitest for monorepo)
2. **Create test files:** Add `*.test.ts` and `*.spec.ts` files in packages
3. **Configure test runner:** Update turbo.json and package.json scripts
4. **Set coverage goals:** Aim for >80% coverage on core packages

---

## Summary of Findings

| Check | Status | Severity | Action Required |
|-------|--------|----------|-----------------|
| Build | FAILED | CRITICAL | Add missing @types/cookie dependency |
| Typecheck | FAILED | CRITICAL | Resolve build issue first |
| Lint | FAILED | HIGH | Fix unused variables and formatting |
| Test | SKIPPED | MEDIUM | Implement test infrastructure |

---

## Recommended Priority Actions

### 🔴 CRITICAL (Block All Deploys)

1. **Add `@types/cookie` to @repo/core dependencies**
   - Unblock: build, typecheck
   - Estimated effort: 5 minutes
   - Files to change: `packages/core/package.json`

### 🟠 HIGH (Must Fix Before Deploy)

2. **Remove unused code from Vue components**
   - Fix: CookieBanner.vue, CookieConsent.vue, AppFooter.vue
   - Estimated effort: 15-30 minutes
   - Type: Code cleanup

3. **Run formatter and commit results**
   - Fix: 167 linting errors, formatting inconsistency
   - Estimated effort: 5 minutes + review
   - Type: Formatting/style

### 🟡 MEDIUM (Before Next Release)

4. **Implement automated tests**
   - Add: Test infrastructure and baseline tests
   - Estimated effort: 2-4 hours
   - Type: Infrastructure

---

## Verification Steps

To verify fixes:

```bash
# 1. Add @types/cookie and install
pnpm install

# 2. Run build (should pass)
pnpm build

# 3. Run typecheck (should pass)
pnpm typecheck

# 4. Run lint with fixes
pnpm lint:fix

# 5. Verify remaining lint issues
pnpm lint

# 6. Test (will still echo, but ready for implementation)
pnpm test
```

---

## Environment Details

- **Node Version:** v22.17.0
- **pnpm Version:** 10.0.0
- **Package Manager:** pnpm workspace (monorepo)
- **Build Tool:** Turbo
- **Linter:** Biome 2.0.0
- **Dependencies Installed:** 1,076 packages

---

## Conclusion

The repository has **critical build failures** that must be resolved before any deployment. Once the missing dependency is added, the codebase will compile, but **linting standards must be enforced** through code review or CI/CD gates. **Test infrastructure should be implemented** as soon as possible to prevent regressions.
