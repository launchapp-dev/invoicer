# launchapp.dev

## Purpose
The main launchapp.dev marketing and product site. This is the primary web presence for the LaunchApp brand. The repo hosts a full-stack monorepo including the web app, a React Native mobile app, and a landing/marketing app — all sharing common packages.

Based on the structure, this appears to be both the deployed marketing site at launchapp.dev AND a reference implementation of the full-stack project starter template that other repos fork from.

## Repository
- **Repo**: launchapp-dev/launchapp.dev (private)
- **Last Pushed**: 2026-03-20T01:18:04Z

## Tech Stack
- **Monorepo**: Turborepo + pnpm (v10.11.0) workspaces
- **Apps**:
  - `apps/web` — React Router v7, Shadcn UI, Radix UI, Tailwind CSS
  - `apps/native` — Expo + NativeWind + Expo Router
  - `apps/landing` — Marketing and landing page application
- **API**: Hono-based server (`packages/api`) + Zodios/TanStack Query hooks
- **Auth**: Better-Auth (`packages/auth`)
- **Database**: Drizzle ORM + migrations (`packages/database`)
- **Email**: Resend integration (`packages/email`)
- **Push Notifications**: Firebase/web push (`packages/push-notifications`)
- **Storage**: S3 presigned URLs (`packages/storage`)
- **Infrastructure**: Pulumi (ECS/RDS deployment)
- **Tooling**: Biome, TypeScript 5.8, turbo

## Key Scripts
- `openapi:generate` — generates OpenAPI spec and Orval client hooks
- `infra:up` — deploys infrastructure via Pulumi
- `create:admin` — creates admin user

## Relationship to Other Products
- This is the **canonical template** — mymoku.net, launchapp-landing-v2, launchapp-images, bluelight-poc, and launchpad all appear to have forked from or share this project starter structure
- Uses Better-Auth (org-maintained auth library)
- Likely the deployment target for launchapp.dev marketing site
- The ECS deployment suggests production infrastructure on AWS

## Recent Activity
- **Latest commit** (2026-03-20): chore(deps): bump better-auth from 1.2.12 to 1.3.26 + auto-fix linting
- Ongoing dependency maintenance and active development
- Continued infrastructure deployment and template maintenance

## Maturity / Status
**Active / Stable** — last pushed 2026-03-20. Active infrastructure deployment. Serves as both the live marketing site and the template baseline for other org products.
