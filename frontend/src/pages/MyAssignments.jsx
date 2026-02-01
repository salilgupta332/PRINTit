import { useEffect, useState } from "react";
import AssignmentList from "../components/AssignmentList";
import { getMyAssignments } from "../api/assignmentApi";

function MyAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await getMyAssignments();
      setAssignments(data);
    } catch (err) {
      setError(err.message || "Failed to load assignments");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900">
        My Assignments
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Track and manage your submitted assignments
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <AssignmentList assignments={assignments} />
    </div>
  );
}

export default MyAssignments;
