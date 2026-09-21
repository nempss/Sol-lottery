"use client";
import { FormEvent, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
type Fields = { name: string; ticker: string; description: string; image: string; website: string; twitter: string; telegram: string; };
const EMPTY: Fields = { name: "", ticker: "", description: "", image: "", website: "", twitter: "", telegram: "" };
export default function LaunchPage() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<string | null>(null);
  function set<K extends keyof Fields>(key: K, value: string) { setFields((f) => ({ ...f, [key]: value })); }
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!connected) { setVisible(true); return; }
    if (!fields.name || !fields.ticker) { setStatus("Name and ticker are required."); return; }
    setStatus("Programs are not initialized on this cluster yet. Deploy with anchor deploy then retry.");
  }
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-medium tracking-tight">Launch a coin</h1>
      <p className="mt-2 text-sm text-mute">Classic SPL token, 6 decimals, 1B supply on the curve.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-xs text-mute">Name<input className="field mt-1" value={fields.name} onChange={(e) => set("name", e.target.value)} /></label>
        <label className="block text-xs text-mute">Ticker<input className="field mt-1 uppercase" maxLength={10} value={fields.ticker} onChange={(e) => set("ticker", e.target.value.toUpperCase())} /></label>
        <label className="block text-xs text-mute">Description<textarea className="field mt-1 min-h-24" value={fields.description} onChange={(e) => set("description", e.target.value)} /></label>
        <button className="btn-primary w-full" type="submit">{connected ? "Pay fee and launch" : "Connect to launch"}</button>
        {status && <p className="text-sm text-mute">{status}</p>}
      </form>
    </div>
  );
}
