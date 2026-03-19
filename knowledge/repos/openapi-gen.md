# openapi-gen

**Repo**: `launchapp-dev/openapi-gen`
**Visibility**: Public
**Language**: TypeScript
**Package**: `openapi-gen` v0.0.5
**License**: MIT
**Last updated**: 2025-06-04

## Purpose

CLI code generator that produces type-safe TypeScript API clients from OpenAPI 3.0+ specifications. Generates Zod schemas for runtime validation and TanStack Query (React Query) hooks for data fetching.

## Tech Stack

- TypeScript
- Zod (schema validation)
- TanStack Query / React Query
- Prettier (code formatting)

## Generated Output Structure

```
generated/
├── models/           # Zod schemas + TypeScript types per OpenAPI schema
├── endpoints/        # API client classes grouped by OpenAPI tags
├── hooks/            # React Query hooks (optional, --no-hooks to skip)
│   └── queryKeys.ts  # Query key factories for cache management
├── ApiClient.ts      # Base HTTP client with Zod validation
└── index.ts
```

## CLI Usage

```bash
# Generate from local spec
openapi-gen generate -i ./api-spec.yaml -o ./src/api

# Generate from URL
openapi-gen gen -i https://api.example.com/openapi.json -o ./src/api

# Skip hooks
openapi-gen gen -i ./spec.json -o ./src/api --no-hooks
```

## OpenAPI Support

- All primitive types, formats (email, uuid, date-time)
- Enums, unions (oneOf, anyOf), intersections (allOf)
- Reference resolution ($ref)
- Path/query parameters, request bodies, multiple response types

## Dependencies on Org Products

None (standalone). Could be used to generate clients for `launchpad-server` API endpoints.

## Current Status: Early / Maintenance (v0.0.5)

Last updated 2025-06-04. Very early version, no updates in 9+ months.
