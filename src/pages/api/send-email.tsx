import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const data = await req.json();
    const { name, email, message } = data;

    // Validate input
    if (!name || !email || !message) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid email address' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `New message from ${name} - Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7f5af0; border-bottom: 2px solid #7f5af0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <p><strong style="color: #7f5af0;">Name:</strong> ${name}</p>
          <p><strong style="color: #7f5af0;">Email:</strong> ${email}</p>
          <p><strong style="color: #7f5af0;">Message:</strong></p>
          <div style="background: #f5f5f7; padding: 15px; border-radius: 5px; border-left: 3px solid #7f5af0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <br>
          <p style="font-size: 0.9em; color: #666;">
            This message was sent from your portfolio contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return new NextResponse(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new NextResponse(JSON.stringify({ message: error.message || 'Failed to send message. Please try again later.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}