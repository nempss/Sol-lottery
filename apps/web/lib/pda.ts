import { PublicKey } from "@solana/web3.js";
import { CORE_PROGRAM_ID, LOTTERY_PROGRAM_ID } from "./constants";
function seed(s: string) { return new TextEncoder().encode(s); }
export function platformPda() { return PublicKey.findProgramAddressSync([seed("platform")], CORE_PROGRAM_ID)[0]; }
export function treasuryPda() { return PublicKey.findProgramAddressSync([seed("treasury")], CORE_PROGRAM_ID)[0]; }
export function lotteryConfigPda() { return PublicKey.findProgramAddressSync([seed("lottery_config")], LOTTERY_PROGRAM_ID)[0]; }
export function lotteryVaultPda() { return PublicKey.findProgramAddressSync([seed("lottery_vault")], LOTTERY_PROGRAM_ID)[0]; }
