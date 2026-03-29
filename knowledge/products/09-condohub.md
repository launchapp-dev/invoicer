# CondoHub

> Modern condominium management platform — visitor management, i18n, built with Next.js and @launchapp/design-system. Powered by AO.

## Purpose

CondoHub is a SaaS condominium management platform connecting residents, board members, property managers, and security staff in a single system. It provides visitor management, maintenance requests, amenity booking, financial transparency, and community communication — all with full internationalization support for diverse condo communities.

The platform is built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build, demonstrating rapid full-stack development with AI agents.

## Maturity: Active Development (v0.1.0)

Created on 2026-03-28. Very active development with 19 PRs in the first 24 hours. All core features being built in parallel by AO agents.

**Recent milestone (2026-03-29)**: Auth system stabilized (signup/login working), visitor management functional, i18n infrastructure complete with 8 languages.

## Visibility: Public

Open source repository demonstrating AO capabilities.

---

## Repository

### `condohub` (public)
- **Type**: Next.js 15 application
- **Description**: Modern condominium management platform
- **Stack**: Next.js 15, TypeScript, Tailwind CSS v4, better-auth, Drizzle ORM, SQLite, next-intl
- **Version**: 0.1.0
- **Created**: 2026-03-28
- **Last pushed**: 2026-03-29T15:19:14Z
- **Primary language**: TypeScript (99.2%)

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with server components |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **UI Components** | @launchapp/design-system | shadcn registry components |
| **Auth** | better-auth | Email/password + OAuth |
| **Database** | SQLite (dev), PostgreSQL (prod) | Data persistence |
| **ORM** | Drizzle ORM | Type-safe database operations |
| **i18n** | next-intl | Internationalization (8 languages) |
| **Forms** | React Hook Form + Zod | Form state and validation |
| **Icons** | Lucide React | Icon library |
| **Notifications** | Sonner | Toast notifications |
| **QR Codes** | qrcode | Visitor pass generation |
| **Dates** | date-fns | Date manipulation |
| **Package Manager** | pnpm | Dependency management |

---

## Core Features

### 1. Authentication & Multi-Tenancy
- Email/password signup/login via Better Auth
- OAuth: Google, GitHub
- Role-based access: resident, board_member, admin, security, maintenance
- Multi-tenant: each condo building is a "community"
- Invite system for residents

### 2. Visitor Management System (Implemented)
- Pre-registration of expected visitors
- QR code pass generation
- Walk-in registration at security gate
- Visitor types: Guest, Delivery, Contractor, Service Provider
- Check-in/check-out tracking
- Visitor history per unit
- Delivery logging

### 3. Internationalization (i18n)
- **8 supported languages**: English, Spanish, Portuguese, French, Arabic (RTL), Chinese (Simplified), Japanese, Korean
- Full RTL support for Arabic
- Locale-aware routing (`/en/dashboard`, `/es/dashboard`)
- Per-user language preference
- Date/time/currency localization

### 4. Community Management
- Community setup wizard for first-time admins
- Unit directory (occupied, owner vs tenant)
- Building structure definition (towers, floors, units)
- Community rules document management
- Board member roster

### 5. Announcements & Communication
- Rich text announcements by category
- Pinning important announcements
- Read receipts
- Comments on announcements

### 6. Maintenance Requests
- Resident submission with photos
- Category and urgency assignment
- Status lifecycle tracking
- Assignment to maintenance staff

### 7. Financial Transparency
- Monthly fee tracking
- Payment history per unit
- Budget overview
- Expense categorization
- Financial reports export

### 8. Amenity Booking
- Calendar-based booking
- Time slot configuration
- Booking rules and limits
- Waitlist for popular slots

### 9. Document Repository
- Document upload and organization
- Categories: Rules, Minutes, Reports, Insurance, Legal, Forms
- Version history
- Access control

### 10. Role-Based Dashboards
- **Resident**: My unit, visitors, maintenance requests, announcements, bookings
- **Admin**: Community stats, pending approvals, financial summary
- **Security**: Today's visitors, check-in/out, delivery log, blacklist

---

## Project Structure

```
src/
  app/
    [locale]/                    # i18n locale routing
      page.tsx                   # Marketing landing page
      (auth)/
        login/page.tsx
        signup/page.tsx
      dashboard/page.tsx         # Role-based dashboard
      visitors/                  # Visitor management
      announcements/             # Community announcements
      maintenance/               # Maintenance requests
      amenities/                 # Amenity booking
      finances/                  # Financial overview
      documents/                 # Document repository
      community/                 # Community info
      settings/                  # User/community settings
  components/
    ui/                          # shadcn registry components
  lib/
    utils.ts                     # cn() utility
    auth.ts                      # Auth configuration
  db/
    schema.ts                    # Drizzle schema
  messages/
    {en,es,pt,fr,ar,zh,ja,ko}.json  # Translation files
```

---

## Dependencies

### External Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.1 | Framework |
| react | 19.2.4 | UI library |
| better-auth | ^1.5.6 | Authentication |
| drizzle-orm | ^0.45.2 | Database ORM |
| next-intl | ^4.8.3 | Internationalization |
| react-hook-form | ^7.72.0 | Form management |
| zod | ^4.3.6 | Validation |
| tailwindcss | ^4 | Styling |
| @libsql/client | ^0.17.2 | SQLite client |
| qrcode | ^1.5.4 | QR code generation |
| date-fns | ^4.1.0 | Date utilities |
| lucide-react | ^1.7.0 | Icons |

### Org Product Dependencies
| Product | Usage |
|---------|-------|
| @launchapp/design-system | UI components via shadcn registry |
| better-auth | Authentication (org's open-source library) |

---

## AO Configuration

CondoHub is fully managed by AO (Agent Orchestrator):

```
.a/
  config.json         # AO configuration (agent_runner_token: null)
  memory/             # Run memory storage
  workflows/          # Workflow definitions
```

**AO Status**: Active development with continuous agent orchestration.

---

## Recent Development Activity

### Open PRs (as of 2026-03-29)
| PR | Title | Status |
|----|-------|--------|
| #18 | feat(community): add unit-directory and unit-card components [TASK-063] | Open |
| #8 | feat(onboarding): add community onboarding wizard for new admins [TASK-022] | Open |
| #3 | ao/task-016 | Open |

### Recent Merges
| PR | Title | Merged |
|----|-------|--------|
| #17 | ao/task-051 | 2026-03-29 |
| #15 | feat(onboarding): build community setup wizard [TASK-030] | 2026-03-29 |
| #14 | fix(i18n): add missing auth.common.or translation [TASK-027] | 2026-03-29 |
| #13 | feat(documents): build documents page [TASK-028] | 2026-03-29 |
| #12 | fix(auth): add Better Auth required tables [TASK-024] | 2026-03-28 |
| #11 | fix(i18n): add missing auth.common.loading translation [TASK-025] | 2026-03-28 |
| #10 | fix(auth): implement complete login form [TASK-019] | 2026-03-28 |
| #9 | feat(finances): build complete finances page [TASK-023] | 2026-03-28 |

### Recent Commits
- Fix reviewer: handle missing/empty PRs
- QA: test results 2026-03-28 - Auth APIs fixed, BUG-015 found
- Multiple run memory updates from planner, PO, reconciler

---

## Build & Development

```bash
pnpm install
pnpm dev          # Development server on :3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm db:push      # Push schema to database
pnpm db:migrate   # Run migrations
pnpm db:setup     # Setup database
```

---

## Product Context

CondoHub represents a new category for the launchapp-dev org: **AO-built SaaS products**. Unlike the BaaS platform or templates, CondoHub is a complete vertical SaaS application built entirely through AI agent orchestration.

Key differentiators:
- First major i18n-first product in the org
- Demonstrates AO's ability to build complex, multi-role applications
- Showcases the @launchapp/design-system in a real-world application
- Built in record time (functional MVP in ~24 hours of agent time)

---

## Non-Goals (v1)

- No payment processing (fees tracked, not collected)
- No automated email (in-app notifications only)
- No multi-building management
- No smart home integration
- No accounting features
- No resident-to-resident chat
- No native mobile app (responsive web only)
