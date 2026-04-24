import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandName, contactPerson, email, collaborationType, budgetRange, message } = body;

    if (!brandName || !contactPerson || !email || !collaborationType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email delivery — configure these env vars in Vercel project settings:
    //   BRAND_ENQUIRY_EMAIL   → recipient address (e.g. brands@sunitjadhav.com)
    //   SMTP_HOST             → e.g. smtp.gmail.com
    //   SMTP_PORT             → e.g. 587
    //   SMTP_SECURE           → true | false
    //   SMTP_USER             → SMTP login email
    //   SMTP_PASS             → SMTP password / app password
    if (process.env.SMTP_HOST && process.env.BRAND_ENQUIRY_EMAIL) {
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
        to: process.env.BRAND_ENQUIRY_EMAIL,
        replyTo: email,
        subject: `Brand Enquiry: ${brandName} — ${collaborationType}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; color: #222;">
            <h2 style="margin-bottom: 24px;">New Brand Partnership Enquiry</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 10px 0; color: #666; width: 160px;">Brand Name</td><td style="padding: 10px 0;"><strong>${brandName}</strong></td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Contact Person</td><td style="padding: 10px 0;">${contactPerson}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Collaboration Type</td><td style="padding: 10px 0;">${collaborationType}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Budget Range</td><td style="padding: 10px 0;">${budgetRange || 'Not specified'}</td></tr>
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
    console.error('Brand enquiry error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
