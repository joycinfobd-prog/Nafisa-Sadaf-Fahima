import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __portfolioPgPool?: Pool;
  __portfolioDrizzle?: NodePgDatabase;
};

export function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function isDatabaseConfigured() {
  return getDatabaseUrl().length > 0;
}

function createPool(databaseUrl: string) {
  const isLocal = /localhost|127\.0\.0\.1/.test(databaseUrl);
  return new Pool({
    connectionString: databaseUrl,
    max: 1,
    // Fail fast so slow/unreachable databases never hold up API responses.
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 4_000,
    ssl: isLocal ? undefined : { rejectUnauthorized: process.env.PGSSL_STRICT === "true" },
  });
}

export function getPool() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;
  if (!globalForDb.__portfolioPgPool) {
    globalForDb.__portfolioPgPool = createPool(databaseUrl);
  }
  return globalForDb.__portfolioPgPool;
}

export function getDb() {
  const pool = getPool();
  if (!pool) return null;
  if (!globalForDb.__portfolioDrizzle) {
    globalForDb.__portfolioDrizzle = drizzle(pool);
  }
  return globalForDb.__portfolioDrizzle;
}
