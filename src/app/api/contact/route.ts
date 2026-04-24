import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, enquiry, message } = body;

    if (!name || !email || !enquiry || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email delivery — configure these env vars in Vercel project settings:
    //   CONTACT_EMAIL   → recipient address (e.g. contact@sunitjadhav.com)
    //   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
    if (process.env.SMTP_HOST && process.env.CONTACT_EMAIL) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Sunit Jadhav Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `Contact Enquiry: ${enquiry} — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; color: #222;">
            <h2 style="margin-bottom: 24px;">New Contact Enquiry</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 10px 0; color: #666; width: 140px;">Name</td><td style="padding: 10px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Enquiry Type</td><td style="padding: 10px 0;">${enquiry}</td></tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; margin-bottom: 8px;">Message:</p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact enquiry error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
