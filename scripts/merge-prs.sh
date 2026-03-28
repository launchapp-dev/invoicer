#!/usr/bin/env bash
set -euo pipefail

REPO="launchapp-dev/invoicer"
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
QUEUED=0
SKIPPED=0

prs=$(gh pr list --repo "$REPO" --state open --json number,title --jq '.[].title')

if [ -z "$prs" ]; then
  echo "No open PRs found."
  exit 0
fi

while IFS= read -r title; do
  task_num=$(echo "$title" | grep -oE '[0-9]+' | head -1)
  [ -z "$task_num" ] && continue
  task_id=$(printf 'TASK-%03d' "$task_num")

  already_queued=$(ao --project-root "$PROJECT_ROOT" queue list --json 2>/dev/null | grep -c "$task_id" || true)
  if [ "$already_queued" -gt 0 ]; then
    echo "SKIP $task_id — already in queue"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo "QUEUE $task_id for review"
  ao --project-root "$PROJECT_ROOT" queue enqueue --task-id "$task_id" --workflow-ref pr-reviewer 2>/dev/null || true
  QUEUED=$((QUEUED + 1))
done <<< "$prs"

echo ""
echo "Summary: queued=$QUEUED skipped=$SKIPPED"
