import { NextResponse } from "next/server";
import { withDb } from "@/lib/db";
import { DEMO_LAUNCHES } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await withDb(async (q) => {
    const r = await q(
      `select mint, creator, name, symbol, uri, website, twitter, telegram,
              created_at, graduated
       from token_launches
       order by created_at desc nulls last
       limit 50`
    );
    return r.rows;
  });
  if (rows && rows.length) {
    return NextResponse.json({
      source: "index",
      items: rows.map((row) => ({ ...row, image: row.uri })),
    });
  }
  if (process.env.NEXT_PUBLIC_CLUSTER === "mainnet-beta") {
    return NextResponse.json({ source: "empty", items: [] });
  }
  return NextResponse.json({
    source: "demo",
    items: DEMO_LAUNCHES.map((t) => ({
      mint: t.mint,
      creator: "",
      name: t.name,
      symbol: t.symbol,
      image: t.image,
      uri: t.image,
      website: t.website ?? "",
      twitter: t.twitter ?? "",
      telegram: "",
      created_at: t.createdAt,
      graduated: false,
    })),
  });
}
