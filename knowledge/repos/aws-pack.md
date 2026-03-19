# aws-pack

> Claude Code plugin pack: AWS

## Purpose

AWS infrastructure operations — S3, Lambda, EC2, CloudWatch

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-17

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/cloudwatch-alarms` | View and manage CloudWatch alarms |
| `/cost-report` | Generate AWS cost and usage reports |
| `/ec2-instances` | List and manage EC2 instances |
| `/iam-audit` | Audit IAM roles, policies, and permissions |
| `/lambda-logs` | Tail and search Lambda function logs |
| `/s3-browse` | Browse S3 buckets and objects |
| `/security-groups` | Inspect and manage EC2 security groups |

## Subagents

| Agent | Purpose |
|-------|---------|
| `deployment-manager` | Orchestrate deployments across Lambda, EC2, and ECS |
| `infra-auditor` | Audit AWS infrastructure for security and cost issues |

## Installation

```
claude plugin add launchapp-dev/aws-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
