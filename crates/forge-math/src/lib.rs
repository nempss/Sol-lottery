//! Integer-only math used by Forge programs.

pub mod bps;
pub mod eligibility;
pub mod fees;
pub mod randomness;
pub mod sha256;
pub mod time;

pub const BPS_DENOMINATOR: u16 = 10_000;
pub const LAMPORTS_PER_SOL: u64 = 1_000_000_000;
pub const DEFAULT_MIN_EUR_CENTS: u64 = 1_000;
pub const DEFAULT_TREASURY_BPS: u16 = 7_000;
pub const DEFAULT_LOTTERY_BPS: u16 = 3_000;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum MathError {
    Overflow,
    DivisionByZero,
    InvalidBps,
    InsufficientReserves,
    ZeroAmount,
    InvalidPrice,
    StalePrice,
    WideConfidence,
    EmptySet,
    BiasedSample,
}

pub type MathResult<T> = Result<T, MathError>;
