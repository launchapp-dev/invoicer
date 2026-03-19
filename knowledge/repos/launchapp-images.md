# launchapp-images

## Purpose
An AI image generation SaaS application. Users can generate images via AI (Replicate API), with a credit-based system (free tier: 20 image generations/month). The app includes social post generation with image support, batch image generation (up to 10 at a time), and S3-backed image storage with signed URL access.

## Repository
- **Repo**: launchapp-dev/launchapp-images (private)
- **Last Pushed**: 2025-06-30

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces (project starter template)
- **Apps**: `apps/web`, `apps/native`
- **AI/Image Generation**: Replicate API
- **Storage**: S3 with presigned URLs
- **Auth**: Better-Auth
- **Database**: Drizzle ORM + PostgreSQL
- **Payments**: Stripe (payment + subscription settings in turbo.json env vars)
- **Mobile**: Expo + expo-dev, React Native debugger
- **MCP**: mobile-mcp, consult7, logs, expo-dev, react-native-debugger

## Key Features
- AI image generation via Replicate API
- Credit system (free: 20/month, paid tiers via Stripe)
- Batch image generation endpoint (`generate-multiple-images`, up to 10 per request)
- Image visibility management (public/private)
- Social post generation with image support
- Mobile app support

## Relationship to Other Products
- Built on the standard launchapp-dev project starter monorepo template
- Uses Better-Auth for authentication
- Integrates Stripe for credit-based billing — demonstrates the template's payment integration
- Shares structural similarity with mymoku.net (both use mobile-mcp and the same dev tooling)

## Maturity / Status
**Stalled / Early product** — last pushed 2025-06-30. Active feature development occurred (credit system, batch generation) but appears to have stopped before launch. No active commits since June 2025.
