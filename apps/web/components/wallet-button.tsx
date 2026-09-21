"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { shortKey } from "@/lib/format";
export function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  if (connected && publicKey) {
    return <button className="btn-ghost" onClick={() => disconnect()}>{shortKey(publicKey.toBase58())}</button>;
  }
  return <button className="btn-primary" onClick={() => setVisible(true)}>Connect</button>;
}
