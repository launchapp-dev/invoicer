#!/usr/bin/env bash
set -euo pipefail

REPO="launchapp-dev/invoicer"
PROJECT_ROOT="$(git rev-parse --show-toplevel)"

# Get task ID from branch name (e.g., ao/task-001 -> TASK-001)
branch=$(git branch --show-current)
task_num=$(echo "$branch" | grep -oE '[0-9]+' | head -1)
if [ -z "$task_num" ]; then
  echo "ERROR: Cannot extract task number from branch: $branch"
  exit 1
fi
task_id=$(printf 'TASK-%03d' "$task_num")

# Find the PR for this branch
pr_json=$(gh pr list --repo "$REPO" --head "$branch" --state all --json number,state,reviews --limit 1 --jq '.[0]' 2>/dev/null || echo "null")

if [ "$pr_json" = "null" ] || [ -z "$pr_json" ]; then
  echo "ERROR: No PR found for branch $branch"
  exit 1
fi

pr_number=$(echo "$pr_json" | jq -r '.number')
pr_state=$(echo "$pr_json" | jq -r '.state')

echo "PR #$pr_number for $task_id — state: $pr_state"

# Case 1: Already merged
if [ "$pr_state" = "MERGED" ]; then
  echo "MERGED — marking $task_id as done"
  ao --project-root "$PROJECT_ROOT" task status --id "$task_id" --status done 2>/dev/null || true
  exit 0
fi

# Case 2: Closed without merge
if [ "$pr_state" = "CLOSED" ]; then
  echo "CLOSED without merge — $task_id stays as-is"
  exit 0
fi

# Case 3: Still open — check reviews
latest_review=$(gh pr reviews "$pr_number" --repo "$REPO" --json state --jq '.[-1].state' 2>/dev/null || echo "NONE")

echo "Latest review state: $latest_review"

if [ "$latest_review" = "APPROVED" ]; then
  echo "APPROVED — merging PR #$pr_number"
  if gh pr merge "$pr_number" --repo "$REPO" --squash --delete-branch 2>&1; then
    echo "MERGED — marking $task_id as done"
    ao --project-root "$PROJECT_ROOT" task status --id "$task_id" --status done 2>/dev/null || true
    exit 0
  else
    echo "MERGE FAILED (likely conflicts) — needs rebase"
    ao --project-root "$PROJECT_ROOT" queue enqueue --task-id "$task_id" --workflow-ref rebase-and-retry 2>/dev/null || true
    exit 0
  fi
fi

if [ "$latest_review" = "CHANGES_REQUESTED" ]; then
  echo "CHANGES REQUESTED — sending $task_id back for rework"
  ao --project-root "$PROJECT_ROOT" queue enqueue --task-id "$task_id" --workflow-ref rework 2>/dev/null || true
  exit 0
fi

# Case 4: No review at all — reviewer didn't do its job. Try to merge directly.
echo "NO REVIEW — attempting merge of PR #$pr_number"
if gh pr merge "$pr_number" --repo "$REPO" --squash --delete-branch 2>&1; then
  echo "MERGED — marking $task_id as done"
  ao --project-root "$PROJECT_ROOT" task status --id "$task_id" --status done 2>/dev/null || true
  exit 0
else
  echo "MERGE FAILED — queuing for rebase"
  ao --project-root "$PROJECT_ROOT" queue enqueue --task-id "$task_id" --workflow-ref rebase-and-retry 2>/dev/null || true
  exit 0
fi
