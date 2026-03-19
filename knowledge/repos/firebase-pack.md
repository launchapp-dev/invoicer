# firebase-pack

> Claude Code plugin pack: Firebase

## Purpose

Firebase integration — Firestore, Auth, Cloud Functions, Hosting, Storage

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-17

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/auth-users` | List and manage Firebase Auth users |
| `/deploy-functions` | Deploy Cloud Functions to Firebase |
| `/emulator` | Start and manage Firebase local emulators |
| `/firestore-browse` | Browse and query Firestore collections |
| `/hosting-deploy` | Deploy static assets to Firebase Hosting |
| `/security-rules` | View and validate Firestore/Storage security rules |
| `/storage-manage` | Manage files in Firebase Storage |

## Subagents

| Agent | Purpose |
|-------|---------|
| `function-debugger` | Debug Cloud Function errors and cold start issues |
| `security-rules-reviewer` | Audit Firestore and Storage security rules for vulnerabilities |

## Installation

```
claude plugin add launchapp-dev/firebase-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
