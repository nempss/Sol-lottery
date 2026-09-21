# Forge — Solana launchpad + fee-funded lottery

## Test on a phone

GitHub in a browser cannot run Next.js or `cargo test` by itself. Use a Codespace:

1. Open https://github.com/nempss/Sol-lottery
2. **Code → Codespaces → New codespace**
3. Wait until the terminal is ready, then:

```bash
# math (no Solana needed)
node tests/run_math.mjs
cargo test -p forge-math

# UI
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

4. In Codespaces: **Ports** → port `3000` → open the URL on the phone.
5. Connect Phantom or Solflare on **devnet**.

You can tap Home, Launch, Rewards, Transparency. Launch/trade txs need deployed programs.

`anchor test` still needs Solana + Anchor CLI on a full machine.

## Layout

- `apps/web` — Next.js UI
- `crates/forge-math` — fee / eligibility / winner math
- `tests/` — node + mocha checks
- `programs/` — Anchor programs (core + lottery + mocks)
