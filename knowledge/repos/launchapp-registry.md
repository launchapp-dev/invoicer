# launchapp-registry

## Purpose
Intended as the package registry for LaunchApp — "the place where packages will be stored for the launch app registry." The concept is to host modules and apps that can be distributed through a LaunchApp-specific package registry, similar to npm but for LaunchApp templates/components.

## Repository
- **Repo**: launchapp-dev/launchapp-registry (private)
- **Description**: "The place where the packages will be stored for the launch app registry"
- **Last Pushed**: 2025-06-23

## Structure
The repo contains only a minimal monorepo scaffold:
- `README.md` — basic description
- `package.json` — named "launchapp.dev" (same template root)
- `pnpm-workspace.yaml`
- `turbo.json`

No actual registry implementation exists yet — this is a placeholder/scaffold.

## Relationship to Other Products
- Conceptually related to the LaunchApp Templates product line (launchapp-lite, launchapp-saas-template)
- Would serve as distribution infrastructure for templates and component packages
- Potentially the future home for distributing Claude Code plugin packs and/or template modules

## Maturity / Status
**Abandoned / Placeholder** — last pushed 2025-06-23, with only a skeleton monorepo scaffold and no registry implementation. The concept has not been developed further. Effectively dormant.
