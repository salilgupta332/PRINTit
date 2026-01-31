import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

const API_URL = process.env.REACT_APP_API_URL;

function AdminDashboard() {
  const { adminToken, logout } = useAdminAuth();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/assignments`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAssignments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/assignments/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchAssignments(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>PRTNTit – Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>All Assignments</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.subject}</td>
              <td>{a.pages}</td>
              <td>{a.price}</td>
              <td>{a.status}</td>
              <td>
                <select
                  value={a.status}
                  onChange={(e) =>
                    updateStatus(a._id, e.target.value)
                  }
                >
                  <option value="requested">requested</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
