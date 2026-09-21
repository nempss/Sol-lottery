"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchProtocol, fetchWalletSol, requiredLamports, type ProtocolSnapshot } from "./protocol";
import { DEFAULT_MIN_EUR_CENTS, LAMPORTS_PER_SOL, LOTTERY_ENABLED } from "./constants";
export function useProtocol() {
  const { publicKey } = useWallet();
  const [snap, setSnap] = useState<ProtocolSnapshot | null>(null);
  const [walletLamports, setWalletLamports] = useState(0);
  useEffect(() => { fetchProtocol().then(setSnap); }, []);
  useEffect(() => { if (!publicKey) { setWalletLamports(0); return; } fetchWalletSol(publicKey).then(setWalletLamports); }, [publicKey]);
  const solEur = snap?.solEur ?? 0;
  const need = requiredLamports(solEur, snap?.minEurCents ?? DEFAULT_MIN_EUR_CENTS);
  const walletSol = walletLamports / LAMPORTS_PER_SOL;
  const eligible = LOTTERY_ENABLED && Boolean(publicKey) && need > 0 && walletLamports >= need;
  return { snap, walletLamports, walletSol, walletEur: solEur ? walletSol * solEur : 0, need, eligible, connectedWallet: Boolean(publicKey) };
}
