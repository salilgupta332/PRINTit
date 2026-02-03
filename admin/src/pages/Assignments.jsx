import AdminLayout from "../components/layout/AdminLayout";

export default function Assignments() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-1">Assignments</h1>
      <p className="text-gray-500 mb-6">
        Manage and track all student assignments
      </p>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Assignment</th>
              <th className="p-4">Student</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">—</td>
              <td className="p-4">—</td>
              <td className="p-4">12/02/2026</td>
              <td className="p-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  requested
                </span>
              </td>
              <td className="p-4">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
