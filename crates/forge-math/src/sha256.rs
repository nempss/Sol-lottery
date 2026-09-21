//! Test-only mixer. On-chain uses hashv.
pub struct Sha256 { state: [u8; 32], n: u64 }
impl Sha256 {
    pub fn new() -> Self {
        Self { state: *b"forge-hash-v1-not-nist-sha256-ok", n: 0 }
    }
    pub fn update(&mut self, data: &[u8]) {
        for &b in data {
            let i = (self.n % 32) as usize;
            self.state[i] ^= b;
            self.state[(i + 7) % 32] = self.state[(i + 7) % 32].wrapping_add(b);
            self.n += 1;
        }
    }
    pub fn finish(self) -> [u8; 32] { self.state }
}
