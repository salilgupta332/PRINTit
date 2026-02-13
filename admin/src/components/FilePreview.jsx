export default function FilePreview({ file }) {
  if (!file || !file.path) {
    return (
      <p className="text-sm text-red-500">
        Invalid file data
      </p>
    );
  }

  const fileUrl = `http://localhost:5000/${file.path}`;
  const mimeType = file.mimetype || "";
  const extension = file.filename?.split(".").pop()?.toLowerCase();

  // PDF (by mimetype OR extension)
  if (
    mimeType === "application/pdf" ||
    extension === "pdf"
  ) {
    return (
      <iframe
        src={fileUrl}
        title={file.filename}
        className="w-full h-125 border rounded"
      />
    );
  }

  // Image (jpg, png, jpeg, webp)
  if (
    mimeType.startsWith("image/") ||
    ["jpg", "jpeg", "png", "webp"].includes(extension)
  ) {
    return (
      <img
        src={fileUrl}
        alt={file.filename}
        className="max-w-full rounded border"
      />
    );
  }

  // Other files → download
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 underline"
    >
      Download {file.filename}
    </a>
  );
}
