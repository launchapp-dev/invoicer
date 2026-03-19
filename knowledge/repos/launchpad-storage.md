# launchpad-storage

**Package:** `@launchpad/storage`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-storage (private)
**Language:** TypeScript
**Last pushed:** 2026-01-04
**Status:** Stable

## Purpose

Standalone storage SDK providing a provider-agnostic interface for file storage operations. Supports AWS S3 and Google Cloud Storage with presigned URL generation, multi-tenant isolation, and upload progress tracking. Designed for independent use without the full BaaS stack.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Cloud providers:** AWS SDK v3, Google Cloud Storage
- **HTTP:** Hono (lightweight HTTP server)
- **Validation:** Zod
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `@aws-sdk/client-s3` | S3 operations |
| `@aws-sdk/lib-storage` | Multipart upload + progress tracking |
| `@aws-sdk/s3-request-presigner` | Presigned URL generation |
| `@google-cloud/storage` | GCS provider |
| `hono` + `@hono/node-server` | HTTP server adapter |
| `zod` | Schema validation |
| `@launchpad/db-engine` | (dev) DB integration testing |

## API Surface

- `StorageService` — main service class
- `S3StorageProvider` — AWS S3 implementation
- `GCSStorageProvider` — Google Cloud Storage implementation (inferred from dep)
- `InMemoryStorageProvider` — testing mock
- File upload with optional progress callbacks
- Presigned URL generation (upload & download)
- File download / delete / list
- Metadata management interface
- MIME type detection and file validation utilities
- Multi-tenant path scoping

## Maturity

Stable. Most recent work (Jan 2026) added upload progress tracking using `@aws-sdk/lib-storage`. Core multi-cloud storage abstraction is complete.

## Notes

- Google Cloud Storage is also supported (dep present) though README only shows S3 examples
- Includes Hono — likely has an optional HTTP server mode for serving files directly
