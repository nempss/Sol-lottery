"use client";
import { FormEvent, useState } from "react";
import { BRAND_LOGO } from "@/lib/brand";

type Fields = {
  name: string;
  ticker: string;
  description: string;
  image: string;
  website: string;
  twitter: string;
};

const EMPTY: Fields = {
  name: "",
  ticker: "",
  description: "",
  image: "",
  website: "",
  twitter: "",
};

export default function LaunchPage() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<string | null>(null);
  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.ticker) {
      setStatus("Name and ticker are required.");
      return;
    }
    setStatus("Preview only. Image, website, and X are stored with launch metadata when programs go live.");
  }
  const preview = fields.image.trim() || BRAND_LOGO;
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-medium tracking-tight">Launch a coin</h1>
      <p className="mt-2 text-sm text-mute">Add a picture, website, and X. Classic SPL token on the curve.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <img src={preview} alt="" className="h-20 w-20 rounded-2xl bg-white object-cover" />
          <label className="block flex-1 text-xs text-mute">
            Picture URL
            <input className="field mt-1" value={fields.image} onChange={(e) => set("image", e.target.value)} placeholder="https://" />
          </label>
        </div>
        <label className="block text-xs text-mute">Name<input className="field mt-1" value={fields.name} onChange={(e) => set("name", e.target.value)} /></label>
        <label className="block text-xs text-mute">Ticker<input className="field mt-1 uppercase" maxLength={10} value={fields.ticker} onChange={(e) => set("ticker", e.target.value.toUpperCase())} /></label>
        <label className="block text-xs text-mute">Description<textarea className="field mt-1 min-h-24" value={fields.description} onChange={(e) => set("description", e.target.value)} /></label>
        <label className="block text-xs text-mute">Website<input className="field mt-1" value={fields.website} onChange={(e) => set("website", e.target.value)} placeholder="https://" /></label>
        <label className="block text-xs text-mute">X<input className="field mt-1" value={fields.twitter} onChange={(e) => set("twitter", e.target.value)} placeholder="https://x.com/" /></label>
        <button className="btn-primary w-full" type="submit">Preview launch</button>
        {status && <p className="text-sm text-mute">{status}</p>}
      </form>
    </div>
  );
}
