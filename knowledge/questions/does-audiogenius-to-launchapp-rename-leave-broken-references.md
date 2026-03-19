---
title: "Does the AudioGenius-ai to launchapp-dev org rename leave broken install paths and stale metadata across the ecosystem?"
priority: high
status: open
category: operations
source_files:
  - knowledge/repos/ao-plugin-packs-overview.md
  - knowledge/repos/renovate-config.md
  - knowledge/products/05-claude-code-plugin-packs.md
  - knowledge/repo-inventory.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The GitHub organization was renamed from `AudioGenius-ai` to `launchapp-dev`. As of 2026-03-19, `ao-skills` metadata was updated to reflect the new name. However, the newly documented repo catalog reveals multiple locations where the old name persists, potentially breaking installation paths and confusing users.

## What We Know

- The plugin packs overview documents install commands as `claude plugin add AudioGenius-ai/<pack-name>` — the old org name.
- The `claude-plugin-marketplace` (the index for all 15 packs) was originally set up under `AudioGenius-ai`.
- The `renovate-config` description field still references "AudioGenius-ai organization."
- All 15 plugin pack repos were created on 2026-03-16/17. Their `pack.toml` manifests, `README.md` install instructions, and `.claude-plugin` manifests may reference the old org name.
- GitHub automatically redirects org renames for git URLs, but `claude plugin add` commands and marketplace registry entries may not follow redirects.
- The `ao-skills` plugin was explicitly updated on 2026-03-19 to use `launchapp-dev`, suggesting the team is aware — but only one repo was fixed.

## What We Don't Know

- Does GitHub's org rename redirect work for `claude plugin add` commands, or does the plugin system resolve repos differently?
- How many of the 15 plugin pack repos have stale `AudioGenius-ai` references in their manifests?
- Are there npm package scopes, Docker images, or CI/CD configs that still reference the old org?
- Has anyone external attempted to install a pack and hit a broken path?

## Suggested Investigation

- Run a grep across all 15 plugin pack repos for "AudioGenius-ai" to find stale references.
- Test `claude plugin add AudioGenius-ai/<pack>` vs `claude plugin add launchapp-dev/<pack>` to see if redirects work.
- Check `marketplace.json` entries in `claude-plugin-marketplace` for old org references.
- Create a bulk-update task to fix all remaining references in one pass.

## Answer

_To be filled in by the team or an investigating agent._
