import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../api/client";

export default function Assignments() {
  const { isAuthenticated, token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await apiGet(
          "/admin/assignments",
          isAuthenticated ? token : null
        );
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [isAuthenticated, token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-1">Assignments</h1>
      <p className="text-gray-500 mb-6">
        Manage and track all student assignments
      </p>

      {!isAuthenticated && (
        <div className="mb-4 rounded border border-yellow-200 bg-yellow-50 p-3 text-yellow-700">
          Read-only mode. Login required to perform actions.
        </div>
      )}

      {loading && <p>Loading assignments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Deadline</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a) => (
                <tr key={a._id} className="border-b">
                  <td className="p-4">
                    {new Date(a.deadline).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {a.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {isAuthenticated ? (
                      <button className="rounded bg-indigo-600 px-4 py-2 text-white">
                        View
                      </button>
                    ) : (
                      <button
                        disabled
                        className="cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-gray-600"
                      >
                        Login required
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {assignments.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
                    No assignments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
