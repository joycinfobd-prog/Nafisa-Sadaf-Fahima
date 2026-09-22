import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { siteStats } from "@/db/schema";
import { isTrustedOrigin, jsonError, rateLimit } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set(["cv_downloads", "profile_views", "email_copies"]);

export async function GET() {
  try {
    const database = getDb();
    if (!database) return NextResponse.json({ stats: {} });
    const rows = await database.select().from(siteStats);
    const stats = Object.fromEntries(rows.map((r) => [r.key, r.count]));
    return NextResponse.json({ stats });
  } catch (err) {
    console.error("stats GET failed", err);
    return NextResponse.json({ stats: {} }, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return jsonError("Forbidden.", 403);
    }

    const limited = rateLimit(req, "stats", 40, 60 * 1000);
    if (!limited.ok) {
      return jsonError("Too many requests.", 429);
    }

    const body = (await req.json().catch(() => null)) as { key?: string } | null;
    const key = body?.key ?? "";
    if (!ALLOWED_KEYS.has(key)) {
      return NextResponse.json({ error: "Unknown stat key." }, { status: 400 });
    }

    const database = getDb();
    if (!database) {
      return NextResponse.json({ key, count: 0 });
    }

    const [row] = await database
      .insert(siteStats)
      .values({ key, count: 1 })
      .onConflictDoUpdate({
        target: siteStats.key,
        set: { count: sql`${siteStats.count} + 1`, updatedAt: new Date() },
      })
      .returning();

    return NextResponse.json({ key: row.key, count: row.count });
  } catch (err) {
    console.error("stats POST failed", err);
    return NextResponse.json({ error: "Unable to record stat." }, { status: 500 });
  }
}
