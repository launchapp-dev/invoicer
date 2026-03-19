# bluelight-poc

## Purpose
A proof-of-concept for an embeddable authentication and discount verification widget for Blue Light Card (BLC). The widget allows partner brands (e.g., Gymshark, JD Sports) to offer exclusive discounts to NHS and Emergency Services workers without redirecting users away from their shopping experience.

This is a **client project / POC**, not an internal platform product. It demonstrates the org's ability to build embeddable SaaS widgets for B2B clients.

## Repository
- **Repo**: launchapp-dev/bluelight-poc (private)
- **Description**: "Production-ready full-stack TypeScript monorepo for SaaS applications"
- **Last Pushed**: 2025-11-23

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces (standard launchapp-dev template)
- **Framework**: React Router v7, Shadcn UI, Tailwind CSS
- **Auth**: Auth0 (mock integration in POC)
- **Infra**: Pulumi (infrastructure as code with ECS/RDS deployment)
- **Database**: PostgreSQL via RDS Data API
- **Storage**: S3

## POC Components
1. **Partner Landing Page** (`/poc/landing-page`) — Gymshark-replica design showing BLC offer details
2. **Embeddable Widget** (`/poc/widget-demo`) — Standalone floating widget with:
   - Auth0 login/registration flows
   - UK mobile validation
   - BLC membership verification
   - Auto-generated discount code display
   - `/poc/combined` — landing page + widget integrated

## Key Features
- Zero-redirect design: users never leave partner website
- Official BLC branding (royal blue palette #002E87, #0033A0)
- Mobile responsive, animated floating trigger button
- Custom event system for cross-component widget triggering
- Multi-step registration with communication preferences

## Relationship to Other Products
- Built on the standard launchapp-dev monorepo template (same structure as launchapp.dev, mymoku.net, etc.)
- **Not related to bluelight-poc** ≠ `saas-template-launch-app-test` — they share the same template base but serve different purposes:
  - `bluelight-poc`: specific client POC for Blue Light Card
  - `saas-template-launch-app-test`: internal SaaS template iteration/testing
- Demonstrates the template's viability for client work

## Maturity / Status
**Archived / POC complete** — last pushed 2025-11-23. This appears to be a completed proof-of-concept delivered to or demonstrated for Blue Light Card. No active development.
