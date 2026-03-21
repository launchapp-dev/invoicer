---
repo: launchapp-nuxt
date: 2026-03-21
build_status: PASSED
test_status: SKIPPED
lint_status: FAILED
typecheck_status: FAILED
---

# Quality Audit: launchapp-dev/launchapp-nuxt

**Audit Date:** 2026-03-21
**Repository:** https://github.com/launchapp-dev/launchapp-nuxt
**Commit:** f74f735 (ao/task 196 #27)

## Executive Summary

The `launchapp-nuxt` repository shows **improved build status** compared to the previous audit, with the `@types/cookie` issue resolved. However, critical quality checks still fail with significant linting issues and Nuxt type resolution problems in the web app.

**Current Status:**
- ✓ **Build:** PASSED
- ✗ **Typecheck:** FAILED (Nuxt type resolution issues)
- ✗ **Lint:** FAILED (3271 errors, 2783 warnings)
- ⊘ **Test:** SKIPPED (no tests configured)

---

## Build Results

**Status:** ✓ PASSED
**Exit Code:** 0
**Duration:** ~18.33s

### Success Details

The build now completes successfully after the `@types/cookie` fix was merged in PR #27 (ao/task 196). All 14 packages built without errors:
- @repo/config, @repo/core, @repo/analytics, @repo/ui-kit, @repo/i18n
- @repo/billing, @repo/storage, @repo/database, @repo/email, @repo/ai
- @repo/auth, @repo/mcp, @repo/web, @repo/api

**Warnings (non-blocking):**
- Sourcemap warnings from `nuxt:module-preload-polyfill` plugin
- Sourcemap warnings from `@tailwindcss/vite:generate:build` plugin
- Turbo "no output files found for task @repo/web#build" warning

### Recommended Fixes

1. **Fix sourcemap issues:** Configure Vite to skip sourcemap generation for problematic plugins:
   ```typescript
   // nuxt.config.ts
   vite: {
     plugins: [tailwindcss()],
     build: {
       sourcemap: false
     }
   }
   ```

2. **Configure turbo output:** Add outputs key to @repo/web in turbo.json:
   ```json
   "@repo/web#build": {
     "outputs": [".output/**", ".nuxt/types/**"]
   }
   ```

---

## Typecheck Results

**Status:** ✗ FAILED
**Exit Code:** 1
**Duration:** ~9.39s

### Failure Details

Typecheck fails in `@repo/web` package with 150+ errors. The errors indicate **Nuxt type generation is not properly configured** for `vue-tsc`:

```
@repo/web:typecheck: app/pages/auth/login.vue(6,16): error TS2304: Cannot find name 'useRouter'.
@repo/web:typecheck: app/pages/auth/login.vue(7,15): error TS2304: Cannot find name 'useRoute'.
@repo/web:typecheck: app/pages/auth/login.vue(9,15): error TS2304: Cannot find name 'ref'.
@repo/web:typecheck: app/pages/auth/login.vue(10,18): error TS2304: Cannot find name 'ref'.
...
```

**Root Cause:** The `vue-tsc` typecheck cannot find Nuxt auto-imported composables (useRoute, useRouter, useAuth, ref, computed, navigateTo, etc.). This suggests:

1. The `.nuxt` types directory may not be properly included in type resolution
2. The `nuxt prepare` step may not have run to generate types
3. The tsconfig may be missing the Nuxt types reference

### Recommended Fixes

1. **Run nuxt prepare before typecheck:**
   ```json
   // apps/web/package.json
   "typecheck": "nuxt prepare && nuxt typecheck"
   ```

2. **Add explicit type references to tsconfig.json:**
   ```json
   {
     "extends": "./.nuxt/tsconfig.json",
     "compilerOptions": {
       "types": ["node"]
     }
   }
   ```

3. **Check if .nuxt/imports.d.ts exists and is properly generated**

---

## Linting Results

**Status:** ✗ FAILED
**Exit Code:** 1
**Duration:** ~7s

**Tool:** Biome 2.4.8
**Checks:** Linting and formatting

### Summary Statistics

| Category | Count |
|----------|-------|
| **Errors** | 3,271 |
| **Warnings** | 2,783 |
| **Infos** | 362 |
| **Files Checked** | 302 |

### Critical Issues (by category)

#### 1. Generated Files Included in Lint

**Problem:** Biome is checking generated files in `.nuxt/` directory:
- `.nuxt/types/app.config.d.ts`
- `.nuxt/imports.d.ts`

**Impact:** 6,396+ diagnostics from auto-generated files that should be excluded.

**Recommended Fix:**
```json
// biome.json
"files": {
  "includes": ["**"],
  "excludes": [
    "**/node_modules",
    "**/dist",
    "**/.turbo",
    "**/build",
    "**/.nuxt",          // Add this
    "**/.react-router",
    "**/coverage",
    "**/.vercel",
    "**/.cursor",
    "**/.history",
    "**/*.log",
    "**/pnpm-lock.yaml",
    "**/yarn.lock",
    "**/package-lock.json"
  ]
}
```

#### 2. Formatting Issues

**Problem:** Extensive formatting inconsistencies across the codebase:

- **JSON files:** Missing trailing newlines, array formatting
  - `PR_LIST.json` - needs full reformat
  - Multiple `tsconfig.json` files - references array formatting
  
- **TypeScript files:** Indentation inconsistencies in middleware files

**Examples:**
```
packages/ai/tsconfig.json - references should be single line:
  "references": [{ "path": "../config" }]
```

**Recommended Fix:**
```bash
pnpm lint:fix
```

#### 3. Linter Rule Violations

**Categories of errors:**
- `lint/suspicious/noExplicitAny` - Using `any` type instead of specific types
- Import sorting issues
- Unused variables (from previous audit)

### Recommended Fixes

1. **Fix biome.json excludes immediately:**
   Add `.nuxt/**` to excludes list

2. **Run automated fixes:**
   ```bash
   pnpm lint:fix
   ```

3. **Address remaining lint issues manually:**
   - Add explicit types instead of `any`
   - Fix unused variables
   - Sort imports correctly

4. **Commit formatting changes:**
   After fixes, commit to establish clean baseline

5. **Add CI gate:**
   ```yaml
   # .github/workflows/quality.yml
   lint:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4
       - uses: pnpm/action-setup@v4
       - run: pnpm install --frozen-lockfile
       - run: pnpm lint
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

1. **Set up test framework:** Vitest is already a dependency in some packages (e.g., @repo/core has `"test": "vitest run"`)

2. **Configure test scripts:**
   ```json
   "test": "turbo test",
   ```

3. **Add test configuration to packages with tests:**
   - Create `vitest.config.ts` files
   - Add `*.test.ts` files

4. **Target coverage:** Aim for >80% on core packages

---

## Summary of Findings

| Check | Status | Severity | Previous Status | Change |
|-------|--------|----------|----------------|--------|
| Build | PASSED | - | FAILED | ✓ Fixed |
| Typecheck | FAILED | CRITICAL | FAILED | ⚠ Same |
| Lint | FAILED | HIGH | FAILED | ⚠ Worse (3271 vs 167 errors) |
| Test | SKIPPED | MEDIUM | SKIPPED | ⚠ Same |

### Issues Fixed Since Last Audit
- ✓ `@types/cookie` dependency added to @repo/core
- ✓ Build now completes successfully

### New/Current Issues
- ✗ Nuxt type generation not working with vue-tsc
- ✗ Biome linting 3,271 errors (many from .nuxt files)
- ✗ No test infrastructure

---

## Recommended Priority Actions

### 🔴 CRITICAL (Block All Deploys)

1. **Fix Nuxt type generation for @repo/web**
   - Unblock: typecheck
   - Files: `apps/web/package.json`, `apps/web/tsconfig.json`
   - Add `nuxt prepare` before typecheck or fix .nuxt type resolution

2. **Exclude .nuxt from biome.json**
   - Unblock: lint (reduces ~6,000 diagnostics)
   - Files: `biome.json`
   - Add `"**/.nuxt/**"` to excludes

### 🟠 HIGH (Must Fix Before Deploy)

3. **Run pnpm lint:fix to resolve formatting issues**
   - Fix: remaining lint errors after excluding .nuxt
   - Files: Multiple JSON and TypeScript files
   - Estimated effort: 5-10 minutes + review

4. **Fix remaining lint rule violations**
   - Address `noExplicitAny` warnings
   - Sort imports correctly
   - Remove unused variables

### 🟡 MEDIUM (Before Next Release)

5. **Implement automated tests**
   - Add: Test infrastructure and baseline tests
   - Estimated effort: 2-4 hours
   - Type: Infrastructure

---

## Verification Steps

```bash
# 1. Ensure nuxt prepare generates types
cd apps/web
npx nuxt prepare
cd ../..

# 2. Run typecheck (should pass after fix)
pnpm typecheck

# 3. Fix biome excludes
# Add "**/.nuxt/**" to biome.json excludes

# 4. Run lint with fixes
pnpm lint:fix

# 5. Verify remaining lint issues
pnpm lint

# 6. Run build
pnpm build
```

---

## Environment Details

- **Node Version:** v22.17.0
- **pnpm Version:** 10.0.0
- **Package Manager:** pnpm workspace (monorepo)
- **Build Tool:** Turbo 2.8.20
- **Linter:** Biome 2.4.8
- **Dependencies Installed:** 1,110 packages
- **Nuxt Version:** 4.4.2

---

## Conclusion

The repository has made progress with the build now passing, but **typecheck and lint failures remain blocking issues**. The most impactful fixes are:

1. Fix Nuxt type generation to unblock typecheck
2. Exclude `.nuxt/` from biome to reduce lint noise
3. Run `pnpm lint:fix` to address formatting issues

Once these are resolved, the codebase will be in a better state for production deployment. Test infrastructure remains a medium-term goal.
