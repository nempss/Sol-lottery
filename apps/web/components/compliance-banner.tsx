import { CLUSTER, LOTTERY_ENABLED } from "@/lib/constants";
export function ComplianceBanner() {
  if (CLUSTER !== "mainnet-beta" && LOTTERY_ENABLED) return null;
  return (
    <p className="border-b border-line bg-panel px-4 py-2 text-center text-xs text-mute">
      {CLUSTER === "mainnet-beta"
        ? LOTTERY_ENABLED
          ? "Fee-funded draws may be regulated where you live. Chain state is authoritative."
          : "Mainnet launchpad only. The on-chain reward pool is disabled."
        : "Dev cluster. Do not send mainnet funds."}
    </p>
  );
}
