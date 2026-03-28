#!/usr/bin/env bash
set -euo pipefail

REPO="launchapp-dev/invoicer"
MERGED=0
SKIPPED=0
FAILED=0

prs=$(gh pr list --repo "$REPO" --state open --json number,title,mergeable --jq '.[] | select(.mergeable == "MERGEABLE") | .number')

if [ -z "$prs" ]; then
  echo "No mergeable PRs found."
  exit 0
fi

for pr in $prs; do
  title=$(gh pr view "$pr" --repo "$REPO" --json title --jq '.title')
  task_id=$(echo "$title" | grep -oE '[0-9]+' | head -1)

  echo "--- PR #$pr: $title (TASK-$(printf '%03d' "$task_id")) ---"

  if gh pr merge "$pr" --repo "$REPO" --squash --delete-branch 2>&1; then
    echo "  MERGED"
    MERGED=$((MERGED + 1))

    if [ -n "$task_id" ]; then
      task_padded=$(printf 'TASK-%03d' "$task_id")
      ao --project-root "$(git rev-parse --show-toplevel)" task status --id "$task_padded" --status done 2>/dev/null || true
      echo "  $task_padded -> done"
    fi
  else
    echo "  FAILED to merge"
    FAILED=$((FAILED + 1))
  fi

  sleep 2
done

echo ""
echo "Summary: merged=$MERGED skipped=$SKIPPED failed=$FAILED"
