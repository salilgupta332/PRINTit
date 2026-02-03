import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of PRINTit system</p>
      </div>

      {/* Read-only warning (ONLY when not logged in) */}
      {!isAuthenticated && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
          <p className="text-yellow-700">
            You are viewing this dashboard in{" "}
            <span className="font-semibold">read-only mode</span>.  
            Please login to perform admin actions.
          </p>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Total Assignments
          </h3>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Pending Requests
          </h3>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Completed
          </h3>
          <p className="mt-2 text-2xl font-semibold">—</p>
        </div>
      </div>
    </AdminLayout>
  );
}
