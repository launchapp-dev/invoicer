# create-launchapp

**Repo**: `launchapp-dev/create-launchapp`
**Visibility**: Public
**Language**: TypeScript / Node.js
**Last updated**: 2025-07-12

## Purpose

CLI scaffolding tool to bootstrap a new LaunchApp project from the command line. Clones the `launchapp-lite` template and optionally sets up environment variables.

## Usage

```bash
npx create-launchapp my-app --install
```

## Options

| Option | Description |
|--------|-------------|
| `--branch <branch>` | Clone a specific branch (default: main) |
| `--install` | Run pnpm install after cloning |
| `--repo <url>` | Alternative git repository to clone |
| `--worktree` | Create using `git worktree` instead of normal clone |
| `--create-env` | Generate a basic `.env` file after cloning |

## Environment Setup

Interactively configures:
- Push notification provider
- Payments (Stripe) configuration
- Mobile (Expo) configuration

Generates `.env` (and optionally `mobile/.env`) files.

## Dependencies on Org Products

- Wraps / bootstraps `launchapp-lite` template
- Planned: `add-plugin` command for installing LaunchApp plugins

## Current Status: Active

Last updated 2025-07-12. Simple utility, stable for its purpose.
