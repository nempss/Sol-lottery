type QueryFn = (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
export async function withDb<T>(fn: (query: QueryFn) => Promise<T>): Promise<T | null> {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const pg = await import("pg");
    const pool = new pg.Pool({ connectionString: url, max: 2 });
    try { return await fn((sql, params = []) => pool.query(sql, params)); } finally { await pool.end(); }
  } catch { return null; }
}
