# launchpad-secrets

**Package:** `@launchpad/secrets`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-secrets (private)
**Language:** HTML (primary) / TypeScript
**Last pushed:** 2025-12-30
**Status:** Stable

## Purpose

Standalone secrets management SDK with AES-256-GCM encryption, secret versioning, and key rotation. Notably has zero runtime dependencies — uses only Node.js native `crypto` module. Designed for securely storing and retrieving application secrets with full version history.

## Tech Stack

- **Runtime:** Node.js / TypeScript (native crypto)
- **No external runtime dependencies** (zero-dependency)
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8
- **Dev dependency:** `@launchpad/db-engine` (integration tests)

## Key Dependencies

| Dependency | Role |
|---|---|
| *(none)* | Zero runtime dependencies |
| `@launchpad/db-engine` | (dev) DB-backed storage testing |

## API Surface

- `SecretsManager` — main class
- `InMemoryStorage` — in-process storage backend (testing)
- `set(key, value)` — store/update secret
- `get(key)` — retrieve current secret
- `getVersion(key, version)` — retrieve specific version
- `delete(key)` — remove secret
- `listVersions(key)` — list all versions
- `rotateKey(newKey)` — re-encrypt all secrets with new key
- AES-256-GCM encryption (random IV per secret)
- 32-byte encryption key (passed via env var)

## Maturity

Stable. Most recent work (Dec 2025) added Renovate config prioritizing security updates. Core encryption and versioning features appear complete. The zero-dependency approach with native crypto is a deliberate design choice for security and portability.

## Notes

- GitHub shows primary language as HTML — likely due to auto-generated docs or coverage reports in the repo
- Storage backends are pluggable — `InMemoryStorage` for tests, DB-backed via `@launchpad/db-engine` for production
- Key rotation re-encrypts all existing secrets — safe rotation without downtime
