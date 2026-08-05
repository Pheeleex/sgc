import { Resend } from "resend";

import { getRequiredEnv, getSiteUrl } from "@/lib/server/env";

interface SendGuideFilesEmailInput {
  email: string;
  files: { downloadUrl: string; name: string }[];
  guideTitle: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getResendClient() {
  return new Resend(getRequiredEnv("RESEND_API_KEY"));
}

export async function sendGuideFilesEmail({
  email,
  files,
  guideTitle,
}: SendGuideFilesEmailInput) {
  const resend = getResendClient();
  const response = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Soft Girl Circle <onboarding@resend.dev>",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #23181d;">
        <h2 style="margin-bottom: 8px;">Your guide is ready</h2>
        <p>Thanks for your order. You now have access to <strong>${escapeHtml(guideTitle)}</strong>.</p>
        <p>Download your files below:</p>
        <ul>
          ${files
            .map(
              (file) =>
                `<li><a href="${escapeHtml(file.downloadUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(file.name)}</a></li>`
            )
            .join("")}
        </ul>
        <p style="margin-top: 24px;">If you need help with your order, reply to this email and we’ll take care of it.</p>
      </div>
    `,
    subject: `Your guide is ready: ${guideTitle}`,
    to: email,
  });

  if (response.error) {
    throw new Error(response.error.message ?? "Failed to send guide email.");
  }

  return response.data;
}

export function buildGuideFileDownloadUrl(input: {
  fileIndex: number;
  reference: string;
  token: string;
}) {
  const params = new URLSearchParams({ token: input.token });

  return `${getSiteUrl()}/api/orders/${encodeURIComponent(input.reference)}/files/${
    input.fileIndex
  }?${params.toString()}`;
}
