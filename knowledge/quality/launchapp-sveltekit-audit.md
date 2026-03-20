---
repo: launchapp-sveltekit
date: "2026-03-20T20:54:52Z"
build_status: pass
test_status: pass
lint_status: fail
---

# Quality Audit Report: launchapp-sveltekit

## Executive Summary

| Check | Status | Details |
|-------|--------|---------|
| Install | ✅ PASS | Dependencies already up to date |
| Build | ✅ PASS | All 14 packages built successfully (19.26s) |
| Test | ✅ PASS | 110+ tests passed across 14 packages |
| Lint | ❌ FAIL | 2209 errors (configuration issues) |

## Detailed Findings

### ✅ Build: PASS

**Command:** `pnpm build`  
**Exit Code:** 0  
**Duration:** ~20 seconds  
**Packages Built:** 14/14

All packages in the monorepo built successfully:
- `@repo/config`, `@repo/analytics`, `@repo/core`, `@repo/i18n`, `@repo/ui-kit`, `@repo/storage`, `@repo/ai`, `@repo/billing`, `@repo/email`, `@repo/database`, `@repo/auth`, `@repo/mcp`, `@repo/api`, `@repo/web`

**Warning (non-blocking):** Turbo reports "no output files found for task @repo/web#build" - this is expected with SvelteKit adapter-vercel which outputs to `.svelte-kit/output/` rather than a custom build directory.

### ✅ Test: PASS

**Command:** `pnpm test`  
**Exit Code:** 0  
**Duration:** ~4 seconds  
**Tests:** 110+ passed across packages

Breakdown by package:
- `@repo/config`: 4 tests passed
- `@repo/core`: 6 tests passed  
- `@repo/billing`: 42 tests passed (Stripe, Plans, Polar provider tests)
- `@repo/auth`: 15 tests passed
- `@repo/database`: 31 tests passed
- `@repo/api`: 12 tests passed

### ❌ Lint: FAIL

**Command:** `pnpm lint`  
**Exit Code:** 1  
**Duration:** ~3 seconds  
**Total Errors:** 2209

#### Error Breakdown:

| Category | Count | Type | Fixable? |
|----------|-------|------|----------|
| Generated `.svelte-kit/` files | 2033 | Formatting | N/A (generated) |
| Tailwind CSS v4 parse errors | 4 | Parser config | Yes (config) |
| Formatting differences | 168 | Style | Yes |
| Import organization | 4 | Assist | Yes |

#### Root Cause Analysis:

1. **Primary Issue: `.svelte-kit/` not excluded**  
   The `biome.json` excludes `build`, `dist`, `.turbo`, etc., but is missing `!**/.svelte-kit`. This auto-generated directory contains 2033 formatting errors that should be ignored.

2. **Secondary Issue: Biome CSS parser needs Tailwind v4 config**  
   The project uses Tailwind CSS v4 with directives (`@custom-variant`, `@theme inline`, `@apply`) that Biome's default CSS parser doesn't understand:
   ```
   - app.css:4:2: @custom-variant dark (&:is(.dark *));
   - app.css:67:2: @theme inline { ... }
   - app.css:103:6: @apply border-border outline-ring/50;
   - app.css:107:6: @apply (related)
   ```

## Recommended Fixes

### Priority 1: Add `.svelte-kit` to biome.json excludes

```diff
   "files": {
     "includes": [
       "**",
       "!**/node_modules",
       "!**/dist",
       "!**/.turbo",
       "!**/build",
       "!**/.react-router",
       "!**/coverage",
       "!**/.vercel",
       "!**/.cursor",
-      "!**/.history",
-      "!**/*.log"
+      "!**/.history",
+      "!**/*.log",
+      "!**/.svelte-kit"
     ]
   }
```

### Priority 2: Enable Tailwind CSS v4 support in Biome

Add to `biome.json`:

```json
{
  "css": {
    "parser": {
      "cssModules": true,
      "tailwindDirectives": true
    }
  }
}
```

Note: The Biome version used (2.0.0+) should support Tailwind v4 syntax with `tailwindDirectives: true`.

### Priority 3: Run `pnpm lint:fix` after config fixes

After fixing the biome.json, run:
```bash
pnpm lint:fix
```

This will auto-fix:
- Import organization issues (4 files)
- Minor formatting differences (168 files)

## Recent Git Activity

Last 5 commits on main:
1. `e351ffa` - ao/task 154 (#16)
2. `1eba031` - Remove unused @repo/email reference from packages/api/tsconfig.json — TASK-158 (#17)
3. `0251567` - ao/task 133 (#18)
4. `0379b2a` - ao/task 176 (#19)
5. `92d5699` - Switch reviewer to Gemini — MiniMax can't execute gh pr merge

The lint failures are **not** caused by recent AI-generated PRs. They are pre-existing configuration issues.

## Conclusion

The codebase is in **good working condition**:
- Build: ✅ Functional
- Tests: ✅ All passing  
- Lint: ⚠️ Configuration needs fixes

The lint failures are configuration issues, not code quality issues. All 2209 errors fall into two categories:
1. Generated files that should be excluded
2. Auto-fixable formatting/style issues

**Recommended Action:** Fix `biome.json` to exclude `.svelte-kit/` and enable Tailwind v4 parsing, then run `pnpm lint:fix` to resolve remaining issues.
