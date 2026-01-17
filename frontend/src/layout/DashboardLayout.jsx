import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <StudentSidebar />
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;