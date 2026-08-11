/**
 * Minimal fixed-window rate limiter, in memory.
 *
 * Deliberately simple: this is one contact form on a marketing site, and the
 * honeypot plus schema validation do most of the work. The limit exists to stop
 * a trivial flood, not a determined attacker.
 *
 * Caveat worth knowing before relying on it: state is per-process, so on a
 * serverless platform each instance keeps its own counter and the effective
 * limit is higher than configured. If real abuse ever appears, swap this for a
 * shared store (Upstash Redis, Vercel KV) — the call signature won't change.
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS;
    hits.set(key, { count: 1, resetAt });

    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (now > v.resetAt) hits.delete(k);
      }
    }

    return { ok: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  entry.count += 1;

  return {
    ok: entry.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetAt: entry.resetAt,
  };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
