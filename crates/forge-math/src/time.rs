pub fn entry_old_enough(registered_slot: u64, now_slot: u64, min_age: u64) -> bool {
    now_slot.saturating_sub(registered_slot) >= min_age
}
