import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Aug", revenue: 12000 },
  { month: "Sep", revenue: 18500 },
  { month: "Oct", revenue: 15000 },
  { month: "Nov", revenue: 22000 },
  { month: "Dec", revenue: 19000 },
  { month: "Jan", revenue: 28000 },
  { month: "Feb", revenue: 32000 },
];

export function RevenueChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Monthly earnings trend</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">₹32,000</p>
          <p className="text-xs text-stat-green font-medium">↑ 14.2% this month</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(230 70% 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(230 70% 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip
            contentStyle={{
              background: "hsl(0 0% 100%)",
              border: "1px solid hsl(220 15% 90%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px hsl(0 0% 0% / 0.1)",
            }}
            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
          />
          <Area type="monotone" dataKey="revenue" stroke="hsl(230 70% 55%)" strokeWidth={2.5} fill="url(#revenueGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
