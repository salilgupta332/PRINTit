import { Link } from "react-router-dom";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  printing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function AssignmentList({ assignments }) {
  return (
    <div className="mt-6">
      {assignments.length === 0 && (
        <p className="text-gray-500">No assignments yet</p>
      )}

      {assignments.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-6 py-4">Assignment Title</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Print Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {assignments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {a.assignmentTitle || "Untitled"}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {a.subjectName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.deadline).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {a.printPreferences?.printType === "color"
                      ? "Color"
                      : "B/W"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          statusStyles[a.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {a.status?.toUpperCase() || "PENDING"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link to={`/assignments/${a._id}`}>
                      <button className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AssignmentList;
