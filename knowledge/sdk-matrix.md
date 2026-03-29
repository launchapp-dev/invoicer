:
# LaunchApp Dev — SDK Consistency Matrix

**Last Updated**: 2026-03-29

## @repo/api Consistency Status

| Feature | launchapp-nextjs | launchapp-react-router | Status |
|---------|-----------------|------------------------|--------|
| Response helpers | ✅ | ✅ (synced PR #429) | Complete |
| Response helper tests | ✅ | ✅ | Complete |
| Rate limiting middleware | ✅ | ✅ | Complete |
| Observability module | ✅ | ✅ | Complete |
| - Metrics | ✅ | ✅ | Complete |
| - Sentry integration | ✅ | ✅ | Complete |
| - Tracing | ✅ | ✅ | Complete |
| Logger.ts | ❌ (removed) | ❌ (removed) | Superseded |

## Design System Consistency

| Component/Token | launchapp-nextjs | launchapp-react-router | ao-dashboard | Status |
|-----------------|-----------------|------------------------|--------------|--------|
| Tailwind v4 | ✅ | ✅ | ✅ | Complete |
| --la-* CSS tokens | ✅ | ✅ | ✅ | Complete |
| shadcn registry | ✅ | ✅ | ✅ | Complete |
| Midnight theme | ✅ | ✅ | ✅ | Complete |

## Database Consistency

| Aspect | Status | Notes |
|--------|--------|-------|
| Drizzle ORM | ✅ Consistent | All apps use Drizzle |
| SQLite | ✅ Consistent | All apps use SQLite |
| @repo/db | ⚠️ Partial | Some apps have local schema |
| Migrations | ⚠️ Manual | Require `pnpm db:push` after merges |

## Auth Consistency

| Aspect | Status | Notes |
|--------|--------|-------|
| Better Auth | ✅ Consistent | All apps use Better Auth |
| Session management | ✅ Consistent | Server-side sessions |

## Observability Consistency

| Aspect | launchapp-nextjs | launchapp-react-router | ao-dashboard | Status |
|--------|-----------------|------------------------|--------------|--------|
| Sentry | ✅ | ✅ | ❌ | Partial |
| Metrics | ✅ | ✅ | ❌ | Partial |
| Tracing | ✅ | ✅ | ❌ | Partial |
| Structured logging | ✅ | ✅ | ✅ (Rust) | N/A |

## Integration Consistency

| Integration | launchapp-nextjs | launchapp-react-router | Status |
|-------------|-----------------|------------------------|--------|
| Trigger.dev | ✅ | ✅ | Complete |
| Sentry | ✅ | ✅ | Complete |

## Quality Audit Status

| Repository | Last Audit | Status | Action Items |
|------------|------------|--------|--------------|
| launchapp-nextjs | 2026-03-24 | ✅ Good | None |
| launchapp-react-router | 2026-03-29 | ✅ Updated | None |
| ao-dashboard | 2026-03-29 | ✅ Active | Monitor stability |
