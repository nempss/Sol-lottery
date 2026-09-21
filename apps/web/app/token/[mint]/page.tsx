"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { explorerAddress } from "@/lib/constants";
import { shortKey } from "@/lib/format";
import { DEMO_LAUNCHES } from "@/lib/demo-data";
import { BRAND_LOGO } from "@/lib/brand";
export default function TokenPage() {
  const mint = useParams<{ mint: string }>().mint;
  const meta = DEMO_LAUNCHES.find((t) => t.mint === mint);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [note, setNote] = useState<string | null>(null);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex items-center gap-3">
          <img src={meta?.image || BRAND_LOGO} alt="" className="h-14 w-14 rounded-2xl bg-white object-cover" />
          <div>
            <h1 className="text-3xl font-medium tracking-tight">{meta?.name ?? "Token"}</h1>
            <p className="font-mono text-xs text-mute">{meta?.symbol ?? shortKey(mint, 4)}</p>
          </div>
        </div>
        <p className="mt-3 font-mono text-xs"><a href={explorerAddress(mint)} target="_blank" rel="noreferrer">{shortKey(mint, 8)}</a></p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {meta?.website && <a className="link-quiet" href={meta.website} target="_blank" rel="noreferrer">Website</a>}
          {meta?.twitter && <a className="link-quiet" href={meta.twitter} target="_blank" rel="noreferrer">X</a>}
        </div>
      </div>
      <div className="card p-5">
        <div className="flex gap-2">
          {(["buy", "sell"] as const).map((s) => (
            <button key={s} className={`rounded-full px-4 py-1.5 text-sm capitalize ${side === s ? "bg-white text-ink" : "text-mute"}`} onClick={() => setSide(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary mt-5 w-full" onClick={() => setNote(`${side} is preview-only until programs are deployed.`)}>{side}</button>
        {note && <p className="mt-3 text-sm text-mute">{note}</p>}
      </div>
    </div>
  );
}
