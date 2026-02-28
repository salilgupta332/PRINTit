import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";

export const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar onLoginClick={() => setShowLogin(true)} />
          <main className="flex-1 overflow-auto bg-background p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </SidebarProvider>
  );
};