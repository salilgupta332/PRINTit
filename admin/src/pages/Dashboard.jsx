import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import DashboardStatCard from "../components/DashboardStatCard";
import {apiFetch} from "../api/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  
  const [stats, setStats] = useState({
    total: "—",
    pending: "—",
    completed: "—",
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadStats = async () => {
      try {
        const data = await apiFetch("/admin/dashboard/stats");
        setStats(data);
      } catch (err) {
        
      }
    };

    loadStats();
  }, [isAuthenticated]);


  return (
    <AdminLayout>
      <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500 mt-1">
        Overview of PRINTit system
      </p>

      {!isAuthenticated && (
        <div className="mt-4 rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-800">
          You are viewing this dashboard in <b>read-only mode</b>.
          Please login to perform admin actions.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashboardStatCard
          title="Total Assignments"
          value={stats.total}
        />
        <DashboardStatCard
          title="Pending Requests"
          value={stats.pending}
        />
        <DashboardStatCard
          title="Completed"
          value={stats.completed}
        />
      </div>
    </div>
    </AdminLayout>
  );
}
