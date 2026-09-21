use crate::{MathError, MathResult, BPS_DENOMINATOR};

pub fn require_valid_split(treasury_bps: u16, lottery_bps: u16) -> MathResult<()> {
    treasury_bps
        .checked_add(lottery_bps)
        .filter(|s| *s == BPS_DENOMINATOR)
        .map(|_| ())
        .ok_or(MathError::InvalidBps)
}

pub fn apply_bps(amount: u64, bps: u16) -> MathResult<u64> {
    let raw = (amount as u128)
        .checked_mul(bps as u128)
        .ok_or(MathError::Overflow)?;
    u64::try_from(raw / BPS_DENOMINATOR as u128).map_err(|_| MathError::Overflow)
}
