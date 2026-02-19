interface DocumentEmailProps {
  title: string;
  files: { name: string; url: string }[];
}

export function DocumentEmail({ title, files }: DocumentEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h2>Your document is ready 📄</h2>

      <p>
        You requested access to:
        <strong> {title}</strong>
      </p>

      <p>Download your files below:</p>

      <ul>
        {files.map((file) => (
          <li key={file.url}>
            <a href={file.url} target="_blank">
              {file.name}
            </a>
          </li>
        ))}
      </ul>

      <hr />

      <p style={{ fontSize: "14px", color: "#666" }}>
        Payment enforcement will be enabled soon.
        Please keep this email for reference.
      </p>

      <p>— SGC Team</p>
    </div>
  );
}
