import { LAMPORTS_PER_SOL } from "./constants";
export function lamportsToSol(lamports: number | bigint, digits = 3) {
  return (Number(lamports) / LAMPORTS_PER_SOL).toLocaleString(undefined, { maximumFractionDigits: digits });
}
export function formatEur(cents: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
}
export function formatEurFromSol(sol: number, solEur: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(sol * solEur);
}
export function shortKey(key: string, size = 4) {
  if (key.length <= size * 2 + 1) return key;
  return `${key.slice(0, size)}…${key.slice(-size)}`;
}
export function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${String(h % 24).padStart(2, "0")}h`;
  return [h, m, sec].map((v) => String(v).padStart(2, "0")).join(":");
}
