import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { cn } from "@/lib/utils";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar"; 

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-[270px]"
        )}
      >
        <DashboardTopbar onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
