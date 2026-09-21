"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "./wallet-button";
import { LOTTERY_ENABLED } from "@/lib/constants";
const LINKS = [{ href: "/", label: "Home" }, { href: "/launch", label: "Launch" }, ...(LOTTERY_ENABLED ? [{ href: "/lottery", label: "Rewards" }] : []), { href: "/transparency", label: "Transparency" }];
export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-medium tracking-tight"><span className="h-2 w-2 rounded-full bg-mint" />Forge</Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((l) => (<Link key={l.href} href={l.href} className={path === l.href ? "text-white" : "link-quiet"}>{l.label}</Link>))}
        </nav>
        <WalletButton />
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-line px-4 py-2 text-sm md:hidden">
        {LINKS.map((l) => (<Link key={l.href} href={l.href} className={path === l.href ? "text-white" : "link-quiet"}>{l.label}</Link>))}
      </nav>
    </header>
  );
}
