"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { explorerAddress } from "@/lib/constants";
import { shortKey } from "@/lib/format";
export default function TokenPage() {
  const mint = useParams<{ mint: string }>().mint;
  const { connected } = useWallet();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [note, setNote] = useState<string | null>(null);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Token</h1>
        <p className="mt-3 font-mono text-xs"><a href={explorerAddress(mint)} target="_blank" rel="noreferrer">{shortKey(mint, 8)}</a></p>
      </div>
      <div className="card p-5">
        <div className="flex gap-2">
          {(["buy", "sell"] as const).map((s) => (
            <button key={s} className={`rounded-full px-4 py-1.5 text-sm capitalize ${side === s ? "bg-white text-ink" : "text-mute"}`} onClick={() => setSide(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary mt-5 w-full" onClick={() => setNote(connected ? `${side} routes through forge_core on the curve PDA.` : "Connect a wallet first.")}>{side}</button>
        {note && <p className="mt-3 text-sm text-mute">{note}</p>}
      </div>
    </div>
  );
}
