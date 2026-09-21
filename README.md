# Forge — Solana launchpad + fee-funded lottery

Token launches on a bonding curve. A configurable share of protocol fees can fund an on-chain reward pool.

Lottery can be disabled without breaking launches.

## Test from a phone

1. Open this repo on GitHub.
2. Code → Codespaces → New codespace (or use any cloud Linux box).
3. In the terminal:

```bash
# math tests (no Solana toolchain)
cargo test -p forge-math
node tests/run_math.mjs

# web UI
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

4. From the Codespace Ports tab, open the forwarded `3000` URL on your phone.
5. Connect Phantom or Solflare on **devnet**.

`anchor test` needs Solana + Anchor CLI. That is not a phone-only flow.

## Layout

- `programs/` — forge_core, forge_lottery, mock_vrf, mock_oracle
- `crates/forge-math` — fees, curve, eligibility, randomness
- `apps/web` — Next.js UI
- `apps/indexer` — optional Postgres cache
- `tests/` — math + invariant checks
- `docs/` — security, compliance, mainnet checklist

Mainnet: lottery starts disabled when `production=true`. See `docs/MAINNET_CHECKLIST.md`.
