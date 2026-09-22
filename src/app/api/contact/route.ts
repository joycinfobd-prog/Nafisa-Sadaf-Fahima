import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { sendContactEmail } from "@/lib/mailer";
import { isTrustedOrigin, jsonError, rateLimit } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return jsonError("Forbidden.", 403);
    }

    const limited = rateLimit(req, "contact", 5, 10 * 60 * 1000);
    if (!limited.ok) {
      return jsonError("Too many messages. Please try again later.", 429);
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return jsonError("Unsupported content type.", 415);
    }

    const body = (await req.json().catch(() => null)) as
      | { name?: string; email?: string; subject?: string; message?: string; website?: string }
      | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot for bots
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: "Please enter your name (2–120 characters)." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Message should be between 10 and 5000 characters." }, { status: 400 });
    }

    const database = getDb();

    // Run DB insert and email delivery IN PARALLEL so the visitor waits for
    // max(db, mail) instead of db + mail.
    const [insertResult, mailResult] = await Promise.allSettled([
      database
        ? database
            .insert(contactMessages)
            .values({ name, email, subject: subject.slice(0, 200) || null, message })
            .returning({ id: contactMessages.id, createdAt: contactMessages.createdAt })
        : Promise.resolve(null as { id: number; createdAt: Date | string }[] | null),
      sendContactEmail({ name, email, subject, message }),
    ]);

    let saved: { id: number; createdAt: Date | string } | null = null;
    if (insertResult.status === "fulfilled" && insertResult.value?.length) {
      saved = insertResult.value[0];
    } else if (insertResult.status === "rejected") {
      console.error("contact DB insert failed", insertResult.reason);
    }

    let emailSent = false;
    let provider: string | null = null;
    if (mailResult.status === "fulfilled") {
      emailSent = mailResult.value.sent;
      provider = mailResult.value.provider === "none" ? null : mailResult.value.provider;
    } else {
      console.error("contact email send failed", mailResult.reason);
    }

    if (database && saved && emailSent) {
      try {
        await database
          .update(contactMessages)
          .set({ emailSent: true, emailProvider: provider })
          .where(eq(contactMessages.id, saved.id));
      } catch (updateErr) {
        console.error("contact DB update failed", updateErr);
      }
    }

    if (!saved && !emailSent) {
      // No database/email provider is configured in this deployment. This is
      // not a server failure: the client opens a pre-filled mailto draft.
      return NextResponse.json(
        {
          ok: true,
          id: 0,
          createdAt: new Date().toISOString(),
          emailSent: false,
          fallback: "mailto",
        },
        { status: 202 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        id: saved?.id ?? 0,
        createdAt: saved?.createdAt ?? new Date().toISOString(),
        emailSent,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("contact POST failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
