import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { apiGet } from "../api/client";
import { apiPut } from "../api/client";
import { useAuth } from "../context/AuthContext";
import StatusDropdown from "../components/StatusDropdown";
import FilePreview from "../components/FilePreview";
import PreviewModal from "../components/PreviewModal";
export default function AssignmentDetails() {
  const { id } = useParams();
  const { token, loading } = useAuth();
  const [assignment, setAssignment] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  async function handleStatusChange(newStatus) {
    try {
      setUpdating(true);

      const updated = await apiPut(
        `/admin/assignments/${id}/status`,
        { status: newStatus },
        token,
      );

      setAssignment(updated.assignment);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    if (loading) return;

    async function fetchAssignment() {
      try {
        const data = await apiGet(`/admin/assignments/${id}`, token);
        setAssignment(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchAssignment();
  }, [id, token, loading]);

  if (!assignment) {
    return (
      <AdminLayout>
        <p className="text-gray-500">Loading assignment...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{assignment.assignmentTitle}</h1>
        <p className="text-gray-500">Assignment Details</p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
        {/* Student */}
        <Detail label="Student">{assignment.student?.name || "Student"}</Detail>

        {/* Deadline */}
        <Detail label="Deadline">
          {new Date(assignment.deadline).toLocaleDateString()}
        </Detail>

        {/* Academic Level */}
        <Detail label="Academic Level">{assignment.academicLevel}</Detail>

        {/* Subject */}
        <Detail label="Subject">{assignment.subjectName}</Detail>

        {/* Assignment Type */}
        <Detail label="Assignment Type">
          {assignment.assignmentType.replace("_", " ")}
        </Detail>

        {/* Status */}
        <Detail label="Status">
          <StatusDropdown
            value={assignment.status}
            onChange={handleStatusChange}
            disabled={updating}
          />

          {updating && (
            <p className="text-xs text-gray-500 mt-1">Updating status...</p>
          )}
        </Detail>
      </div>

      {/* Print Preferences */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Print Preferences</h2>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>📄 Type: {assignment.printPreferences.printType}</li>
          <li>📎 Binding: {assignment.printPreferences.bindingType}</li>
          <li>📐 Paper Size: {assignment.printPreferences.paperSize}</li>
          <li>🖨 Copies: {assignment.printPreferences.copies}</li>
        </ul>
      </div>

      {/* Uploaded Files */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded File</h3>

        {assignment.uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded px-4 py-2 mb-2"
          >
            <span className="text-sm">{file.filename}</span>

            <button
              onClick={() => setPreviewFile(file)}
              className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
            >
              Preview
            </button>
          </div>
        ))}
        {previewFile && (
          <PreviewModal
            file={previewFile}
            onClose={() => setPreviewFile(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
