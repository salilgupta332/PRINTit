import React from "react";
import { DollarSign, TrendingUp, AlertCircle, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { title: "Total Revenue", value: "₹48,200", change: "+8.2%", up: true, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "This Month", value: "₹12,400", change: "+5.1%", up: true, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Pending", value: "₹1,840", change: "+2.3%", up: false, icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { title: "Refunded", value: "₹620", change: "-1.2%", up: true, icon: RefreshCw, color: "text-red-500", bg: "bg-red-500/10" },
];

const monthlyData = [
  { month: "Sep", revenue: 8200 }, { month: "Oct", revenue: 9400 }, { month: "Nov", revenue: 7800 },
  { month: "Dec", revenue: 11200 }, { month: "Jan", revenue: 9800 }, { month: "Feb", revenue: 12400 },
];

const transactions = [
  { id: "TXN-001", customer: "Rahul Sharma", amount: "₹90", method: "UPI", date: "20 Feb", status: "Success" },
  { id: "TXN-002", customer: "Priya Singh", amount: "₹24", method: "Cash", date: "20 Feb", status: "Success" },
  { id: "TXN-003", customer: "Amit Kumar", amount: "₹40", method: "Card", date: "19 Feb", status: "Pending" },
  { id: "TXN-004", customer: "Sneha Patel", amount: "₹130", method: "UPI", date: "19 Feb", status: "Success" },
  { id: "TXN-005", customer: "Dev Rao", amount: "₹50", method: "Cash", date: "18 Feb", status: "Refunded" },
];

const statusColor: Record<string, string> = {
  Success: "bg-green-500/10 text-green-600",
  Pending: "bg-yellow-500/10 text-yellow-600",
  Refunded: "bg-red-500/10 text-red-600",
};

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
    {children}
  </div>
);

export const PaymentOverview = () => (
  <PageShell title="Payment Overview" description="Complete financial summary of your shop">
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title}>
          <CardContent className="p-4">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${s.bg}`}><s.icon size={18} className={s.color} /></div>
            <p className="text-xs text-muted-foreground">{s.title}</p>
            <p className="mt-1 text-xl font-bold">{s.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {s.up ? <ArrowUpRight size={12} className="text-green-500" /> : <ArrowDownRight size={12} className="text-red-500" />}
              <span className={`text-xs ${s.up ? "text-green-500" : "text-red-500"}`}>{s.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader><CardTitle>Monthly Revenue</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v) => [`₹${v}`, "Revenue"]} />
            <Bar dataKey="revenue" fill="hsl(231, 76%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </PageShell>
);

const TransactionTable = ({ filterFn, title, description }: { filterFn: (t: typeof transactions[0]) => boolean; title: string; description: string }) => (
  <PageShell title={title} description={description}>
    <Card>
      <CardContent className="pt-6">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">TXN ID</th><th className="pb-3 pr-4 font-medium">Customer</th>
            <th className="pb-3 pr-4 font-medium">Amount</th><th className="pb-3 pr-4 font-medium">Method</th>
            <th className="pb-3 pr-4 font-medium">Date</th><th className="pb-3 font-medium">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {transactions.filter(filterFn).map((t) => (
              <tr key={t.id} className="hover:bg-muted/30">
                <td className="py-3 pr-4 font-mono text-xs text-primary">{t.id}</td>
                <td className="py-3 pr-4 font-medium">{t.customer}</td>
                <td className="py-3 pr-4 font-semibold">{t.amount}</td>
                <td className="py-3 pr-4 text-muted-foreground">{t.method}</td>
                <td className="py-3 pr-4 text-muted-foreground">{t.date}</td>
                <td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[t.status]}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </PageShell>
);

export const TransactionHistory = () => <TransactionTable filterFn={() => true} title="Transaction History" description="All payment transactions" />;
export const PendingPayments = () => <TransactionTable filterFn={(t) => t.status === "Pending"} title="Pending Payments" description="Payments awaiting confirmation" />;
export const Refunds = () => <TransactionTable filterFn={(t) => t.status === "Refunded"} title="Refunds" description="Processed refund transactions" />;
