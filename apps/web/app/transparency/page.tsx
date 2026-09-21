import { CORE_PROGRAM_ID, LOTTERY_PROGRAM_ID, explorerAddress } from "@/lib/constants";
import { lotteryVaultPda, platformPda, treasuryPda } from "@/lib/pda";
export default function TransparencyPage() {
  const rows = [
    ["Core program", CORE_PROGRAM_ID],
    ["Lottery program", LOTTERY_PROGRAM_ID],
    ["Vault", lotteryVaultPda()],
    ["Treasury", treasuryPda()],
    ["Platform", platformPda()],
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium tracking-tight">Transparency</h1>
      <p className="text-sm text-mute">Protocol rules live in the programs. If this page and the chain disagree, the chain wins.</p>
      <p className="text-sm text-mute">Fees split on-chain. Lottery vault has no admin withdraw. Winner comes from VRF after entries close. This UI does not pick winners.</p>
      <div className="card divide-y divide-line text-xs">
        {rows.map(([label, value]) => (
          <a key={label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between" href={explorerAddress(value)} target="_blank" rel="noreferrer">
            <span className="text-mute">{label}</span><span className="break-all font-mono">{value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
