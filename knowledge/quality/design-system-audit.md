---
repo: design-system
date: 2026-03-20
build_status: pass
test_status: fail
lint_status: fail
typecheck_status: pass
---

# Quality Audit: design-system

**Audit Date:** 2026-03-20T04:36Z
**Repository:** https://github.com/launchapp-dev/design-system
**Branch:** master
**Commit:** Latest cloned (shallow clone)
**Environment:** Node v22.17.0, npm 10.9.2

## Build & Quality Status Summary

| Check | Status | Notes |
|-------|--------|-------|
| `npm install` | ✅ PASS | 445 packages installed, 1 critical vulnerability detected in audit |
| `npm run build` | ✅ PASS | tsup build succeeded with no errors |
| `npm run typecheck` | ✅ PASS | TypeScript compilation successful |
| `npm run lint` | ❌ FAIL | ESLint not found in node_modules (missing devDependency) |
| `npm test` | ❌ FAIL | No test script defined in package.json |

## Critical Findings

### 1. ❌ Missing ESLint Configuration (BLOCKING LINT)

**Severity:** CRITICAL
**Issue:** `npm run lint` fails with error: `eslint: command not found`

The `package.json` defines a lint script that calls ESLint, but ESLint is not listed as a devDependency:
```json
"lint": "eslint src/",
```

However, `devDependencies` in `package.json` does not include `eslint`.

**Impact:**
- Lint infrastructure is completely broken
- Code quality checks cannot run in CI/CD
- Matches GitHub issues: #98, #97, #83

**Reproduction:**
```
npm install
npm run lint
# Error: sh: eslint: command not found
```

**Recommended Fix:**
- Add ESLint and related packages to devDependencies
- Example: `npm install --save-dev eslint eslint-config-next`
- Create or update `.eslintrc.json` configuration

---

### 2. ❌ No Testing Infrastructure

**Severity:** CRITICAL
**Issue:** `npm test` fails with: `npm error Missing script: "test"`

There is no test framework installed or configured. The `package.json` has no `test` script.

**Impact:**
- Zero test coverage for design-system components
- Breaking changes in Radix UI dependencies will go undetected
- No regression testing before releases
- Matches GitHub issues: #99, #85

**Recommended Fix:**
- Install testing framework (Jest, Vitest, or testing-library)
- Add test script to package.json
- Create test files in `src/` directory
- Add test coverage monitoring

---

### 3. ⚠️ Critical Next.js Security Vulnerabilities

**Severity:** CRITICAL (Security)
**Location:** `apps/docs/node_modules/next`
**Affected Versions:** next 0.9.9 - 15.5.13

**npm audit** reports **13 critical/high severity CVEs** in Next.js:

1. **GHSA-3h52-269p-cp9r**: Information exposure in Next.js dev server due to lack of origin verification
2. **GHSA-g5qg-72qw-gw5v**: Cache Key Confusion for Image Optimization API Routes
3. **GHSA-4342-x723-ch2f**: Improper Middleware Redirect Handling Leads to SSRF
4. **GHSA-xv57-4mr9-wg8v**: Content Injection Vulnerability for Image Optimization
5. **GHSA-qpjv-v59x-3qc4**: Race Condition to Cache Poisoning
6. **GHSA-mwv6-3258-q52c**: Denial of Service with Server Components
7. **GHSA-5j59-xgg2-r9c4**: Denial of Service with Server Components (Incomplete Fix Follow-Up)
8. **GHSA-9g9p-9gw9-jx7f**: DoS via Image Optimizer remotePatterns configuration
9. **GHSA-h25m-26qc-wcjf**: HTTP request deserialization DoS when using React Server Components
10. **GHSA-f82v-jwr5-mffw**: Authorization Bypass in Middleware
11. **GHSA-ggv3-7p47-pfv8**: HTTP request smuggling in rewrites
12. **GHSA-3x4c-7xq6-9pq8**: Unbounded next/image disk cache growth

**Impact:**
- Production deployments using `apps/docs` are vulnerable to multiple attack vectors
- Matches GitHub issues: #100, #84

**Recommended Fix:**
```bash
npm audit fix --force  # Will upgrade to next@14.2.35
```
- OR manually update `apps/docs/package.json` to use a patched Next.js version (14.2.35+)
- Run full regression testing after upgrade

---

## Build System Analysis

### Project Structure
- **Type:** Monorepo with npm workspaces
- **Workspaces:** `apps/*`, `packages/*`
- **Primary Package:** `@launchapp/design-system` (Radix UI component library)
- **Secondary Apps:** Storybook documentation (`apps/docs` with Next.js)

### Build Pipeline
1. **Install:** npm (no lock-in to pnpm despite mono-repo conventions)
2. **Build Tool:** tsup (for component library bundling)
3. **Storybook:** v10.3.0 for component documentation
4. **TypeScript:** Compilation checks enabled
5. **CSS:** Tailwind CSS + PostCSS

### Dependencies of Concern
- **Radix UI:** 25+ packages (well-maintained, but dependency surface is large)
- **Tanstack React Table:** v8.21.3
- **React:** v18.3.1 (peer dependency allows v18-19)
- **Next.js:** v0.9.9 to v15.5.13 (VULNERABLE, see critical findings)

---

## Quality Infrastructure Gaps

All 7 open quality/security issues (#83-#101) are reproducible:

| Issue # | Title | Status | Reproducible |
|---------|-------|--------|--------------|
| #101 | No CI/CD quality gates | OPEN | ✅ YES |
| #100 | Critical Next.js CVEs | OPEN | ✅ YES |
| #99  | No testing infrastructure | OPEN | ✅ YES |
| #98  | ESLint missing from devDeps | OPEN | ✅ YES |
| #97  | ESLint missing from devDeps (dup) | OPEN | ✅ YES |
| #85  | No test suite | OPEN | ✅ YES |
| #84  | Critical Next.js vulnerability | OPEN | ✅ YES |
| #83  | Lint pipeline broken | OPEN | ✅ YES |

---

## Recommendations

### Immediate (P0 - Blocking Releases)

1. **Fix ESLint** (Issues #98, #97, #83)
   - Add `eslint` and `@next/eslint-config-next` (if used) to devDependencies
   - Commit and tag for QA verification

2. **Fix Next.js Vulnerabilities** (Issues #100, #84)
   - Run `npm audit fix --force` in `apps/docs/`
   - OR manually update to `next@14.2.35` or later
   - Test Storybook/docs generation against new version
   - Update Chromatic integration if applicable

3. **Add CI/CD Quality Gates** (Issue #101)
   - Add GitHub Actions workflow: `npm run build && npm run lint && npm run typecheck`
   - Block merges on lint/typecheck failures
   - Add `npm audit --audit-level=critical` check

### Short-term (P1 - Quality)

4. **Add Testing Infrastructure** (Issues #99, #85)
   - Install testing library: `npm install --save-dev vitest @testing-library/react`
   - Add `"test": "vitest"` to package.json
   - Create initial test suite for core components
   - Set up coverage reporting

5. **Document Dependency Review Process**
   - Establish policy for Radix UI version upgrades
   - Integrate dependabot for automated PRs + version pinning

---

## Conclusion

The design-system **builds and typechecks successfully**, which is healthy for a UI component library. However, **critical gaps in linting, testing, and security** prevent production-ready releases:

- **No lint infrastructure** means code quality issues slip through
- **No test suite** means visual regressions and breaking changes go undetected
- **Unpatched Next.js CVEs** mean the Storybook deployment is a security risk

All findings align with existing open GitHub issues. Addressing P0 blockers (ESLint + Next.js fixes) should unlock CI/CD quality gates and enable test infrastructure in short order.

**Audit completed:** 2026-03-20 04:36:12 UTC
