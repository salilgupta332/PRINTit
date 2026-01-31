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
    <div style={{ padding: "40px" }}>
      <h2>My Assignments</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <AssignmentList assignments={assignments} />
    </div>
  );
}

export default MyAssignments;
