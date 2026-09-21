import { withDb } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const cached = await withDb(async (q) => {
    const r = await q(`select sol_usd, eur_usd, sol_eur from price_history order by ts desc limit 1`);
    return r.rows[0] ?? null;
  });
  if (cached && Number(cached.sol_eur) > 0) {
    return Response.json({ solEur: Number(cached.sol_eur), solUsd: Number(cached.sol_usd), source: "index" });
  }
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=eur,usd", { next: { revalidate: 30 } });
    const json = await res.json();
    return Response.json({ solEur: json.solana?.eur ?? 0, solUsd: json.solana?.usd ?? 0, source: "coingecko" });
  } catch {
    return Response.json({ solEur: 0, solUsd: 0, source: "unavailable" });
  }
}
