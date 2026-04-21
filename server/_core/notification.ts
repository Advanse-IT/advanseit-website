/**
 * Portable owner notification helper.
 *
 * Replaces the Manus notification service with a plain SMTP email.
 * Uses the same SMTP credentials already configured for contact/training forms.
 *
 * Required environment variables (same as contact form):
 *   SMTP_HOST  — e.g. "smtp.gmail.com"
 *   SMTP_PORT  — e.g. "587"
 *   SMTP_USER  — sender address, e.g. "admin@advanseit.com.au"
 *   SMTP_PASS  — SMTP password or app password
 *   NOTIFY_TO  — (optional) recipient address; defaults to SMTP_USER
 */

import nodemailer from "nodemailer";

export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Sends an owner notification email via SMTP.
 * Returns true on success, false if SMTP is not configured or send fails.
 * Never throws — callers can treat false as a soft failure.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = payload;

  if (!title?.trim() || !content?.trim()) {
    console.warn("[Notification] Skipping — title or content is empty");
    return false;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyTo = process.env.NOTIFY_TO ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !notifyTo) {
    console.warn("[Notification] SMTP not configured — skipping owner notification");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const htmlContent = content
      .split("\n")
      .map((line) => `<p style="margin:4px 0;color:#374151;">${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`)
      .join("");

    await transporter.sendMail({
      from: `"AdvanseIT Website" <${smtpUser}>`,
      to: notifyTo,
      subject: `[AdvanseIT] ${title}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#0D1B2E;margin-bottom:16px;">${title}</h2>
          <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
            ${htmlContent}
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
            AdvanseIT Pty Ltd · Brisbane, Queensland, Australia
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.warn("[Notification] Email send failed:", error);
    return false;
  }
}
