#!/usr/bin/env node
// phase-task-prioritizer.ts — Evaluate AO backlog tasks against current phase goals
//
// Usage:
//   node --experimental-strip-types tools/phase-task-prioritizer.ts [--project-root <path>]
//
// Reads:
//   knowledge/vision.md          — product vision and phase definitions
//   knowledge/phases/current.md  — current phase status, goals, and success criteria
//
// Queries:
//   ao task list --status backlog  — all backlog tasks for the project
//
// Outputs:
//   JSON report to stdout with aligned, misaligned, missing tasks, and recommendations
//   Exit code 0 on success, 1 on error

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// ---- Types ----

interface PhaseGoal {
  id: string;
  description: string;
  keywords: string[];
}

interface AoTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  tags?: string[];
}

interface AlignedTask {
  task: AoTask;
  matchedGoals: string[];
  alignmentScore: number;
}

interface Recommendation {
  taskId: string;
  action: "promote" | "deprioritize" | "review" | "cancel";
  reason: string;
}

interface PrioritizerReport {
  generatedAt: string;
  phase: string;
  phaseStatus: string;
  summary: {
    totalBacklogTasks: number;
    alignedCount: number;
    misalignedCount: number;
    missingGoalsCount: number;
  };
  aligned: AlignedTask[];
  misaligned: AoTask[];
  missingGoals: PhaseGoal[];
  recommendations: Recommendation[];
}

// ---- File Helpers ----

function readKnowledgeFile(relativePath: string): string {
  const fullPath = path.join(REPO_ROOT, relativePath);
  try {
    return readFileSync(fullPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read ${fullPath}: ${String(err)}`);
  }
}

// ---- Phase Goal Extraction ----

function extractPhaseGoals(currentMd: string): { phase: string; status: string; goals: PhaseGoal[] } {
  const lines = currentMd.split("\n");

  const phaseMatch = currentMd.match(/^\*\*Current Phase\*\*:\s*(.+)$/m);
  const phase = phaseMatch ? phaseMatch[1].trim() : "Unknown Phase";

  const statusMatch = currentMd.match(/^\*\*Phase Status\*\*:\s*(.+)$/m);
  const phaseStatus = statusMatch ? statusMatch[1].replace(/[^\w\s:–—-]/g, "").trim() : "Unknown";

  const goals: PhaseGoal[] = [];

  // Extract from "Phase 2 Success Criteria" section
  const criteriaStart = lines.findIndex((l) => l.match(/^##\s.*success criteria/i));
  const nextSection = lines.findIndex(
    (l, i) => i > criteriaStart && criteriaStart >= 0 && l.startsWith("## ")
  );
  const criteriaEnd = nextSection > criteriaStart ? nextSection : lines.length;

  if (criteriaStart >= 0) {
    const criteriaLines = lines.slice(criteriaStart + 1, criteriaEnd);
    let goalIndex = 0;
    for (const line of criteriaLines) {
      const match = line.match(/^\d+\.\s+(?:\*\*)?(.+?)(?:\*\*)?\s*(?:—|-|–)\s*(.+)/);
      if (match) {
        goalIndex++;
        const label = match[1].trim();
        const detail = match[2].trim();
        goals.push({
          id: `criteria-${goalIndex}`,
          description: `${label}: ${detail}`,
          keywords: extractKeywords(`${label} ${detail}`),
        });
      }
    }
  }

  // Extract from "In Progress" milestones section
  const inProgressStart = lines.findIndex((l) => l.match(/in progress/i) && l.startsWith("#"));
  if (inProgressStart >= 0) {
    const inProgressEnd = lines.findIndex(
      (l, i) => i > inProgressStart && l.startsWith("## ")
    );
    const endIdx = inProgressEnd > inProgressStart ? inProgressEnd : lines.length;
    const milestoneLines = lines.slice(inProgressStart + 1, endIdx);
    let mIdx = 0;
    for (const line of milestoneLines) {
      const match = line.match(/^\s*-\s+\*\*(.+?)\*\*\s*(?:—|-|–)\s*(.+)/);
      if (match) {
        mIdx++;
        const label = match[1].trim();
        const detail = match[2].trim();
        goals.push({
          id: `milestone-${mIdx}`,
          description: `${label}: ${detail}`,
          keywords: extractKeywords(`${label} ${detail}`),
        });
      }
    }
  }

  // Fallback: extract from the vision section for current phase
  if (goals.length === 0) {
    const visionMatch = currentMd.match(/^## Vision\s*\n([\s\S]*?)(?=\n##)/m);
    if (visionMatch) {
      goals.push({
        id: "vision-1",
        description: visionMatch[1].trim(),
        keywords: extractKeywords(visionMatch[1]),
      });
    }
  }

  return { phase, status: phaseStatus, goals };
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "has", "have", "had", "will", "would", "could", "should", "may", "might",
    "all", "any", "via", "its", "it", "this", "that", "as", "per",
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))
    .filter((w, i, arr) => arr.indexOf(w) === i);
}

// ---- AO Task Query ----

function fetchBacklogTasks(projectRoot: string): AoTask[] {
  const cmd = `ao task list --status backlog --json --project-root "${projectRoot}"`;
  let raw: string;
  try {
    raw = execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    raw = e.stdout ?? "";
    if (!raw.trim()) {
      throw new Error(
        `ao task list failed: ${e.stderr ?? e.message ?? String(err)}`
      );
    }
  }

  try {
    const parsed = JSON.parse(raw.trim());
    if (Array.isArray(parsed)) return parsed as AoTask[];
    if (parsed.ok === true && Array.isArray(parsed.data)) return parsed.data as AoTask[];
    if (parsed.tasks && Array.isArray(parsed.tasks)) return parsed.tasks as AoTask[];
    return [];
  } catch {
    throw new Error(`Failed to parse ao task list output: ${raw.slice(0, 200)}`);
  }
}

// ---- Alignment Scoring ----

function scoreTaskAlignment(task: AoTask, goals: PhaseGoal[]): { matchedGoals: string[]; score: number } {
  const taskText = [task.title, task.description ?? "", ...(task.tags ?? [])]
    .join(" ")
    .toLowerCase();

  const matchedGoals: string[] = [];

  for (const goal of goals) {
    const matchCount = goal.keywords.filter((kw) => taskText.includes(kw)).length;
    const matchRatio = matchCount / Math.max(goal.keywords.length, 1);
    if (matchRatio >= 0.2 || matchCount >= 2) {
      matchedGoals.push(goal.id);
    }
  }

  const score = matchedGoals.length > 0
    ? Math.min(1.0, matchedGoals.length / goals.length + 0.2 * matchedGoals.length)
    : 0;

  return { matchedGoals, score };
}

function findMissingGoals(goals: PhaseGoal[], alignedTasks: AlignedTask[]): PhaseGoal[] {
  const coveredGoalIds = new Set(alignedTasks.flatMap((t) => t.matchedGoals));
  return goals.filter((g) => !coveredGoalIds.has(g.id));
}

function buildRecommendations(
  aligned: AlignedTask[],
  misaligned: AoTask[],
  missingGoals: PhaseGoal[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const item of aligned) {
    if (item.alignmentScore >= 0.5 && item.task.priority !== "high") {
      recommendations.push({
        taskId: item.task.id,
        action: "promote",
        reason: `Strongly aligned with phase goals (${item.matchedGoals.join(", ")}); consider elevating priority`,
      });
    }
  }

  for (const task of misaligned) {
    recommendations.push({
      taskId: task.id,
      action: "deprioritize",
      reason: "No alignment with current phase goals; defer until next phase or mark on_hold",
    });
  }

  for (const goal of missingGoals) {
    recommendations.push({
      taskId: `MISSING:${goal.id}`,
      action: "review",
      reason: `Phase goal "${goal.description.slice(0, 80)}" has no corresponding backlog task — create one`,
    });
  }

  return recommendations;
}

// ---- Main ----

function main(): void {
  const args = process.argv.slice(2);
  const rootArg = args.indexOf("--project-root");
  const projectRoot = rootArg >= 0 ? args[rootArg + 1] : REPO_ROOT;

  let visionMd: string;
  let currentMd: string;

  try {
    visionMd = readKnowledgeFile("knowledge/vision.md");
    currentMd = readKnowledgeFile("knowledge/phases/current.md");
  } catch (err) {
    process.stderr.write(`Error reading knowledge files: ${String(err)}\n`);
    process.exit(1);
  }

  const { phase, status: phaseStatus, goals } = extractPhaseGoals(currentMd);

  let tasks: AoTask[];
  try {
    tasks = fetchBacklogTasks(projectRoot);
  } catch (err) {
    process.stderr.write(`Error fetching tasks: ${String(err)}\n`);
    process.exit(1);
  }

  const aligned: AlignedTask[] = [];
  const misaligned: AoTask[] = [];

  for (const task of tasks) {
    const { matchedGoals, score } = scoreTaskAlignment(task, goals);
    if (matchedGoals.length > 0) {
      aligned.push({ task, matchedGoals, alignmentScore: Math.round(score * 100) / 100 });
    } else {
      misaligned.push(task);
    }
  }

  aligned.sort((a, b) => b.alignmentScore - a.alignmentScore);

  const missingGoals = findMissingGoals(goals, aligned);
  const recommendations = buildRecommendations(aligned, misaligned, missingGoals);

  const report: PrioritizerReport = {
    generatedAt: new Date().toISOString(),
    phase,
    phaseStatus,
    summary: {
      totalBacklogTasks: tasks.length,
      alignedCount: aligned.length,
      misalignedCount: misaligned.length,
      missingGoalsCount: missingGoals.length,
    },
    aligned,
    misaligned,
    missingGoals,
    recommendations,
  };

  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
}

main();
