import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import nodemailer from "nodemailer";

// ─── Email helper ────────────────────────────────────────────────────────────
async function sendContactEmail(data: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = "admin@advanseit.com.au";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[Contact] SMTP not configured — skipping email send");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0;">
      <div style="background: linear-gradient(135deg, #0D1B2E 0%, #0a3d5c 100%); padding: 32px 40px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #00C8D4; margin: 0; font-size: 24px; font-weight: 700;">AdvanseIT</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">New Contact Form Submission</p>
      </div>
      <div style="background: #ffffff; padding: 32px 40px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 120px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;"><a href="mailto:${data.email}" style="color: #0193CC;">${data.email}</a></td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${data.company}</td>
          </tr>` : ""}
          ${data.service ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Service</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${data.service}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 24px;">
          <p style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
        </div>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #0193CC, #01D0CC); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">Reply to ${data.name}</a>
        </div>
      </div>
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin: 16px 0;">AdvanseIT Pty Ltd · Brisbane, Queensland, Australia</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"AdvanseIT Website" <${smtpUser}>`,
    to: toEmail,
    replyTo: data.email,
    subject: `New Enquiry from ${data.name}${data.service ? ` — ${data.service}` : ""}`,
    html,
    text: `New contact form submission:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "N/A"}\nService: ${data.service ?? "N/A"}\n\nMessage:\n${data.message}`,
  });

  return true;
}

// ─── Router ──────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          email: z.string().email().max(320),
          company: z.string().max(200).optional(),
          service: z.string().max(100).optional(),
          message: z.string().min(10).max(5000),
        })
      )
      .mutation(async ({ input }) => {
        // 1. Send email via SMTP (if configured)
        const emailSent = await sendContactEmail(input).catch(err => {
          console.error("[Contact] Email send failed:", err);
          return false;
        });

        // 2. Always notify the owner via Manus notification system as fallback
        const notifContent = [
          `**From:** ${input.name} <${input.email}>`,
          input.company ? `**Company:** ${input.company}` : null,
          input.service ? `**Service:** ${input.service}` : null,
          `\n**Message:**\n${input.message}`,
        ]
          .filter(Boolean)
          .join("\n");

        await notifyOwner({
          title: `New enquiry from ${input.name}${input.service ? ` — ${input.service}` : ""}`,
          content: notifContent,
        }).catch(err => {
          console.warn("[Contact] Owner notification failed:", err);
        });

        return { success: true, emailSent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
