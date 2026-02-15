import { cn } from "@/lib/utils";

const orders = [
  { id: "#ORD-2451", customer: "Rahul Sharma", service: "Assignment Writing", amount: "₹850", status: "Completed", date: "Feb 14" },
  { id: "#ORD-2450", customer: "Priya Patel", service: "Notes Printing", amount: "₹320", status: "In Progress", date: "Feb 14" },
  { id: "#ORD-2449", customer: "Amit Kumar", service: "Project Report", amount: "₹1,500", status: "Pending", date: "Feb 13" },
  { id: "#ORD-2448", customer: "Sneha Gupta", service: "Spiral Binding", amount: "₹180", status: "Completed", date: "Feb 13" },
  { id: "#ORD-2447", customer: "Vikash Singh", service: "Internship Report", amount: "₹2,200", status: "In Progress", date: "Feb 12" },
  { id: "#ORD-2446", customer: "Neha Verma", service: "Question Papers", amount: "₹450", status: "Completed", date: "Feb 12" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-stat-green/15 text-stat-green",
  "In Progress": "bg-stat-blue/15 text-stat-blue",
  Pending: "bg-stat-orange/15 text-stat-orange",
};

export function RecentOrders() {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Orders</h3>
        <button className="text-sm text-primary hover:underline font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Service</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-primary">{order.id}</td>
                <td className="px-5 py-3.5 text-sm text-foreground">{order.customer}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{order.service}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">{order.amount}</td>
                <td className="px-5 py-3.5">
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", statusStyles[order.status])}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
