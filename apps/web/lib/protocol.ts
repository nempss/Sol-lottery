import { DEFAULT_MIN_EUR_CENTS } from "./constants";

export type ProtocolSnapshot = {
  connected: boolean;
  initialized: boolean;
  vaultLamports: number;
  treasuryLamports: number;
  currentRound: number;
  eligible: number;
  minEurCents: number;
  lotteryEnabled: boolean;
  endTs: number;
  solEur: number;
};

export async function fetchSolEur(): Promise<number> {
  try {
    const res = await fetch("/api/price", { cache: "no-store" });
    if (!res.ok) return 0;
    const data = (await res.json()) as { solEur?: number };
    return data.solEur ?? 0;
  } catch {
    return 0;
  }
}

export async function fetchProtocol(): Promise<ProtocolSnapshot> {
  const solEur = await fetchSolEur();
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return {
    connected: true,
    initialized: false,
    vaultLamports: 0,
    treasuryLamports: 0,
    currentRound: 1,
    eligible: 0,
    minEurCents: DEFAULT_MIN_EUR_CENTS,
    lotteryEnabled: true,
    endTs: d.getTime(),
    solEur,
  };
}

export function requiredLamports(solEur: number, minEurCents: number) {
  if (!solEur) return 0;
  return Math.ceil((minEurCents / 100 / solEur) * 1_000_000_000);
}
