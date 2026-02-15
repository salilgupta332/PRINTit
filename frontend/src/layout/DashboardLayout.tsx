import { useState } from "react";
import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
     <div className="min-h-screen bg-white text-gray-900 !dark:bg-white !dark:text-gray-900">
      {/* Sidebar */}
      <StudentSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Content Area */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-67.5",
        )}
      >
        {/* Topbar */}
        <DashboardTopbar
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main content ALWAYS LIGHT */}
         <main className="light-area min-h-[calc(100vh-64px)] p-6 bg-background text-foreground">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
