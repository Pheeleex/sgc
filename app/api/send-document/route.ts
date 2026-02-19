import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_Aa7cqsj4_7QesoiYTSRhvQ9MB6bMTe7ct");

interface FileItem {
  name: string;
  url: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, title, files } = body as {
      email?: string;
      title?: string;
      files?: FileItem[];
    };

    // Validation
    if (!email || !title || !files || files.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: `Your document: ${title}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
          <h2>${title}</h2>
          <p>Thanks for requesting this document.</p>

          <p><strong>Your download links:</strong></p>
          <ul>
            ${files
              .map(
                (file) =>
                  `<li><a href="${file.url}" target="_blank" rel="noopener noreferrer">
                    ${file.name}
                  </a></li>`
              )
              .join("")}
          </ul>

          <p style="margin-top: 24px; font-size: 14px; color: #666;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send document error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
