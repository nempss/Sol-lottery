export const CLUSTER = (process.env.NEXT_PUBLIC_CLUSTER ?? "devnet") as
  | "devnet"
  | "mainnet-beta"
  | "testnet";

export const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL ?? "https://api.devnet.solana.com";

export const LOTTERY_ENABLED =
  CLUSTER === "mainnet-beta"
    ? process.env.NEXT_PUBLIC_LOTTERY_ENABLED === "true"
    : (process.env.NEXT_PUBLIC_LOTTERY_ENABLED ?? "true") !== "false";

export const CORE_PROGRAM_ID =
  process.env.NEXT_PUBLIC_FORGE_CORE_PROGRAM_ID ??
  "H4bBvbaDcBwNzGzoJLH5H46sjVKHLXiTdtyGGtJbeZCh";

export const LOTTERY_PROGRAM_ID =
  process.env.NEXT_PUBLIC_FORGE_LOTTERY_PROGRAM_ID ??
  "5bCnQeRgafsGQ91nBxuJTxNUiRGn7qj5dAUa7UYCQUT8";

export const DEFAULT_MIN_EUR_CENTS = 1_000;
export const LAMPORTS_PER_SOL = 1_000_000_000;
export const EXPLORER_CLUSTER =
  CLUSTER === "mainnet-beta" ? "" : `?cluster=${CLUSTER}`;

export function explorerAddress(address: string) {
  return `https://explorer.solana.com/address/${address}${EXPLORER_CLUSTER}`;
}

export function explorerTx(sig: string) {
  return `https://explorer.solana.com/tx/${sig}${EXPLORER_CLUSTER}`;
}
