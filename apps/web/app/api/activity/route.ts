import { NextResponse } from "next/server";
import { withDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await withDb(async (q) => {
    const r = await q(
      `select id, ts, kind, wallet, mint, round_id, summary, signature
       from activity_feed
       order by ts desc
       limit 50`
    );
    return r.rows;
  });
  return NextResponse.json({ source: rows ? "index" : "empty", items: rows ?? [] });
}
