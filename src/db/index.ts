import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DB_PATH = "./invoicer.db";

let client = new Database(DB_PATH);

function reconnect(): void {
  try {
    client.close();
  } catch {}
  client = new Database(DB_PATH);
}

function isDbMovedError(err: unknown): boolean {
  return (
    err instanceof Error &&
    "code" in err &&
    (err as { code: string }).code === "SQLITE_READONLY_DBMOVED"
  );
}

const EXEC_METHODS = new Set(["run", "get", "all", "iterate"]);

function withReconnect(sql: string, stmt: Database.Statement): Database.Statement {
  return new Proxy(stmt, {
    get(target, prop) {
      const val = Reflect.get(target, prop, target);
      if (typeof prop === "string" && EXEC_METHODS.has(prop) && typeof val === "function") {
        return (...args: unknown[]) => {
          try {
            return (val as (...a: unknown[]) => unknown).apply(target, args);
          } catch (err) {
            if (isDbMovedError(err)) {
              reconnect();
              const fresh = client.prepare(sql);
              const freshMethod = Reflect.get(fresh, prop, fresh);
              return (freshMethod as (...a: unknown[]) => unknown).apply(fresh, args);
            }
            throw err;
          }
        };
      }
      return typeof val === "function" ? (val as (...a: unknown[]) => unknown).bind(target) : val;
    },
  });
}

const clientProxy = new Proxy(client, {
  get(_target, prop) {
    if (prop === "prepare") {
      return (sql: string) => withReconnect(sql, client.prepare(sql));
    }
    const val = Reflect.get(client, prop, client);
    return typeof val === "function" ? (val as (...a: unknown[]) => unknown).bind(client) : val;
  },
});

export const db = drizzle(clientProxy, { schema });
