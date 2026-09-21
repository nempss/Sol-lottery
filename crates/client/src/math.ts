export function splitFee(gross: bigint, treasuryBps: number, lotteryBps: number) {
  if (treasuryBps + lotteryBps !== 10_000) throw new Error("InvalidBps");
  const lottery = (gross * BigInt(lotteryBps)) / 10_000n;
  return { gross, lottery, treasury: gross - lottery };
}
export function winnerFromBytes(bytes: Buffer, entryCount: bigint): bigint {
  const rnd = bytes.readBigUInt64LE(0);
  const max = 2n ** 64n - 1n - ((2n ** 64n - 1n) % entryCount);
  if (rnd >= max) throw new Error("BiasedSample");
  return rnd % entryCount;
}
function pow10(exp: number): bigint { let v = 1n; for (let i = 0; i < exp; i++) v *= 10n; return v; }
function scale(price: bigint, expo: number, target: number): bigint {
  if (expo === target) return price;
  if (expo > target) return price * pow10(expo - target);
  return price / pow10(target - expo);
}
export function requiredLamports(solUsd: {price: bigint; expo: number}, eurUsd: {price: bigint; expo: number}, minEurCents: bigint): bigint {
  const sol = scale(solUsd.price, solUsd.expo, -8);
  const eur = scale(eurUsd.price, eurUsd.expo, -8);
  const num = minEurCents * 1_000_000_000n * eur;
  const den = sol * 100n;
  const q = num / den;
  return num % den === 0n ? q : q + 1n;
}
