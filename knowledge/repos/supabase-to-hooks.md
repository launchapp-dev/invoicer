# supabase-to-hooks

**Repo**: `launchapp-dev/supabase-to-hooks`
**Visibility**: Public
**Language**: TypeScript
**Package**: `supabase-to-hooks`
**License**: MIT
**Last updated**: 2025-04-10

## Purpose

CLI tool that automatically generates typed React Query hooks from a Supabase `database.types.ts` file. Targets teams using Supabase who want a structured, strongly-typed data-fetching layer via React Query instead of raw Supabase client calls.

## Tech Stack

- TypeScript / Node.js
- TanStack Query (React Query)
- Supabase JS client

## Generated Output

```
output-directory/
├── index.ts              # Re-exports
├── base-types.ts         # Common types
├── enums.ts              # Generated enums
├── functions/            # RPC function hooks (useQuery + useMutation per function)
├── storage/              # Supabase Storage hooks
└── [table_name]/
    ├── types.ts          # Row, Insert, Update, FilterParams types
    ├── hooks.ts          # CRUD hooks (useTable, useTableList, useTableCreate, etc.)
    └── relations.ts      # Foreign-key relationship types for joined queries
```

## Key Features

- CRUD hooks for every table (Get, GetById, Create, Update, Delete)
- RPC function hooks (excludes private `_` functions)
- Relationship types from foreign keys (`with` option for joins)
- Supabase Storage hooks
- Full React Query options passthrough
- Support for custom primary key column names

## CLI Usage

```bash
npx supabase-to-hooks --input ./lib/database.types.ts --output ./lib/database
```

## Dependencies on Org Products

None. Standalone tool for Supabase users. Conceptually adjacent to `@launchpad/db-sdk`.

## Current Status: Maintenance

Last updated 2025-04-10. No recent activity. Useful for Supabase-based projects.
