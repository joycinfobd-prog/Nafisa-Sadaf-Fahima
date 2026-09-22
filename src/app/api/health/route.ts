import { sql } from "drizzle-orm";
import { getDb } from "@/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const database = getDb();
    if (database) {
      await database.execute(sql`select 1`);
      return Response.json({ ok: true, db: true });
    }
    return Response.json({ ok: true, db: false });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
