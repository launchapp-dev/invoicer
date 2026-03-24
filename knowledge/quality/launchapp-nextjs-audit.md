---
repo: launchapp-nextjs
date: "2026-03-24"
build_status: fail
test_status: pass
lint_status: not_configured
typecheck_status: fail
---

# Quality Audit: launchapp-nextjs

## Summary

| Command | Status | Duration |
|---------|--------|----------|
| `pnpm install` | ✅ PASS | 29.7s |
| `pnpm build` | ❌ FAIL | 22.7s |
| `pnpm typecheck` | ❌ FAIL | ~20s |
| `pnpm test` | ✅ PASS | 7.3s |
| `pnpm lint` | ⚠️ NOT CONFIGURED | 0.1s |

## Critical Finding: TypeScript Build Failure

**Status**: ❌ **BUILD BROKEN** in `@repo/api` package

### Root Cause

Type mismatch in `packages/api/src/routes/organizations.ts` where `organizationResponseSchema` defines `createdAt`/`updatedAt` as `z.date()`, but Drizzle ORM returns ISO date strings. Hono's type-safe OpenAPI routes enforce strict type matching between the schema and returned data.

### Error Details

```
src/routes/organizations.ts(187,54): error TS2345: Argument of type ... is not assignable
  Type 'JSONRespondReturn<{ success: true; data: unknown; }, ...>' is not assignable to type 'TypedResponse<{ success: boolean; data: { organization: { id: string; name: string; slug: string; logo: string | null; createdAt: string; updatedAt: string; settings: {...} | null; }; }; }, 200, "json">'
    The types of '_data.data' are incompatible between these types
      Type 'JSONValue' is not assignable to type '{ organization: { id: string; ... }; }'
        Type 'null' is not assignable to type '{ organization: ... }'
```

**Affected routes**:
- `createOrganizationRoute` (line 187)
- `getOrganizationRoute` (line ~240)
- `updateOrganizationRoute` (line 307)

### Why This Happens

1. **Schema Definition**: `organizationResponseSchema` uses `z.date()` for timestamps
2. **Database Layer**: Drizzle ORM's `.returning()` provides ISO date strings (not Date objects)
3. **Type Safety**: `@hono/zod-openapi` validates response types against the OpenAPI schema at compile time
4. **Generic Helper**: The `success()` helper uses `data: unknown`, deferring type checking to the route handler

## PR Analysis

The 15 PRs merged since 2026-03-20 include:

| PR | Description | Likely Related? |
|----|-------------|-----------------|
| #225/#223 | Discord, Apple, Twitter OAuth (TASK-117) | No - auth changes |
| #221 | Vite 8.0.1 → 8.0.2 | No - dev tooling |
| #220 | rename forgetPassword → resetPassword | No - page fix |
| #217 | Biome fixes (TASK-401) | No - lint only |
| #216 | Hono 4.12.8 → 4.12.9 (TASK-411) | **Possible** - API framework upgrade |
| #215 | React 19.2.4 security docs (TASK-416) | No - documentation |
| #214 | TanStack Query 5.95.0 (TASK-417) | No - client-side |
| #213 | Node.js >=22 (TASK-415) | No - engine requirement |
| #212 | Cookie OOB fix (TASK-400) | No - security fix |
| #211 | tsconfig references fix | **Possible** - TypeScript config |
| #210 | Turbo task override removal (TASK-419) | No - build config |
| #209, #208 | ao/task-421, ao/task-422 | Unknown - need inspection |

**Most likely cause**: PR #216 (Hono upgrade to 4.12.9) or PR #211 (tsconfig references) introduced stricter type checking that surfaced this latent type mismatch.

## Lint Status

**Status**: ⚠️ **NOT CONFIGURED**

The `turbo.json` defines an empty lint task `"lint": {}`, and individual packages do not define lint scripts in their `package.json` files. Biome is available at the root but packages don't invoke it.

**Previous Issue Fixed**: PR #217 correctly added `!**/.next` to biome.json excludes, fixing the 16,000+ spurious lint errors from the previous audit.

## Environment

- Node.js: v22.17.0
- pnpm: 10.0.0
- Turbo: 2.8.20
- Hono: 4.12.9
- TypeScript: 5.9.3

## Recommended Fixes

### Critical: Fix Type Mismatch in organizations.ts

**Option 1**: Change schema to use string dates (recommended)
```typescript
const organizationResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullable(),
  createdAt: z.string(), // Changed from z.date()
  updatedAt: z.string(), // Changed from z.date()
  settings: z.object({...}).nullable(),
});
```

**Option 2**: Transform database results to Date objects
```typescript
return success(c, {
  organization: {
    ...org,
    createdAt: new Date(org.createdAt),
    updatedAt: new Date(org.updatedAt),
  }
});
```

### Medium: Configure Package-Level Lint Scripts

Add to each package's `package.json`:
```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write ."
  }
}
```

## Action Items

1. **[CRITICAL]** Fix `organizationResponseSchema` date type mismatch in `packages/api/src/routes/organizations.ts`
2. **[HIGH]** Verify Hono 4.12.9 compatibility with existing response schemas
3. **[MEDIUM]** Add lint scripts to all packages for consistent code quality
4. **[LOW]** Consider adding type-safe wrappers for `success()` helper with generic constraints

## Related Issues

- Previous audit: [launchapp-nextjs-audit.md (2026-03-21)](../launchapp-nextjs-audit-2026-03-21.md)
- PR #216: Hono 4.12.9 upgrade
- PR #211: tsconfig references fix
