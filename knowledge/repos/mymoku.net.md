# mymoku.net

## Purpose
A full-stack real estate / local business discovery platform for the mymoku.net property site. The app combines property listings with local business search (using AI-powered chat), GIS map integration, and lifestyle scoring. It appears to be a production product site, likely a showcase of what's possible building on the launchapp-dev monorepo template stack.

## Repository
- **Repo**: launchapp-dev/mymoku.net (private)
- **Primary Language**: TypeScript
- **Last Pushed**: 2026-03-12

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces
- **Apps**:
  - `apps/web` — React Router v7, Shadcn UI, Radix UI, Tailwind CSS
  - `apps/native` — Expo + React Native
- **API**: Hono-based API server
- **Auth**: Better-Auth
- **Database**: Drizzle ORM + PostgreSQL
- **Storage**: S3 / presigned URLs
- **AI/Chat**: Business chat endpoint with specialized tools (searchBusinesses, findNearbyBusinesses, getBusinessDetails, etc.)
- **GIS**: Map view with location-based business search
- **MCP**: mobile-mcp, consult7, logs, expo-dev, react-native-debugger

## Key Features
- Business and property listings with AI-powered chat
- GIS/map integration with location scoring
- Push notifications (Firebase / web push)
- Image generation via Replicate API (20 free/month for users)
- RESO sync for MLS property data
- Mobile app with privacy policy / terms pages

## Relationship to Other Products
- Built on the standard launchapp.dev project starter monorepo template
- Uses Better-Auth for authentication
- Demonstrates Launchpad BaaS capabilities and the full-stack template pattern

## Maturity / Status
**Active development** — last pushed 2026-03-12, with active feature work on AI business chat, GIS display, and mobile features.
