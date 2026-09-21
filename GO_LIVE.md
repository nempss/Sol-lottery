# Mainnet go-live

A license does not deploy programs or replace an audit.
Ship the launchpad first. Keep the draw off until counsel says the license covers this product in each market.

## Already in the contracts

- `initialize_lottery(production=true)` requires ORAO + Pyth + 24h config delay
- Lottery starts disabled in production
- Mocks rejected on mainnet
- Vault has no admin withdraw
- Frontend: `NEXT_PUBLIC_LOTTERY_ENABLED` must be `true` to show the draw on mainnet

## You must run on a machine with Solana CLI + Anchor

This phone preview cannot deploy BPF programs.

```bash
# 1. unique keys (do not use the placeholder IDs)
anchor keys list
anchor keys sync

# 2. build + test
anchor build
anchor test

# 3. deploy ONLY these two
anchor deploy --provider.cluster mainnet --program-name forge_core
anchor deploy --provider.cluster mainnet --program-name forge_lottery
# never deploy mock_vrf or mock_oracle

# 4. lock upgrades to a Squads vault
solana program set-upgrade-authority <CORE_PROGRAM> --new-upgrade-authority <SQUADS>
solana program set-upgrade-authority <LOTTERY_PROGRAM> --new-upgrade-authority <SQUADS>

# 5. init lottery with production=true, lottery_enabled forced off
CLUSTER=mainnet-beta npx ts-node scripts/init_mainnet.ts
```

## Frontend env after deploy

```
NEXT_PUBLIC_CLUSTER=mainnet-beta
NEXT_PUBLIC_LOTTERY_ENABLED=false
NEXT_PUBLIC_FORGE_CORE_PROGRAM_ID=<new core id>
NEXT_PUBLIC_FORGE_LOTTERY_PROGRAM_ID=<new lottery id>
NEXT_PUBLIC_RPC_URL=<your paid RPC>
```

## Do not flip lottery on until

- Independent program audit
- Counsel confirms the license covers a fee-funded random prize in each market
- Tiny-value mainnet soak of launch + buy + sell only
