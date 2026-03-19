# pr-review-responder

**Repo**: `launchapp-dev/pr-review-responder`
**Visibility**: Public
**Language**: JavaScript / Node.js
**Last updated**: 2025-05-19

## Purpose

Local automation task that watches for GitHub PR comments and passes them to Codex CLI for automated responses. Enables a lightweight AI PR review loop without a full CI pipeline.

## How It Works

Runs locally as a task/watcher. When a comment is added on a GitHub PR, it:
1. Receives the GitHub webhook event
2. Passes the comment content to Codex CLI
3. Codex generates a response
4. Posts the response back to the PR

## Dependencies on Org Products

None (standalone automation script).

## Relationship to Other Tools

- Simpler alternative to the PR review capabilities in `worktree-manager` and `ao-cli`
- Uses Codex CLI (not Claude) for responses

## Current Status: Maintenance

Created and last updated 2025-05-19. Simple utility, not actively developed.
