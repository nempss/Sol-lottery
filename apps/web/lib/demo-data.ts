import { BRAND_LOGO } from "./brand";

export type LaunchPreview = {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  website?: string;
  twitter?: string;
  createdAt: string;
};

export const DEMO_LAUNCHES: LaunchPreview[] = [
  {
    mint: "So11111111111111111111111111111111111111112",
    name: "Solana Lottery",
    symbol: "SLOT",
    description: "Fee-funded on-chain rewards.",
    image: BRAND_LOGO,
    website: "https://forge-web-sollottery.vercel.app",
    twitter: "https://x.com/solana",
    createdAt: "2026-09-20T10:00:00Z",
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "Northwind",
    symbol: "NWRD",
    description: "Community token launched through the curve.",
    image: "https://api.dicebear.com/9.x/identicon/svg?seed=Northwind&backgroundColor=14f195",
    website: "https://example.com",
    twitter: "https://x.com/northwind",
    createdAt: "2026-09-19T18:12:00Z",
  },
  {
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    name: "Lumen",
    symbol: "LMN",
    description: "Minimal metadata, fixed supply on the curve.",
    image: "https://api.dicebear.com/9.x/identicon/svg?seed=Lumen&backgroundColor=9945ff",
    twitter: "https://x.com/lumen",
    createdAt: "2026-09-19T09:40:00Z",
  },
];

export const DEMO_WINNERS = [
  { round: 11, wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", prizeSol: 4.12, prizeEur: 276, sig: "demo" },
];
