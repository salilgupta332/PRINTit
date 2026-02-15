import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Notes & Printing", value: 35, color: "hsl(230 70% 55%)" },
  { name: "Assignments", value: 28, color: "hsl(160 60% 45%)" },
  { name: "Projects & Reports", value: 20, color: "hsl(30 85% 55%)" },
  { name: "Exam Utilities", value: 12, color: "hsl(270 60% 55%)" },
  { name: "Formatting", value: 5, color: "hsl(340 65% 55%)" },
];

export function ServiceBreakdown() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground mb-4">Service Breakdown</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(0 0% 100%)",
              border: "1px solid hsl(220 15% 90%)",
              borderRadius: "12px",
            }}
            formatter={(value: number) => [`${value}%`, "Share"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
