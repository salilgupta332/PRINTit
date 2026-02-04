import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../api/client";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  requested: "bg-yellow-100 text-yellow-700",
  printing: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
        statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function Assignments() {
  const { isAuthenticated, token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log("assignments:", assignments);
  console.log("loading:", loading);
  console.log("token:", token);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true);
        const data = await apiGet("/admin/assignments", token);
        console.log("Fetched data:", data);

        // Handle different response formats
        if (Array.isArray(data)) {
          setAssignments(data);
        } else if (data?.assignments && Array.isArray(data.assignments)) {
          setAssignments(data.assignments);
        } else if (data?.data && Array.isArray(data.data)) {
          setAssignments(data.data);
        } else {
          console.warn("Unexpected data format:", data);
          setAssignments([]);
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchAssignments();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="text-gray-500">
          Manage and track all student assignments
        </p>
      </div>

      {/* Read only banner */}
      {!isAuthenticated && (
        <div className="mb-4 rounded border border-yellow-200 bg-yellow-50 p-3 text-yellow-700">
          Read-only mode. Login required to take actions.
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
          Error: {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading assignments...</div>
        </div>
      )}

      {/* Empty state */}
      {!loading && assignments.length === 0 && (
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <p className="text-gray-500">No assignments found.</p>
        </div>
      )}

      {/* Table */}
      {!loading && assignments.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Assignment
                </th>
                <th className="px-6 py-4 text-left font-semibold">Student</th>
                <th className="px-6 py-4 text-left font-semibold">Deadline</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Print Type
                </th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr
                  key={a._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  {/* Assignment */}
                  <td className="px-6 py-4 font-medium">
                    {a.assignmentTitle || "Untitled"}
                  </td>
                  {/* Student */}
                  <td className="px-6 py-4 text-gray-700">
                    {a.student?.name || "Unknown Student"}
                  </td>
                  {/* Deadline */}
                  <td className="px-6 py-4">
                    {a.deadline
                      ? new Date(a.deadline).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "No deadline"}
                  </td>
                  {/* Print Type */}
                  <td className="px-6 py-4 capitalize">
                    {a.printPreferences?.printType?.replace("_", " ") ||
                      "Standard"}
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={a.status || "pending"} />
                  </td>
                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/assignments/${a._id}`)}
                      className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
