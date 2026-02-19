import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PreviewModal({ file, onClose }) {
  const { token } = useAuth();
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!file?.key) return;

    async function fetchSignedUrl() {
      try {
        const encodedKey = encodeURIComponent(file.key);

       const res = await fetch(
  `http://localhost:5000/api/admin/assignments/file?key=${encodeURIComponent(file.key)}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        if (!res.ok) throw new Error("Failed to get secure URL");

        const data = await res.json();
        setFileUrl(data.url);
      } catch (err) {
        console.error("Preview error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSignedUrl();
  }, [file, token]);

  if (!file) return null;

  const extension = file.filename.split(".").pop().toLowerCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold">{file.filename}</h2>
          <button onClick={onClose} className="text-red-500 text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-[80vh] overflow-auto flex items-center justify-center">
          {loading ? (
            <p className="text-gray-500">Generating secure preview...</p>
          ) : extension === "pdf" ? (
            <iframe
              src={fileUrl}
              className="w-full h-full rounded border"
              title={file.filename}
            />
          ) : ["jpg", "jpeg", "png", "webp"].includes(extension) ? (
            <img
              src={fileUrl}
              alt={file.filename}
              className="max-w-full mx-auto"
            />
          ) : (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              Download File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}