import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstname, email } = body;

    if (!firstname || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Plaidate <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Plaidate Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2E4F21;">Welcome to Plaidate, ${firstname}!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
          <p>We'll notify you as soon as Plaidate is available for early access.</p>
          <p>Best regards,<br>The Plaidate Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Mail route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}