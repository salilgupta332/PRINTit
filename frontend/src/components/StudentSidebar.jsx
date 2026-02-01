import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentSidebar.css";

function StudentSidebar() {
  const navigate = useNavigate();
  const [openAssignments, setOpenAssignments] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="sidebar">
      <div className="sidebar-title">📘 Student</div>

      {/* 🌗 Theme Toggle */}
      {/* <div className="sidebar-item toggle-item">
        <span>{darkMode ? "🌙 Dark" : "☀️ Light"}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div> */}

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
