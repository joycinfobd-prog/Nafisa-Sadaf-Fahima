import nodemailer from "nodemailer";
import { Resend } from "resend";
import { profile } from "./cv-data";

type ContactPayload = {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(payload: ContactPayload) {
  const subjectLine = payload.subject?.trim() || "New portfolio inquiry";
  const subject = `📩 ${subjectLine} — from ${payload.name}`;

  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${subjectLine}`,
    ``,
    `Message:`,
    payload.message,
  ].join("\n");

  const html = `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; background:#0a0a0a; color:#f5f7fa; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
    <div style="background:linear-gradient(120deg,#0a84d6,#12a58f); padding:18px 24px;">
      <p style="margin:0; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.85); font-weight:700;">New Portfolio Inquiry</p>
      <p style="margin:4px 0 0; font-size:20px; font-weight:800; color:#fff;">${escapeHtml(subjectLine)}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%; border-collapse:collapse; margin-bottom:18px;">
        <tr>
          <td style="padding:6px 0; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#9aa3b2; width:90px;">Name</td>
          <td style="padding:6px 0; font-size:14px; font-weight:700;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#9aa3b2;">Email</td>
          <td style="padding:6px 0; font-size:14px; font-weight:700;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#62b8f5; text-decoration:none;">${escapeHtml(payload.email)}</a></td>
        </tr>
      </table>
      <div style="border-top:1px dashed rgba(255,255,255,0.15); padding-top:16px;">
        <p style="margin:0 0 8px; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#9aa3b2;">Message</p>
        <p style="margin:0; font-size:14px; line-height:1.7; white-space:pre-wrap; color:#eef5fb;">${escapeHtml(payload.message)}</p>
      </div>
    </div>
    <div style="padding:14px 24px; background:rgba(255,255,255,0.03); font-size:11px; color:#7a8598;">
      Sent automatically from ${profile.name}'s portfolio contact form.
    </div>
  </div>`;

  return { subject, text, html };
}

/**
 * Sends the contact form submission straight to the owner's inbox.
 * Resolution order:
 *   1. Resend API (RESEND_API_KEY) — recommended, no SMTP server needed.
 *   2. SMTP via nodemailer (SMTP_HOST / SMTP_USER / SMTP_PASS).
 * If neither is configured, the function no-ops (message is still saved to the database).
 */
export async function sendContactEmail(payload: ContactPayload) {
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const { subject, text, html } = buildEmail(payload);

  // Option 1: Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });
    if (error) throw new Error(error.message || "Resend failed to send the email.");
    return { sent: true, provider: "resend" as const };
  }

  // Option 2: SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });
    return { sent: true, provider: "smtp" as const };
  }

  return { sent: false, provider: "none" as const };
}
