"use client";
import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/format";
export function Countdown({ endTs }: { endTs: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  return <span className="font-mono tabular-nums text-white">{formatCountdown(endTs - now)}</span>;
}
