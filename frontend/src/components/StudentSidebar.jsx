import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentSidebar.css";

function StudentSidebar() {
  const navigate = useNavigate();
  const [openAssignments, setOpenAssignments] = useState(false);



  return (
    <div className="sidebar">
      <div className="sidebar-title">📘 Student</div>



      <div className="sidebar-item" onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </div>

      <div
        className="sidebar-item"
        onClick={() => setOpenAssignments(!openAssignments)}
      >
        📄 Assignments
        <span className="arrow">{openAssignments ? "▲" : "▼"}</span>
      </div>

      {openAssignments && (
        <div className="sidebar-submenu">
          <div onClick={() => navigate("/dashboard/create-assignment")}>
            ➕ Create Assignment
          </div>
          <div onClick={() => navigate("/dashboard/my-assignments")}>
            📂 My Assignments
          </div>
        </div>
      )}

      <div className="sidebar-item" onClick={() => navigate("/print")}>
        🖨 Print Documents
      </div>

      <div className="sidebar-item" onClick={() => navigate("/orders")}>
        📦 My Orders
      </div>

      <div className="sidebar-item" onClick={() => navigate("/profile")}>
        👤 Profile
      </div>

      <div className="sidebar-item" onClick={() => navigate("/support")}>
        ❓ Support
      </div>
    </div>
  );
}

export default StudentSidebar;
