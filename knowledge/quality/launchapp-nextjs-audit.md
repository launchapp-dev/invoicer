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
| `pnpm install` | ✅ PASS | 0.27s |
| `pnpm build` | ✅ PASS | 23.4s |
| `pnpm typecheck` | ✅ PASS | 3.1s |
| `pnpm test` | ✅ PASS (placeholder) | 0.2s |
| `pnpm lint` | ❌ FAIL | 64.5s |

## Detailed Findings

### Build (PASS)
- Turbo monorepo with 16 packages builds successfully
- 14 tasks executed, 13 cached, 1 cache miss (`@repo/web`)
- Next.js 15.5.14 compiled successfully
- Warning: Multiple lockfiles detected (root + detected another in user home)
- 22 routes generated (16 static, 6 dynamic)

### Typecheck (PASS)
- All 26 typecheck tasks passed
- No TypeScript errors

### Test (PASS - No Tests Configured)
- `package.json` test script is a placeholder: `echo "No tests configured yet"`
- No actual test suite exists

### Lint (FAIL)
- Biome exits with code 1
- **Root cause**: `biome.json` does not exclude `.next/` build output directory
- 16,741 formatting errors from minified build artifacts in `.next/`
- 165 errors in actual source code:
  - Formatting inconsistencies (imports, JSX multiline wrapping)
  - 1 unused import: `Button` in `apps/web/src/app/dashboard/billing/page.tsx`
  - 1 `<img>` usage instead of `next/image` in `apps/web/src/app/dashboard/settings/security/page.tsx`

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
2. **Remove unused `Button` import** in `apps/web/src/app/dashboard/billing/page.tsx:4`
3. **Replace `<img>` with `<Image />`** in `apps/web/src/app/dashboard/settings/security/page.tsx:347`
4. **Consider adding actual tests** - Current test script is a placeholder

## Environment
- Node.js: v22.17.0
- pnpm: 10.0.0
- Biome: 2.4.8
- Turbo: 2.8.20
- Next.js: 15.5.14
