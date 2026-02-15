import { ShoppingCart, Users, IndianRupee, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ServiceBreakdown } from "@/components/dashboard/ServiceBreakdown";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

const stats = [
  { title: "Total Orders", value: "1,284", change: "12.5%", changeType: "up" as const, icon: ShoppingCart, variant: "blue" as const },
  { title: "Active Customers", value: "842", change: "8.2%", changeType: "up" as const, icon: Users, variant: "green" as const },
  { title: "Revenue", value: "₹1,82,400", change: "14.2%", changeType: "up" as const, icon: IndianRupee, variant: "orange" as const },
  { title: "Growth Rate", value: "23.1%", change: "3.1%", changeType: "up" as const, icon: TrendingUp, variant: "purple" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ServiceBreakdown />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
