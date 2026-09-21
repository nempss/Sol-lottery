use crate::bps::{apply_bps, require_valid_split};
use crate::{MathError, MathResult};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct FeeSplit {
    pub gross: u64,
    pub treasury: u64,
    pub lottery: u64,
}

pub fn split_fee(gross: u64, treasury_bps: u16, lottery_bps: u16) -> MathResult<FeeSplit> {
    if gross == 0 {
        return Ok(FeeSplit { gross: 0, treasury: 0, lottery: 0 });
    }
    require_valid_split(treasury_bps, lottery_bps)?;
    let lottery = apply_bps(gross, lottery_bps)?;
    let treasury = gross.checked_sub(lottery).ok_or(MathError::Overflow)?;
    Ok(FeeSplit { gross, treasury, lottery })
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn default_70_30_split() {
        let s = split_fee(1_000_000, 7_000, 3_000).unwrap();
        assert_eq!(s.treasury, 700_000);
        assert_eq!(s.lottery, 300_000);
    }
    #[test]
    fn remainder_stays_in_treasury() {
        let s = split_fee(1, 7_000, 3_000).unwrap();
        assert_eq!(s.lottery, 0);
        assert_eq!(s.treasury, 1);
    }
}
