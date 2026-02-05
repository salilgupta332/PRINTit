export default function PreviewModal({ file, onClose }) {
  if (!file) return null;

  const fileUrl = `http://localhost:5000/${file.path}`;
  const extension = file.filename.split(".").pop().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-5xl rounded-lg shadow-lg relative">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold">{file.filename}</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-[80vh] overflow-auto">
          {extension === "pdf" ? (
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
