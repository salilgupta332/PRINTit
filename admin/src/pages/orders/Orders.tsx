import React, { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/api/client";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  printing: "bg-blue-500/10 text-blue-600",
  requested: "bg-yellow-500/10 text-yellow-600",
  delivered: "bg-green-500/10 text-green-600",
  pending: "bg-yellow-500/10 text-yellow-600",
};

interface OrdersTableProps {
  filterStatus?: string;
  title: string;
  description: string;
}

const OrdersTable = ({ filterStatus, title, description }: OrdersTableProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ================= FETCH ASSIGNMENTS =================
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await apiGet("/admin/assignments", token);

        let assignments: any[] = [];

        if (Array.isArray(data)) assignments = data;
        else if (data?.assignments) assignments = data.assignments;
        else if (data?.data) assignments = data.data;

        // ===== TRANSFORM TO UI FORMAT =====
        const mapped = assignments.map((a) => ({
          id: a._id,
          customer: a.customer?.name || a.frontPageDetails?.studentName || "Unknown Student",
            service:
    a.assignmentType === "from_scratch"
      ? "Typing / Writing"
      : a.assignmentType === "student_upload"
      ? "Printing"
      : "General Service",
          pages: a.totalPages || a.pages || 0,
          status: (a.status || "requested").toLowerCase(),
          date: a.deadline
            ? new Date(a.deadline).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "No deadline",
          amount: `₹${(a.totalPages || 0) * 2}`, // simple calc for now
          printType:
            a.printPreferences?.printType?.replace("_", " ") || "Standard",
        }));

        setOrders(mapped);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAssignments();
  }, [token]);

  // ================= FILTERING =================
  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus
      ? o.status === filterStatus.toLowerCase()
      : statusFilter === "all" || o.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                {loading ? "Loading..." : `${filtered.length} orders found`}
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-60"
                />
              </div>

              {!filterStatus && (
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="requested">Pending</SelectItem>
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="delivered">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Order ID</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium">Service</th>
                  <th className="pb-3 pr-4 font-medium">Print Type</th>
                  <th className="pb-3 pr-4 font-medium">Pages</th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs font-medium text-primary">{order.id}</td>
                    <td className="py-3 pr-4 font-medium">{order.customer}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{order.service}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{order.printType}</td>
                    <td className="py-3 pr-4">{order.pages}</td>
                    <td className="py-3 pr-4 font-semibold">{order.amount}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{order.date}</td>
                    <td className="py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 h-7"
                        onClick={() => navigate(`/assignments/${order.id}`)}
                      >
                        <Eye size={12} />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const AllOrders = () => <OrdersTable title="All Orders" description="Manage and track all print orders" />;
export const PendingOrders = () => <OrdersTable filterStatus="requested" title="Pending Orders" description="Orders waiting to be processed" />;
export const PrintingOrders = () => <OrdersTable filterStatus="printing" title="Currently Printing" description="Orders currently being printed" />;
export const CompletedOrders = () => <OrdersTable filterStatus="delivered" title="Completed Orders" description="Successfully fulfilled orders" />;