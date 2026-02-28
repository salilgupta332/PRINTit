import React from "react";
import AuthGate from "@/components/AuthGate";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Printer,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const stats = [
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12.5%",
    up: true,
    icon: ShoppingBag,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Total Revenue",
    value: "₹48,200",
    change: "+8.2%",
    up: true,
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Pending Orders",
    value: "47",
    change: "-3.1%",
    up: false,
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Completed",
    value: "1,198",
    change: "+15.3%",
    up: true,
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Cancelled",
    value: "39",
    change: "+2.4%",
    up: false,
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Total Customers",
    value: "342",
    change: "+5.7%",
    up: true,
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const revenueData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 3800 },
  { day: "Wed", revenue: 5100 },
  { day: "Thu", revenue: 4700 },
  { day: "Fri", revenue: 6800 },
  { day: "Sat", revenue: 7200 },
  { day: "Sun", revenue: 3500 },
];

const ordersData = [
  { service: "Notes", orders: 320 },
  { service: "Assignments", orders: 245 },
  { service: "Official Docs", orders: 180 },
  { service: "Binding", orders: 156 },
  { service: "Lamination", orders: 98 },
  { service: "Others", orders: 67 },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Sharma", service: "Notes Print", pages: 45, status: "Printing", time: "5m ago", amount: "₹90" },
  { id: "#ORD-002", customer: "Priya Singh", service: "Assignment", pages: 12, status: "Pending", time: "12m ago", amount: "₹24" },
  { id: "#ORD-003", customer: "Amit Kumar", service: "Official Doc", pages: 8, status: "Completed", time: "25m ago", amount: "₹40" },
  { id: "#ORD-004", customer: "Sneha Patel", service: "Binding", pages: 60, status: "Completed", time: "1h ago", amount: "₹130" },
  { id: "#ORD-005", customer: "Dev Rao", service: "Lamination", pages: 5, status: "Pending", time: "2h ago", amount: "₹50" },
];

const statusColors: Record<string, string> = {
  Printing: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Completed: "bg-green-500/10 text-green-600 dark:text-green-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const Dashboard = () => {
  return (
    <AuthGate>
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at PRINTit today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${stat.bg}`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
              <p className="mt-1 text-xl font-bold">{stat.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {stat.up ? (
                  <ArrowUpRight size={12} className="text-green-500" />
                ) : (
                  <ArrowDownRight size={12} className="text-red-500" />
                )}
                <span className={`text-xs font-medium ${stat.up ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Revenue for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
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
                  formatter={(val) => [`₹${val}`, "Revenue"]}
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

        {/* Services Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Service</CardTitle>
            <CardDescription>Most requested services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ordersData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="service" type="category" tick={{ fontSize: 11 }} width={70} />
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
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders across all services</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Printer size={12} />
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
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs font-medium text-primary">{order.id}</td>
                    <td className="py-3 pr-4 font-medium">{order.customer}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{order.service}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{order.pages}</td>
                    <td className="py-3 pr-4 font-semibold">{order.amount}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
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
