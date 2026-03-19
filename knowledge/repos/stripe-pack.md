# stripe-pack

> Claude Code plugin pack: Stripe

## Purpose

Stripe payment flows, webhook debugging, subscription management

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/create-checkout` | Create a Stripe Checkout session |
| `/customers` | List and inspect Stripe customers |
| `/payments` | View and search payment intents and charges |
| `/subscriptions` | Manage customer subscriptions and plans |
| `/webhook-debug` | Inspect and replay Stripe webhook events |

## Subagents

| Agent | Purpose |
|-------|---------|
| `payment-debugger` | Diagnose failed payments, disputes, and webhook delivery issues |

## Installation

```
claude plugin add launchapp-dev/stripe-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
