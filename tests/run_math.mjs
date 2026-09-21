import assert from "node:assert/strict";
function splitFee(gross, treasuryBps, lotteryBps) {
  if (treasuryBps + lotteryBps !== 10_000) throw new Error("InvalidBps");
  const lottery = (gross * BigInt(lotteryBps)) / 10_000n;
  return { gross, lottery, treasury: gross - lottery };
}
function winnerFromBytes(bytes, entryCount) {
  const rnd = bytes.readBigUInt64LE(0);
  const max = 2n ** 64n - 1n - ((2n ** 64n - 1n) % entryCount);
  if (rnd >= max) throw new Error("BiasedSample");
  return rnd % entryCount;
}
const s = splitFee(1_000_000n, 7000, 3000);
assert.equal(s.treasury, 700_000n);
assert.equal(s.lottery, 300_000n);
const buf = Buffer.alloc(8);
buf.writeBigUInt64LE(7n);
assert.equal(winnerFromBytes(buf, 5n), 2n);
console.log("math cross-check ok");
