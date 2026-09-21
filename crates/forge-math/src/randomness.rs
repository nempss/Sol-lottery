use crate::sha256::Sha256;
use crate::{MathError, MathResult};

pub fn bind_seed(program_id: &[u8], round_id: u64, entry_count: u64, prize_lamports: u64, close_slot: u64) -> [u8; 32] {
    let mut h = Sha256::new();
    h.update(b"forge-lottery-vrf-v1");
    h.update(program_id);
    h.update(&round_id.to_le_bytes());
    h.update(&entry_count.to_le_bytes());
    h.update(&prize_lamports.to_le_bytes());
    h.update(&close_slot.to_le_bytes());
    h.finish()
}

pub fn winner_index(random_u64: u64, entry_count: u64) -> MathResult<u64> {
    if entry_count == 0 { return Err(MathError::EmptySet); }
    let max = u64::MAX - (u64::MAX % entry_count);
    if random_u64 >= max { return Err(MathError::BiasedSample); }
    Ok(random_u64 % entry_count)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn maps_uniformly_small_n() {
        assert_eq!(winner_index(7, 5).unwrap(), 2);
    }
    #[test]
    fn rejects_biased_tail() {
        let n = 3u64;
        let max = u64::MAX - (u64::MAX % n);
        assert!(winner_index(max, n).is_err());
    }
}
