import { expect } from "chai";
import { winnerFromBytes, requiredLamports, splitFee } from "../crates/client/src/math";
describe("forge_lottery invariants", () => {
  it("€10 floor", () => {
    const need = requiredLamports(
      { price: 10_000_000_000n, expo: -8, conf: 1n, publishTime: 1n },
      { price: 100_000_000n, expo: -8, conf: 1n, publishTime: 1n },
      1000n
    );
    expect(need).to.equal(100_000_000n);
  });
  it("70/30 split", () => {
    const s = splitFee(1_000_000n, 7000, 3000);
    expect(s.treasury).to.equal(700_000n);
    expect(s.lottery).to.equal(300_000n);
  });
  it("winner index", () => {
    const bytes = Buffer.alloc(8);
    bytes.writeBigUInt64LE(7n);
    expect(winnerFromBytes(bytes, 5n)).to.equal(2n);
  });
});
