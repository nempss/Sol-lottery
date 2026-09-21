type QueryFn = (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;

export async function withDb<T>(_fn: (query: QueryFn) => Promise<T>): Promise<T | null> {
  return null;
}
