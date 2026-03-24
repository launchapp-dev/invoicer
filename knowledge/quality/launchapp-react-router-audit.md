---
repo: launchapp-react-router
date: 2026-03-24T08:50:00Z
build_status: pass
test_status: pass
lint_status: pass
---

# Quality Audit Report: launchapp-react-router

**Audit Date:** 2026-03-24
**Audited Commit:** bbd5ee6 (merge of PR #399 - ao/task-667 Dockerfile fix)
**Related PRs:**
- PR #397 (merged 2026-03-24 08:11Z): Dockerfile fix (remove stale flags, add missing push)
- PR #396 (merged 2026-03-24 07:21Z): Polar SDK bump 0.46.5 → 0.46.6
- PR #395 (merged 2026-03-24 07:28Z): React Router ecosystem v7.13.2 upgrade

## Summary

| Check | Status | Duration | Exit Code |
|-------|--------|----------|-----------|
| Install | ✅ Pass | 18.6s | 0 |
| Build | ✅ Pass | 71.8s | 0 |
| Test | ✅ Pass | 13.2s | 0 |
| Lint | ✅ Pass | 2.1s | 0 |

**Overall Status:** ✅ PASS — All quality checks successful

## Detailed Results

### Install
- **Command:** `pnpm install`
- **Exit Code:** 0
- **Time:** 18.6 seconds
- **Notes:** 842 packages installed successfully. Build script warnings for core-js, esbuild, protobufjs (requires `pnpm approve-builds` for security).

### Build
- **Command:** `pnpm build` (via Turbo)
- **Exit Code:** 0
- **Time:** 71.8 seconds
- **Packages Built:** 16 packages
- **Notes:**
  - All 16 packages built successfully
  - Client build: 530 modules transformed, built in 4.07s
  - SSR build: 119 modules transformed, built in 1.56s
  - Deprecation warnings: `esbuild` option deprecated in favor of `oxc` (non-blocking)
  - Plugin timing warnings for react-router plugins (42% in dot-server, informational only)

### Test
- **Command:** `pnpm test` (via Turbo + Vitest)
- **Exit Code:** 0
- **Time:** 13.2 seconds
- **Results:**
  - **@repo/core:** 2 files, 22 tests passed
  - **@repo/config:** 2 files, 8 tests passed
  - **@repo/billing:** 2 files, 12 tests passed
  - **@repo/api:** 8 files, 44 tests passed
  - **@repo/auth:** 2 files, 10 tests passed
  - **web:** 1 file, 6 tests passed
  - **Total:** 102 tests passed across 17 test files
- **Notes:** Experimental SQLite warnings from @repo/auth (expected, non-blocking)

### Lint
- **Command:** `pnpm lint:biome`
- **Exit Code:** 0
- **Time:** 2.1 seconds
- **Files Checked:** 197 files
- **Issues Found:** 0
- **Notes:** Clean codebase, no linting violations

## Findings

### ✅ Strengths
1. **Clean build pipeline** — All 16 packages in the monorepo build without errors
2. **Comprehensive test coverage** — 102 tests across core packages
3. **No lint violations** — Biome reports zero issues across 197 files
4. **Recent dependency upgrades stable** — React Router v7.13.2 and Polar SDK 0.46.6 integration successful

### ⚠️ Non-Critical Observations
1. **Deprecation warnings** — React Router plugin using deprecated `esbuild` option; recommend migration to `oxc`
2. **Build script approvals** — Some dependencies (core-js, esbuild, protobufjs) have blocked build scripts pending approval
3. **Plugin timing** — React Router build spends 42% time in dot-server plugin (may be optimizable)

## Recommended Actions

| Priority | Action | Reason |
|----------|--------|--------|
| Low | Migrate from `esbuild` to `oxc` option | Addresses deprecation warnings |
| Low | Run `pnpm approve-builds` if trusted | Allows blocked build scripts to run |
| Low | Profile react-router plugin timings | Potential build time optimization |

## Conclusion

The `launchapp-react-router` repository is in **excellent health**. All quality gates pass successfully. The recent PR burst (Dockerfile fixes, Polar SDK bump, React Router upgrade) has not introduced any regressions. No GitHub issues required for quality concerns.
