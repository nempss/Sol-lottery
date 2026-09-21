"use client";
import Link from "next/link";
import { CLUSTER, LOTTERY_ENABLED, explorerAddress } from "@/lib/constants";
import { lotteryVaultPda } from "@/lib/pda";
import { formatEurFromSol, lamportsToSol, shortKey } from "@/lib/format";
import { DEMO_LAUNCHES } from "@/lib/demo-data";
import { BRAND_LOGO, BRAND_NAME } from "@/lib/brand";
import { useProtocol } from "@/lib/use-protocol";
import { useIndex } from "@/lib/use-index";
import { Countdown } from "@/components/countdown";

type LaunchRow = { mint: string; name?: string; symbol?: string; image?: string; uri?: string };

export default function HomePage() {
  const { snap } = useProtocol();
  const launches = useIndex<LaunchRow[]>("/api/launches");
  const vault = snap?.vaultLamports ?? 0;
  const solEur = snap?.solEur ?? 0;
  const launchList = launches.data?.length ? launches.data : CLUSTER === "mainnet-beta" ? [] : DEMO_LAUNCHES;
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src={BRAND_LOGO} alt="" className="h-12 w-12 rounded-xl bg-white object-contain" />
            <p className="text-xs uppercase tracking-[0.2em] text-mute">{BRAND_NAME}</p>
          </div>
          <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">Launch a coin.{LOTTERY_ENABLED && (<><br />Fees fund a public pool.</>)}</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute">Create an SPL token and trade it on a bonding curve. Winner selection is not controlled by this website.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/launch" className="btn-primary">Launch a Coin</Link>
            {LOTTERY_ENABLED && <Link href="/lottery" className="btn-ghost">View pool</Link>}
          </div>
        </div>
        {LOTTERY_ENABLED && (
          <div className="card shadow-glow p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-mute">Current pool</p>
            <p className="mt-3 font-mono text-4xl tracking-tight text-mint">{lamportsToSol(vault, 2)} <span className="ml-2 text-lg text-mute">SOL</span></p>
            <p className="mt-2 text-sm text-mute">{solEur ? formatEurFromSol(vault / 1e9, solEur) : "EUR pending oracle"}</p>
            <div className="mt-6 text-sm"><p className="text-mute">Next draw</p><Countdown endTs={snap?.endTs ?? Date.now()} /></div>
            <a className="mt-5 inline-block text-xs text-mute" href={explorerAddress(lotteryVaultPda())} target="_blank" rel="noreferrer">Vault {shortKey(lotteryVaultPda(), 6)}</a>
          </div>
        )}
      </section>
      <section>
        <h2 className="mb-4 text-lg font-medium">Recent launches</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {launchList.slice(0, 6).map((t) => (
            <Link key={t.mint} href={`/token/${t.mint}`} className="card flex items-center gap-3 p-4">
              <img
                src={t.image || t.uri || BRAND_LOGO}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl bg-white object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-medium">{t.name ?? "Token"}</p>
                <p className="font-mono text-xs text-mute">{t.symbol ?? ""}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
