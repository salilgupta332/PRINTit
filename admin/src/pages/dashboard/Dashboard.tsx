import React, { useEffect, useState } from "react";
import AuthGate from "@/components/AuthGate";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Printer,
  ArrowUpRight,
  AreaChart as AreaChartIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/api/client";

const statusColors: Record<string, string> = {
  Printing: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Completed: "bg-green-500/10 text-green-600 dark:text-green-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
  Accepted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "In Progress": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Dispatched: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

const emptyDashboard = {
  stats: {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    printingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalCustomers: 0,
  },
  revenueData: [],
  ordersByService: [],
  recentOrders: [],
};

const Dashboard = () => {
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState<any>(emptyDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await apiGet("/admin/dashboard/stats", token);
        setDashboard({
          stats: {
            ...emptyDashboard.stats,
            ...(data?.stats || {}),
          },
          revenueData: data?.revenueData || [],
          ordersByService: data?.ordersByService || [],
          recentOrders: data?.recentOrders || [],
        });
      } catch (error) {
        console.error("Failed to load dashboard", error);
        setDashboard(emptyDashboard);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const stats = [
    {
      title: "Total Orders",
      value: dashboard.stats.totalOrders.toLocaleString(),
      subtitle: "Orders visible to your shop",
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Revenue",
      value: `Rs ${dashboard.stats.totalRevenue.toLocaleString()}`,
      subtitle: "Completed order revenue",
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Pending Orders",
      value: dashboard.stats.pendingOrders.toLocaleString(),
      subtitle: "Waiting for action",
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Completed",
      value: dashboard.stats.completedOrders.toLocaleString(),
      subtitle: "Delivered successfully",
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Cancelled",
      value: dashboard.stats.cancelledOrders.toLocaleString(),
      subtitle: "No cancelled state yet",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Total Customers",
      value: dashboard.stats.totalCustomers.toLocaleString(),
      subtitle: "Unique customer records",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <AuthGate>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Live performance snapshot for your shop.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className={`mb-3 inline-flex rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="mt-1 text-xl font-bold">
                  {loading ? "..." : stat.value}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight size={12} className={stat.color} />
                  <span>{stat.subtitle}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Revenue</CardTitle>
              <CardDescription>Revenue from orders created in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dashboard.revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(231, 76%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(231, 76%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(val) => [`Rs ${val}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(231, 76%, 55%)"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders by Service</CardTitle>
              <CardDescription>Most requested services for your shop</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboard.ordersByService.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dashboard.ordersByService} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="service" type="category" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="orders" fill="hsl(231, 76%, 55%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                  No service data yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest 5 orders available to your shop</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              {dashboard.recentOrders.length > 0 ? (
                <Printer size={12} />
              ) : (
                <AreaChartIcon size={12} />
              )}
              Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Order ID</th>
                    <th className="pb-3 pr-4 font-medium">Customer</th>
                    <th className="pb-3 pr-4 font-medium">Service</th>
                    <th className="pb-3 pr-4 font-medium">Pages</th>
                    <th className="pb-3 pr-4 font-medium">Amount</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dashboard.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs font-medium text-primary">
                        {order.id}
                      </td>
                      <td className="py-3 pr-4 font-medium">{order.customer}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{order.service}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{order.pages}</td>
                      <td className="py-3 pr-4 font-semibold">{order.amount}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-slate-500/10 text-slate-600 dark:text-slate-400"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{order.time}</td>
                    </tr>
                  ))}
                  {!loading && dashboard.recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-muted-foreground">
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGate>
  );
};

export default Dashboard;
