import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, project, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <noreply@Risa Darma Putripratama.com>", // Ganti dengan domain kamu
      to: [process.env.CONTACT_TO_EMAIL!],
      reply_to: email,
      subject: `[Portfolio] Pesan baru dari ${name} — ${project}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #fafaf8;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">
            Pesan Baru dari Portfolio
          </h2>
          <p style="font-size: 13px; color: #6b6b6b; margin-bottom: 24px;">
            Diterima melalui form kontak
          </p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3; color: #6b6b6b; width: 120px;">Nama</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3; color: #1a1a1a; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3; color: #6b6b6b;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3;">
                <a href="mailto:${email}" style="color: #e07b39;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3; color: #6b6b6b;">Jenis Project</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e3; color: #1a1a1a;">${project}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid #e5e5e3; border-radius: 8px;">
            <p style="font-size: 12px; color: #6b6b6b; margin-bottom: 8px;">Pesan:</p>
            <p style="font-size: 14px; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 24px; font-size: 12px; color: #9b9b9b;">
            Balas email ini untuk membalas langsung ke ${name}.
          </p>
        </div>
      `,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Gagal mengirim" }, { status: 500 });
  }
}
