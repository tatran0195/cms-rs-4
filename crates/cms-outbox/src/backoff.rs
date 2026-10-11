use chrono::{DateTime, Duration, Utc};
use rand::Rng;

pub const MAX_ATTEMPTS: i32 = 10;

/// Returns the next retry timestamp for a given failure attempt count.
pub fn next_retry_at(attempts: i32) -> DateTime<Utc> {
    let base_secs = match attempts {
        ..=1 => 1,
        2 => 5,
        3 => 30,
        4 => 5 * 60,
        5 => 30 * 60,
        6 => 2 * 60 * 60,
        _ => 6 * 60 * 60,
    };
    let mut rng = rand::rng();
    let jitter = rng.random_range(0.8..1.2);
    let delay_secs = (base_secs as f64 * jitter) as i64;
    Utc::now() + Duration::seconds(delay_secs.max(1))
}
