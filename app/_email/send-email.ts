"use server";

import nodemailer, { SentMessageInfo } from "nodemailer";

type SendEmailResponse = {
    success: boolean;
    info?: SentMessageInfo;
    error?: string;
};

export async function sendEmail(
    formData: FormData
): Promise<SendEmailResponse> {
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;
    const service = formData.get("service") as string | null;
    if (!firstName || !lastName || !email || !message) {
        return { success: false, error: "Missing required fields" };
    }

    const html = `
  <html>
    <body style="margin:0; padding:0; font-family: 'Poppins', sans-serif; background-color:#ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
        <tr>
          <td align="center">
            <table width="600" cellpadding="20" cellspacing="0" bgcolor="#ffffff" style="border-radius:8px; border: 0.4px solid #213448; margin:20px auto;">
              <tr>
                <td align="center" style="background-color:#213448; color:#ffffff; border-radius:8px 8px 0 0;">
                  <h2 style="margin:0; padding:20px; font-size:20px; font-weight:600; font-family: Poppins, Arial, sans-serif;">
                    Kacimo – New Request Info's
                  </h2>
                </td>
              </tr>
              <tr>
                <td style="color:#333;">
                  <p style="font-size:16px;">Hi Kacimo,</p>
                  <p style="font-size:14px;">
                    You’ve received a new message from <b>${firstName} ${lastName}</b>.
                  </p>
                  <p style="font-size:14px;">
                    The service requested is <b>${service}</b>.
                  </p>
                  <p style="background:#f9f9f9; padding:15px; border-radius:6px; font-size:14px;">
                    ${message}
                  </p>
                  <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;">
                  <p><b>Email:</b> ${email}</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="background-color:#f9f9f9; border-radius:0 0 8px 8px; font-size:12px; color:#666;">
                  <p style="margin:0;">© ${new Date().getFullYear()} Kacimo</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

    try {
        // Validate SMTP configuration
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost) {
            return { success: false, error: "SMTP_HOST is not configured" };
        }

        if (!smtpPort) {
            return { success: false, error: "SMTP_PORT is not configured" };
        }

        const portNumber = Number(smtpPort);
        if (isNaN(portNumber) || portNumber <= 0) {
            return {
                success: false,
                error: "SMTP_PORT must be a valid number",
            };
        }

        if (!smtpUser || !smtpPass) {
            return {
                success: false,
                error: "SMTP credentials are not configured",
            };
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: portNumber,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const info = await transporter.sendMail({
            from: `"Kacimo" <${smtpUser}>`,
            to: `${smtpUser}`,
            subject: "Infos Request",
            html,
        });

        return { success: true, info };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Email send error:", error.message);
            return { success: false, error: error.message };
        }
        console.error("Unexpected email send error:", error);
        return { success: false, error: "Unknown error occurred" };
    }
}
