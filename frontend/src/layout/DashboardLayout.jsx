import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <StudentSidebar />
      <main style={{ flex: 1, padding: "24px", background: "#f8fafc" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;