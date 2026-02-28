import { FileText, Printer, Package, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const stats = [
  { icon: FileText, label: "Total Orders", value: "12", color: "text-blue-500 bg-blue-500/10" },
  { icon: Printer, label: "In Progress", value: "3", color: "text-primary bg-primary/10" },
  { icon: Package, label: "Delivered", value: "8", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Clock, label: "Pending", value: "1", color: "text-amber-500 bg-amber-500/10" },
];

const monthlyData = [
  { month: "Sep", orders: 2 },
  { month: "Oct", orders: 5 },
  { month: "Nov", orders: 3 },
  { month: "Dec", orders: 7 },
  { month: "Jan", orders: 4 },
  { month: "Feb", orders: 12 },
];

const serviceBreakdown = [
  { name: "Assignments", value: 5, color: "hsl(262, 83%, 58%)" },
  { name: "Notes", value: 3, color: "hsl(24, 95%, 53%)" },
  { name: "Official Docs", value: 2, color: "hsl(160, 60%, 45%)" },
  { name: "Business", value: 2, color: "hsl(45, 90%, 50%)" },
];

const statusBreakdown = [
  { name: "Delivered", value: 8, color: "hsl(160, 60%, 45%)" },
  { name: "In Progress", value: 3, color: "hsl(262, 83%, 58%)" },
  { name: "Pending", value: 1, color: "hsl(45, 90%, 50%)" },
];

const recentOrders = [
  { id: "ORD-001", service: "Assignment Print", status: "Delivered", date: "2026-02-20" },
  { id: "ORD-002", service: "Notes Printing", status: "In Progress", date: "2026-02-22" },
  { id: "ORD-003", service: "Official Document", status: "Pending", date: "2026-02-23" },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your orders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl shadow-card p-5">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Services */}
        <div className="bg-card border border-border rounded-xl shadow-card p-5">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Orders by Service</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={serviceBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {serviceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Pie Chart - Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl shadow-card p-5">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Order Status Overview</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="p-5 border-b border-border">
            <h2 className="font-display text-lg font-semibold text-card-foreground">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Service</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-card-foreground">{order.id}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{order.service}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600" :
                        order.status === "In Progress" ? "bg-primary/10 text-primary" :
                        "bg-amber-500/10 text-amber-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
