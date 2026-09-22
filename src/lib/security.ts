const RATE_WINDOWS = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

/** Simple per-instance rate limit. Good enough to stop casual abuse on Vercel. */
export function rateLimit(req: Request, key: string, limit: number, windowMs: number) {
  const id = `${key}:${clientIp(req)}`;
  const now = Date.now();
  const current = RATE_WINDOWS.get(id);
  if (!current || current.resetAt < now) {
    RATE_WINDOWS.set(id, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (current.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: current.resetAt - now };
  }
  current.count += 1;
  return { ok: true, remaining: limit - current.count };
}

function allowedOrigins() {
  const origins = new Set<string>();
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) origins.add(site);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  origins.add("http://localhost:3000");
  origins.add("http://127.0.0.1:3000");
  return origins;
}

/**
 * If the browser sent an Origin, it must match this deployment.
 * Requests without Origin (curl / same-origin edge cases) are allowed.
 */
export function isTrustedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  if (allowedOrigins().has(origin)) return true;
  try {
    const host = req.headers.get("host");
    if (host && new URL(origin).host === host) return true;
  } catch {
    return false;
  }
  return false;
}

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
