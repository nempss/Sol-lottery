"use client";
import { LOTTERY_ENABLED, explorerAddress } from "@/lib/constants";
import { lotteryVaultPda } from "@/lib/pda";
import { formatEur, formatEurFromSol, lamportsToSol } from "@/lib/format";
import { useProtocol } from "@/lib/use-protocol";
import { Countdown } from "@/components/countdown";
export default function LotteryPage() {
  const { snap, walletSol, eligible, connectedWallet } = useProtocol();
  if (!LOTTERY_ENABLED) return <div className="max-w-lg"><h1 className="text-3xl font-medium">Rewards disabled</h1><p className="mt-3 text-sm text-mute">The launchpad remains available.</p></div>;
  const vault = snap?.vaultLamports ?? 0;
  const solEur = snap?.solEur ?? 0;
  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Protocol rewards</p>
        <h1 className="mt-2 font-mono text-5xl tracking-tight text-mint">{lamportsToSol(vault, 2)} SOL</h1>
        <p className="mt-2 text-sm text-mute">{solEur ? formatEurFromSol(vault / 1e9, solEur) : "Fetching EUR…"}</p>
        <p className="mt-4 text-sm text-mute">Draw in <Countdown endTs={snap?.endTs ?? Date.now()} /></p>
      </header>
      <section className="card p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-mute">Your eligibility</p>
        {!connectedWallet ? <p className="mt-3 text-sm">Connect a wallet on desktop to check the floor. This phone preview shows the UI only.</p> : (
          <>
            <p className="mt-3 text-lg font-medium">{eligible ? "You are eligible" : "You are not eligible"}</p>
            <p className="mt-1 font-mono text-sm text-mute">{walletSol.toFixed(4)} SOL{solEur ? ` · ${formatEurFromSol(walletSol, solEur)}` : ""}</p>
            <p className="mt-3 text-sm text-mute">Requirement: hold at least {formatEur(snap?.minEurCents ?? 1000)} of native SOL at snapshot.</p>
          </>
        )}
      </section>
      <p className="text-sm text-mute">Vault <a className="font-mono" href={explorerAddress(lotteryVaultPda())} target="_blank" rel="noreferrer">{lotteryVaultPda()}</a></p>
    </div>
  );
}
