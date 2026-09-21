use crate::{MathError, MathResult, LAMPORTS_PER_SOL};
#[derive(Debug, Clone, Copy)]
pub struct OraclePrice { pub price: i64, pub expo: i32, pub conf: u64, pub publish_time: i64 }
fn pow10(exp: u32) -> MathResult<u128> { 10u128.checked_pow(exp).ok_or(MathError::Overflow) }
fn scale_abs_price(price: i64, expo: i32, target_expo: i32) -> MathResult<u128> {
    if price <= 0 { return Err(MathError::InvalidPrice); }
    let mut v = price as u128;
    if expo == target_expo { return Ok(v); }
    if expo > target_expo {
        v = v.checked_mul(pow10((expo - target_expo) as u32)?).ok_or(MathError::Overflow)?;
    } else {
        v /= pow10((target_expo - expo) as u32)?;
        if v == 0 { return Err(MathError::InvalidPrice); }
    }
    Ok(v)
}
pub fn required_sol_lamports(sol_usd: OraclePrice, eur_usd: OraclePrice, min_eur_cents: u64) -> MathResult<u64> {
    if min_eur_cents == 0 { return Ok(0); }
    let sol = scale_abs_price(sol_usd.price, sol_usd.expo, -8)?;
    let eur = scale_abs_price(eur_usd.price, eur_usd.expo, -8)?;
    let num = (min_eur_cents as u128).checked_mul(LAMPORTS_PER_SOL as u128).ok_or(MathError::Overflow)?.checked_mul(eur).ok_or(MathError::Overflow)?;
    let den = sol.checked_mul(100).ok_or(MathError::Overflow)?;
    let q = num / den;
    let lamports = if num % den == 0 { q } else { q + 1 };
    u64::try_from(lamports).map_err(|_| MathError::Overflow)
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn ten_eur_floor() {
        let sol = OraclePrice { price: 10_000_000_000, expo: -8, conf: 1, publish_time: 1 };
        let eur = OraclePrice { price: 100_000_000, expo: -8, conf: 1, publish_time: 1 };
        assert_eq!(required_sol_lamports(sol, eur, 1_000).unwrap(), 100_000_000);
    }
}
