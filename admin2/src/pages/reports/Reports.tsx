import React from "react";
import { TrendingUp, Calendar, Star, Download, BarChart3, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const dailyData = [
  { hour: "9am", revenue: 400 }, { hour: "10am", revenue: 800 }, { hour: "11am", revenue: 1200 },
  { hour: "12pm", revenue: 600 }, { hour: "1pm", revenue: 300 }, { hour: "2pm", revenue: 900 },
  { hour: "3pm", revenue: 1400 }, { hour: "4pm", revenue: 1100 }, { hour: "5pm", revenue: 800 },
  { hour: "6pm", revenue: 600 }, { hour: "7pm", revenue: 400 }, { hour: "8pm", revenue: 200 },
];

const monthlyData = [
  { month: "Sep", revenue: 8200 }, { month: "Oct", revenue: 9400 }, { month: "Nov", revenue: 7800 },
  { month: "Dec", revenue: 11200 }, { month: "Jan", revenue: 9800 }, { month: "Feb", revenue: 12400 },
];

const serviceShare = [
  { name: "Notes", value: 320 },
  { name: "Assignments", value: 245 },
  { name: "Official Docs", value: 180 },
  { name: "Binding", value: 156 },
  { name: "Others", value: 165 },
];

const COLORS = ["hsl(231,76%,55%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(280,70%,60%)"];

const topCustomers = [
  { rank: 1, name: "Kavya Reddy", orders: 41, spent: "₹5,330" },
  { rank: 2, name: "Sneha Patel", orders: 32, spent: "₹4,160" },
  { rank: 3, name: "Rahul Sharma", orders: 24, spent: "₹2,880" },
  { rank: 4, name: "Priya Singh", orders: 18, spent: "₹1,440" },
  { rank: 5, name: "Amit Kumar", orders: 9, spent: "₹720" },
];

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
    {children}
  </div>
);

export const DailyRevenue = () => (
  <PageShell title="Daily Revenue Report" description="Today's hourly revenue breakdown">
    <Card>
      <CardHeader><CardTitle>Today's Revenue by Hour</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(231,76%,55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(231,76%,55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v) => [`₹${v}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(231,76%,55%)" fill="url(#colorRev)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    <div className="grid grid-cols-3 gap-4">
      {[{ label: "Today's Revenue", value: "₹8,200" }, { label: "Total Orders", value: "82" }, { label: "Avg Order Value", value: "₹100" }].map((s) => (
        <Card key={s.label}><CardContent className="p-6 text-center"><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></CardContent></Card>
      ))}
    </div>
  </PageShell>
);

export const MonthlyReport = () => (
  <PageShell title="Monthly Report" description="6-month revenue trend analysis">
    <Card>
      <CardHeader><CardTitle>Revenue Trend (Last 6 Months)</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v) => [`₹${v}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(142,71%,45%)" fill="url(#colorMonth)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>Orders by Service</CardTitle></CardHeader>
      <CardContent className="flex justify-center">
        <PieChart width={400} height={240}>
          <Pie data={serviceShare} cx={200} cy={100} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {serviceShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  </PageShell>
);

export const TopCustomers = () => (
  <PageShell title="Top Customers" description="Most frequent and highest-spending customers">
    <Card>
      <CardHeader><CardTitle>Customer Rankings</CardTitle></CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Rank</th><th className="pb-3 pr-4 font-medium">Customer</th>
            <th className="pb-3 pr-4 font-medium">Orders</th><th className="pb-3 font-medium">Total Spent</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {topCustomers.map((c) => (
              <tr key={c.rank} className="hover:bg-muted/30">
                <td className="py-3 pr-4">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${c.rank === 1 ? "bg-yellow-500/20 text-yellow-600" : c.rank === 2 ? "bg-gray-500/20 text-gray-600" : "bg-orange-500/20 text-orange-600"}`}>
                    {c.rank}
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium">{c.name}</td>
                <td className="py-3 pr-4">{c.orders} orders</td>
                <td className="py-3 font-semibold text-green-600 dark:text-green-400">{c.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </PageShell>
);

export const DownloadCSV = () => (
  <PageShell title="Download Reports" description="Export your data as CSV files">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[
        { title: "Orders Report", desc: "All orders with details", icon: BarChart3 },
        { title: "Revenue Report", desc: "Financial transactions", icon: TrendingUp },
        { title: "Customer Report", desc: "Customer data and stats", icon: Star },
        { title: "Monthly Summary", desc: "Monthly performance summary", icon: Calendar },
      ].map((r) => (
        <Card key={r.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <r.icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2"><Download size={14} />CSV</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </PageShell>
);
