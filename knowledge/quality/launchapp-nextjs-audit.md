---
repo: launchapp-nextjs
date: "2026-03-21"
build_status: pass
test_status: pass (no tests configured)
lint_status: fail
typecheck_status: pass
---

# Quality Audit: launchapp-nextjs

## Summary

| Command | Status | Duration |
|---------|--------|----------|
| `pnpm install` | ✅ PASS | 0.9s |
| `pnpm build` | ✅ PASS | 32.3s |
| `pnpm typecheck` | ✅ PASS | 13.2s |
| `pnpm test` | ✅ PASS (placeholder) | 0.3s |
| `pnpm lint` | ❌ FAIL | 68.3s |

## Detailed Findings

### Build (PASS)
- Turbo monorepo with 16 packages builds successfully
- 14 tasks executed, 13 cached, 1 cache miss (`@repo/web`)
- Next.js 15.5.14 compiled successfully
- Warning: Multiple lockfiles detected (root + detected another in user home)
- 16 routes generated (9 static, 7 dynamic)

### Typecheck (PASS)
- All 26 typecheck tasks passed
- No TypeScript errors

### Test (PASS - No Tests Configured)
- `package.json` test script is a placeholder: `echo "No tests configured yet"`
- No actual test suite exists

### Lint (FAIL)
- Biome exits with code 1
- **Root cause**: `biome.json` does not exclude `.next/` build output directory
- 16,892 errors from minified build artifacts in `.next/` and JSON formatting issues
- Actual source code issues:
  - Import sorting issues in `packages/ui-kit/src/types/index.ts`
  - Import sorting issues in `packages/ui-kit/src/utils/cn.ts`
  - JSON formatting issues in `tsconfig.json` files across packages

## Configuration Issue

**`biome.json` missing `.next/` exclusion:**

```json
"files": {
  "includes": [
    "**",
    "!**/node_modules",
    "!**/dist",
    "!**/.turbo",
    "!**/build",       // ← Missing: !**/.next
    ...
  ]
}
```

## Recommended Fixes

### Critical: Add `.next/` to biome.json excludes
```json
"files": {
  "includes": [
    "**",
    "!**/node_modules",
    "!**/dist",
    "!**/.turbo",
    "!**/build",
    "!**/.next",       // ← ADD THIS
    "!**/.react-router",
    "!**/coverage",
    "!**/.vercel",
    "!**/.cursor",
    "!**/.history",
    "!**/*.log"
  ]
}
```

### Action Items
1. **[QUALITY] Add `.next/` exclusion to biome.json** - Fixes 16,000+ spurious lint errors from build output
2. **Run `pnpm lint:fix`** to auto-fix import sorting in `packages/ui-kit/src/`
3. **Run `pnpm lint:fix`** to auto-fix JSON formatting in `tsconfig.json` files
4. **Consider adding actual tests** - Current test script is a placeholder

## Environment
- Node.js: v22.17.0
- pnpm: 10.0.0
- Biome: 2.4.8
- Turbo: 2.8.20
- Next.js: 15.5.14
