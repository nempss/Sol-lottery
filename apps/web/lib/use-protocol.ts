"use client";

import { useEffect, useState } from "react";
import { fetchProtocol, type ProtocolSnapshot } from "./protocol";

export function useProtocol() {
  const [snap, setSnap] = useState<ProtocolSnapshot | null>(null);
  useEffect(() => {
    fetchProtocol().then(setSnap);
  }, []);
  return {
    snap,
    walletLamports: 0,
    walletSol: 0,
    walletEur: 0,
    need: 0,
    eligible: false,
    connectedWallet: false,
  };
}
