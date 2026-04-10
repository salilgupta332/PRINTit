import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Eye,
  Download,
  Trash2,
  Save,
  Clock,
  CheckCircle,
  Printer,
  Package,
  Truck,
  MapPin,
  XCircle,
  FileText,
  User,
  CreditCard,
  Settings2,
  StickyNote,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { getOrderById, updateOrderStatus, updateOrderNote } from "@/api/orders";

const statusOptions = [
  { value: "requested", label: "Requested", icon: Clock, color: "text-muted-foreground" },
  { value: "accepted", label: "Accepted", icon: CheckCircle, color: "text-emerald-500" },
  { value: "in_progress", label: "In Progress", icon: Settings2, color: "text-blue-500" },
  { value: "printing", label: "Printing", icon: Printer, color: "text-blue-600" },
  { value: "dispatched", label: "Dispatched", icon: Truck, color: "text-purple-600" },
  { value: "delivered", label: "Delivered", icon: MapPin, color: "text-green-600" },
];

const statusColors: Record<string, string> = {
  Requested: "bg-muted text-muted-foreground",
  Pending: "bg-yellow-500/10 text-yellow-600",
  "In Progress": "bg-blue-400/10 text-blue-400",
  Printing: "bg-blue-500/10 text-blue-600",
  "Ready for Pickup": "bg-emerald-500/10 text-emerald-600",
  Dispatched: "bg-purple-500/10 text-purple-600",
  Delivered: "bg-green-600/10 text-green-600",
  Completed: "bg-green-500/10 text-green-600",
  Cancelled: "bg-red-500/10 text-red-600",
};

const paymentColors: Record<string, string> = {
  Paid: "bg-green-500/10 text-green-600",
  Pending: "bg-yellow-500/10 text-yellow-600",
  Refunded: "bg-red-500/10 text-red-600",
};

const activityIcons: Record<string, React.ElementType> = {
  create: FileText,
  payment: CreditCard,
  accept: CheckCircle,
  printing: Printer,
  complete: CheckCircle,
  ready: Package,
  delivered: MapPin,
};

const statusOrder: Record<string, number> = {
  requested: 0,
  accepted: 1,
  in_progress: 2,
  printing: 3,
  dispatched: 4,
  delivered: 5,
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState(order?.status || "Pending");
  const [adminNote, setAdminNote] = useState("");
  const [notes, setNotes] = useState(order?.notes || "");
  const [activityLog, setActivityLog] = useState(order?.activityLog || []);
  const [priority, setPriority] = useState(order?.priority || "Normal");

  const availableStatusOptions = statusOptions.filter((option) => {
    const currentRank = statusOrder[status] ?? 0;
    const optionRank = statusOrder[option.value] ?? 0;
    return optionRank >= currentRank;
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);

        const normalizedOrder = {
          id: data.orderNumber || data._id,
          date: new Date(data.createdAt).toLocaleString(),

          service:
            data.assignmentType === "from_scratch"
              ? "Typing / Writing"
              : "Printing",

          amount: `₹${data.price || 0}`,

          estimatedCompletion: data.deadline
            ? new Date(data.deadline).toLocaleString()
            : "-",

          customer: {
            name: data.customer?.name || "-",
            phone: data.customer?.phone || "-",
            email: data.customer?.email || "-",
            address: data.address?.addressLine1 || "-",
          },

          printType: data.printPreferences?.printType || "-",
          paperSize: data.printPreferences?.paperSize || "-",
          printSide: "Single Side",

          pages: data.printPreferences?.copies || 0,
          copies: data.printPreferences?.copies || 0,

          binding: data.printPreferences?.bindingType || "None",
          lamination: "None",

          paymentStatus: data.price > 0 ? "Paid" : "Pending",

          status: data.status,

          files:
            data.uploadedFiles?.map((f: any) => ({
              name: f.filename,
              url: `/api/admin/assignments/file?key=${encodeURIComponent(
                f.key,
              )}`,
              type: "PDF",
              size: "",
            })) || [],

          activityLog:
            data.activityLog?.map((log: any) => {
              let actionText = log.action;

              // format status messages
              if (log.action.includes("Status changed to")) {
                const status = log.action.split("Status changed to ")[1];

                const statusMap: any = {
                  requested: "Order requested",
                  accepted: "Order accepted",
                  in_progress: "Order accepted by admin",
                  printing: "Printing started",
                  dispatched: "Order dispatched",
                  delivered: "Order delivered",
                };

                actionText = statusMap[status] || log.action;
              }

              return {
                action: actionText,
                by: log.by,
                icon: log.icon,
                time: new Date(log.createdAt).toLocaleTimeString(),
                date: new Date(log.createdAt).toLocaleDateString(),
              };
            }) || [],
          notes: data.assignmentDescription || "",
          priority: "Normal",
        };

        setOrder(normalizedOrder);
        setStatus(data.status);
        setNotes(data.assignmentDescription || "");
        setPriority("Normal");
        setActivityLog(normalizedOrder.activityLog);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load order",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <FileText className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Order Not Found</h2>
        <p className="text-muted-foreground">
          The order you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/orders/all")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>
    );
  }

  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus(orderId, { status });

      // update order status
      setOrder({
        ...order,
        status,
      });

      // convert status to readable action
      const statusMap: any = {
        requested: "Order requested",
        accepted: "Order accepted",
        in_progress: "Order accepted by admin",
        printing: "Printing started",
        dispatched: "Order dispatched",
        delivered: "Order delivered",
      };

      const newLog = {
        action: statusMap[status] || `Status changed to ${status}`,
        by: "Admin",
        icon: "accept",
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };

      // ⭐ update activity log instantly
      setActivityLog((prev) => [...prev, newLog]);

      toast({
        title: "Status Updated",
        description: `Order status changed to ${status}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
      });
    }
  };

  const handleAddNote = async () => {
    try {
      await updateOrderNote(orderId, notes);

      toast({
        title: "Note Saved",
        description: "Admin note updated successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save note",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{order.id}</h1>
              <Badge className={`${statusColors[status]} border-0`}>
                {order.status}
              </Badge>
              <Badge
                className={`${paymentColors[order.paymentStatus]} border-0`}
              >
                {order.paymentStatus}
              </Badge>
              {priority === "High" && (
                <Badge className="bg-red-500/10 text-red-500 border-0">
                  ⚡ Urgent
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Placed on {order.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            🖨️ Print Invoice
          </Button>
        </div>
      </div>

      {/* 3-Column Layout: Fields | Activity Log | Attachments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Order Fields & Management */}
        <div className="lg:col-span-1 space-y-4">
          {/* Order Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Order Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Order ID" value={order.id} />
              <InfoRow label="Order Date" value={order.date} />
              <InfoRow label="Service Type" value={order.service} />
              <InfoRow label="Total Amount" value={order.amount} highlight />
              <InfoRow
                label="Est. Completion"
                value={order.estimatedCompletion}
              />
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Name" value={order.customer.name} />
              <InfoRow label="Phone" value={order.customer.phone} />
              <InfoRow label="Email" value={order.customer.email} />
              <InfoRow label="Address" value={order.customer.address} />
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={() => window.open(`tel:${order.customer.phone}`)}
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 text-green-600 hover:text-green-700"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${order.customer.phone.replace(/\s/g, "")}`,
                    )
                  }
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Print Configuration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" /> Print
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Print Type" value={order.printType} />
              <InfoRow label="Paper Size" value={order.paperSize} />
              <InfoRow label="Print Side" value={order.printSide} />
              <InfoRow label="Pages" value={String(order.pages)} />
              <InfoRow label="Copies" value={String(order.copies)} />
              <InfoRow label="Binding" value={order.binding} />
              <InfoRow label="Lamination" value={order.lamination} />
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" /> Status Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Order Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStatusOptions.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        <span className="flex items-center gap-2">
                          <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
                          {s.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">🟢 Low</SelectItem>
                    <SelectItem value="Normal">🟡 Normal</SelectItem>
                    <SelectItem value="High">🔴 High / Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Update Note (optional)
                </label>
                <Input
                  placeholder="e.g., Started printing batch 1..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>
              <Button className="w-full gap-2" onClick={handleStatusUpdate}>
                <Save className="h-4 w-4" /> Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <StickyNote className="h-4 w-4 text-primary" /> Admin Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add internal notes about this order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleAddNote}
              >
                Save Note
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Activity Log / Timeline */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Activity Log
              </CardTitle>
              <CardDescription>
                {(activityLog || []).length} events recorded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-0">
                  {[...(activityLog || [])]
                    .reverse()
                    .map((log: any, i: number) => {
                      const Icon = activityIcons[log.icon] || Clock;
                      const isLatest = i === 0;
                      return (
                        <div
                          key={i}
                          className="relative flex gap-3 pb-6 last:pb-0"
                        >
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                            <Icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <p
                              className={`text-sm font-medium ${isLatest ? "text-primary" : ""}`}
                            >
                              {log.action}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                {log.time}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                •
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {log.date}
                              </span>
                            </div>
                            <span className="text-xs text-primary/60">
                              by {log.by}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" /> Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Amount" value={order.amount} highlight />
              <InfoRow label="Payment Status" value={order.paymentStatus} />
              <InfoRow label="Method" value="UPI" />
              {order.paymentStatus === "Pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-green-600"
                >
                  ✅ Mark as Paid
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Attachments / Files */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Uploaded Files
              </CardTitle>
              <CardDescription>
                {order.files?.length || 0}file(s) attached
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(order.files || []).map((file: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(file.url)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">📊 Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Pages" value={String(order.pages)} />
                <StatBox label="Copies" value={String(order.copies)} />
                <StatBox
                  label="Total Prints"
                  value={String(order.pages * order.copies)}
                />
                <StatBox label="Amount" value={order.amount} />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Tracking */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Delivery / Pickup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Type" value="Self Pickup" />
              <InfoRow label="Est. Ready" value={order.estimatedCompletion} />
              {status === "Ready for Pickup" && (
                <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
                  <p className="text-sm font-medium text-emerald-600">
                    ✅ Ready for Customer Pickup
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notify customer via WhatsApp
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span
      className={`text-sm ${highlight ? "font-bold text-primary" : "font-medium"}`}
    >
      {value}
    </span>
  </div>
);

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-muted/50 p-3 text-center">
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default OrderDetail;
