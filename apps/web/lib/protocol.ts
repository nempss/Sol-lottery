import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { RPC_URL, DEFAULT_MIN_EUR_CENTS } from "./constants";
import { lotteryConfigPda, lotteryVaultPda, platformPda, treasuryPda } from "./pda";
export type ProtocolSnapshot = { connected: boolean; initialized: boolean; vaultLamports: number; treasuryLamports: number; currentRound: number; eligible: number; minEurCents: number; lotteryEnabled: boolean; endTs: number; solEur: number; };
export function connection() { return new Connection(RPC_URL, "confirmed"); }
export async function fetchSolEur(): Promise<number> {
  try { const res = await fetch("/api/price", { cache: "no-store" }); const data = await res.json(); return data.solEur ?? 0; } catch { return 0; }
}
export async function fetchProtocol(): Promise<ProtocolSnapshot> {
  const solEur = await fetchSolEur();
  try {
    const cn = connection();
    const [vaultBal, treasBal] = await Promise.all([cn.getBalance(lotteryVaultPda()), cn.getBalance(treasuryPda())]);
    const d = new Date(); d.setUTCHours(24, 0, 0, 0);
    return { connected: true, initialized: true, vaultLamports: vaultBal, treasuryLamports: treasBal, currentRound: 1, eligible: 0, minEurCents: DEFAULT_MIN_EUR_CENTS, lotteryEnabled: true, endTs: d.getTime(), solEur };
  } catch {
    return { connected: false, initialized: false, vaultLamports: 0, treasuryLamports: 0, currentRound: 1, eligible: 0, minEurCents: DEFAULT_MIN_EUR_CENTS, lotteryEnabled: true, endTs: Date.now() + 14 * 3600_000, solEur };
  }
}
export async function fetchWalletSol(pubkey: PublicKey) { try { return await connection().getBalance(pubkey); } catch { return 0; } }
export function requiredLamports(solEur: number, minEurCents: number) {
  if (!solEur) return 0;
  return Math.ceil((minEurCents / 100 / solEur) * LAMPORTS_PER_SOL);
}
