#!/usr/bin/env node
// brain-fleet-mcp — MCP server for fleet monitoring and control across AO projects.
// Usage: node --experimental-strip-types server.ts [--config <path>]
//
// MONITORING TOOLS:
//   fleet.status      — health of all daemons (brain + template repos)
//   fleet.agents      — list active agents across all projects
//   fleet.queues      — queue stats for all projects
//   fleet.workflows   — active/recent workflow runs across all projects
//   fleet.prs         — open/merged PRs across all repos
//   fleet.tasks       — task counts by status across all projects
//
// CONTROL TOOLS:
//   fleet.daemon.start    — start daemon for a project
//   fleet.daemon.stop     — stop daemon for a project
//   fleet.daemon.restart  — restart daemon for a project
//   fleet.queue.enqueue   — queue a task in any project
//   fleet.task.create     — create task in any project
//   fleet.task.status     — update task status in any project
//
// Config: read project paths from fleet-config.json
// CLI: uses ao CLI with --project-root and gh CLI for PR queries
//
// Connect via MCP by adding to .mcp.json:
//   "brain-fleet": {
//     "command": "node",
//     "args": ["--experimental-strip-types", "<repo-root>/tools/brain-fleet-mcp/server.ts"]
//   }

import { execSync } from "node:child_process";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse config file
const args = process.argv.slice(2);
const configArg = args.indexOf("--config");
const configPath =
  configArg >= 0 ? args[configArg + 1] : path.join(__dirname, "fleet-config.json");

interface ProjectConfig {
  name: string;
  path: string;
}

interface FleetConfig {
  projects: ProjectConfig[];
}

let config: FleetConfig;
try {
  const configContent = readFileSync(configPath, "utf-8");
  config = JSON.parse(configContent);
} catch (e) {
  process.stderr.write(
    `Failed to read fleet config at ${configPath}: ${String(e)}\n`
  );
  process.exit(1);
}

// Utility function to execute commands safely
function execCommand(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (error) {
    return `Error executing command: ${String(error)}`;
  }
}

// Utility to run ao CLI commands
function runAoCLI(projectPath: string, args: string[]): object {
  const cmd = `ao ${args.join(" ")} --project-root "${projectPath}"`;
  const output = execCommand(cmd);
  try {
    return JSON.parse(output);
  } catch {
    return { raw: output };
  }
}

const server = new Server(
  { name: "brain-fleet", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "fleet.status",
      description: "Get health status of all daemons across all projects",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "fleet.agents",
      description:
        "List active agents across all projects with their current status",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "fleet.queues",
      description: "Get queue statistics for all projects",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "fleet.workflows",
      description: "Get active and recent workflow runs across all projects",
      inputSchema: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: 'Filter by status: running, completed, failed (optional)',
          },
          limit: {
            type: "number",
            description: "Max results per project (default 10)",
          },
        },
        required: [],
      },
    },
    {
      name: "fleet.prs",
      description: "Get open and recently merged PRs across all repos",
      inputSchema: {
        type: "object",
        properties: {
          state: {
            type: "string",
            description: 'Filter by state: open, closed, merged, all (default: open)',
          },
          limit: {
            type: "number",
            description: "Max results per repo (default 10)",
          },
        },
        required: [],
      },
    },
    {
      name: "fleet.tasks",
      description: "Get task count summaries by status across all projects",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "fleet.daemon.start",
      description: "Start daemon for a specific project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description:
              "Project name (must match fleet-config.json)",
          },
          pool_size: {
            type: "number",
            description: "Worker pool size (optional, default 4)",
          },
        },
        required: ["project"],
      },
    },
    {
      name: "fleet.daemon.stop",
      description: "Stop daemon for a specific project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description: "Project name",
          },
        },
        required: ["project"],
      },
    },
    {
      name: "fleet.daemon.restart",
      description: "Restart daemon for a specific project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description: "Project name",
          },
        },
        required: ["project"],
      },
    },
    {
      name: "fleet.queue.enqueue",
      description: "Queue a task in any project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description: "Project name",
          },
          task_id: {
            type: "string",
            description: "Task ID to enqueue",
          },
          workflow: {
            type: "string",
            description: "Workflow reference (optional)",
          },
        },
        required: ["project", "task_id"],
      },
    },
    {
      name: "fleet.task.create",
      description: "Create a new task in any project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description: "Project name",
          },
          title: {
            type: "string",
            description: "Task title",
          },
          description: {
            type: "string",
            description: "Task description (optional)",
          },
          priority: {
            type: "string",
            description: "Priority: critical, high, medium, low (optional)",
          },
        },
        required: ["project", "title"],
      },
    },
    {
      name: "fleet.task.status",
      description: "Update task status in any project",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            description: "Project name",
          },
          task_id: {
            type: "string",
            description: "Task ID",
          },
          status: {
            type: "string",
            description:
              "New status: backlog, todo, ready, in_progress, blocked, on_hold, done, cancelled",
          },
        },
        required: ["project", "task_id", "status"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: input } = req.params;

  // MONITORING TOOLS

  if (name === "fleet.status") {
    const statuses = config.projects.map((proj) => {
      const result = runAoCLI(proj.path, ["daemon", "status"]);
      return {
        project: proj.name,
        ...result,
      };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(statuses, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.agents") {
    const agents = config.projects.map((proj) => {
      const result = runAoCLI(proj.path, ["daemon", "agents"]);
      return {
        project: proj.name,
        ...(typeof result === "object" ? result : { raw: result }),
      };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(agents, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.queues") {
    const queues = config.projects.map((proj) => {
      const result = runAoCLI(proj.path, ["queue", "stats"]);
      return {
        project: proj.name,
        ...(typeof result === "object" ? result : { raw: result }),
      };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(queues, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.workflows") {
    const params = z
      .object({
        status: z.string().optional(),
        limit: z.number().optional().default(10),
      })
      .parse(input);

    const workflows = config.projects.map((proj) => {
      const args = ["workflow", "list", "--limit", String(params.limit)];
      if (params.status) {
        args.push("--status", params.status);
      }
      const result = runAoCLI(proj.path, args);
      return {
        project: proj.name,
        ...(typeof result === "object" ? result : { raw: result }),
      };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(workflows, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.prs") {
    const params = z
      .object({
        state: z.string().optional().default("open"),
        limit: z.number().optional().default(10),
      })
      .parse(input);

    const prs = config.projects.map((proj) => {
      const projName = proj.name.replace(/-/g, "_");
      const cmd = `gh pr list --repo samishukri/${projName} --state ${params.state} --limit ${params.limit} --json number,title,state,url`;
      const output = execCommand(cmd);
      try {
        const data = JSON.parse(output);
        return { project: proj.name, prs: data };
      } catch {
        return { project: proj.name, error: output };
      }
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(prs, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.tasks") {
    const tasks = config.projects.map((proj) => {
      const result = runAoCLI(proj.path, ["task", "stats"]);
      return {
        project: proj.name,
        ...(typeof result === "object" ? result : { raw: result }),
      };
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tasks, null, 2),
        },
      ],
    };
  }

  // CONTROL TOOLS

  if (name === "fleet.daemon.start") {
    const params = z
      .object({
        project: z.string(),
        pool_size: z.number().optional().default(4),
      })
      .parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const args = ["daemon", "start", "--pool-size", String(params.pool_size)];
    const result = runAoCLI(proj.path, args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.daemon.stop") {
    const params = z.object({ project: z.string() }).parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const result = runAoCLI(proj.path, ["daemon", "stop"]);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.daemon.restart") {
    const params = z.object({ project: z.string() }).parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const stopResult = runAoCLI(proj.path, ["daemon", "stop"]);
    const startResult = runAoCLI(proj.path, ["daemon", "start"]);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { stopped: stopResult, started: startResult },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "fleet.queue.enqueue") {
    const params = z
      .object({
        project: z.string(),
        task_id: z.string(),
        workflow: z.string().optional(),
      })
      .parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const args = ["queue", "enqueue", "--task-id", params.task_id];
    if (params.workflow) {
      args.push("--workflow-ref", params.workflow);
    }
    const result = runAoCLI(proj.path, args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.task.create") {
    const params = z
      .object({
        project: z.string(),
        title: z.string(),
        description: z.string().optional(),
        priority: z.string().optional(),
      })
      .parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const args = ["task", "create", "--title", params.title];
    if (params.description) {
      args.push("--description", params.description);
    }
    if (params.priority) {
      args.push("--priority", params.priority);
    }
    const result = runAoCLI(proj.path, args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  if (name === "fleet.task.status") {
    const params = z
      .object({
        project: z.string(),
        task_id: z.string(),
        status: z.string(),
      })
      .parse(input);

    const proj = config.projects.find((p) => p.name === params.project);
    if (!proj) {
      return {
        content: [
          {
            type: "text",
            text: `Project not found: ${params.project}`,
          },
        ],
        isError: true,
      };
    }

    const args = ["task", "status", "--id", params.task_id, params.status];
    const result = runAoCLI(proj.path, args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
