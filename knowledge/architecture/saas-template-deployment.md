---
title: "SaaS Template — Deployment Architecture"
product: saas-template
type: deployment
status: current
source_repos:
  - saas-template-launch-app-test
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How the SaaS template is deployed — local development with Docker Compose, production infrastructure via Pulumi on AWS, and CI/CD via GitHub Actions. The AO Agent Orchestrator automates PR creation and task execution.

## Diagram

```mermaid
graph TD
    subgraph "Local Development"
        DEV[pnpm dev<br/>Turborepo + dotenv]
        DOCKER[docker-compose.yml<br/>PostgreSQL local]
        DEV --> DOCKER
    end

    subgraph "CI/CD"
        GH[GitHub Actions]
        AO[AO CLI<br/>ao/task-* branches]
        AO -->|Creates PRs| GH
        GH -->|Build + Test| DEPLOY
    end

    subgraph "Infrastructure as Code"
        PULUMI[Pulumi<br/>infrastructure/pulumi/]
        SCRIPTS[Deploy Scripts<br/>infrastructure/scripts/]
        DEPLOY[Deploy Pipeline]
        PULUMI --> DEPLOY
        SCRIPTS --> DEPLOY
    end

    subgraph "AWS Production"
        ALB[Application Load Balancer]
        ECS[ECS / Container Service]
        RDS[(RDS PostgreSQL)]
        S3PROD[S3 Bucket<br/>File Storage]
        ALB --> ECS
        ECS --> RDS
        ECS --> S3PROD
    end

    subgraph "External SaaS"
        STRIPE[Stripe]
        RESEND[Resend]
        POSTHOG[PostHog]
    end

    DEPLOY --> ALB
    ECS --> STRIPE
    ECS --> RESEND
    ECS --> POSTHOG

    subgraph "Build Tooling"
        TURBO[Turborepo<br/>Build DAG]
        BIOME[Biome<br/>Lint + Format]
        VITE[Vite<br/>Bundle]
        VITEST[Vitest<br/>Tests]
    end
```

## Notes

- Local dev uses Docker Compose for PostgreSQL; the app runs via `pnpm dev` with Turborepo
- Production IaC is Pulumi with @pulumi/aws and @pulumi/awsx packages
- Infrastructure scripts handle deploy, health checks, and secrets generation
- AO CLI automates feature development: creates ao/task-* branches and auto-merges PRs
- Turborepo handles the build DAG with proper env var cache invalidation via globalEnv
- docker-compose.prod.yml available for production-like local testing
