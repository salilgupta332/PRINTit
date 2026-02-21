import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  FolderOpen,
  Wrench,
  ChevronDown,
  ChevronRight,
  ListOrdered,
  Clock,
  Printer,
  CheckCircle,
  UserCheck,
  UserX,
  UserPlus,
  UsersRound,
  DollarSign,
  History,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Calendar,
  Star,
  Download,
  Tag,
  Plus,
  Layers,
  Percent,
  Store,
  MapPin,
  Timer,
  Power,
  Palmtree,
  FileText,
  Upload,
  Archive,
  FolderArchive,
  Bell,
  Lock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SubItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  badge?: number;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    icon: Package,
    badge: 5,
    children: [
      { label: "All Orders", path: "/orders/all", icon: ListOrdered },
      { label: "Pending", path: "/orders/pending", icon: Clock },
      { label: "Printing", path: "/orders/printing", icon: Printer },
      { label: "Completed", path: "/orders/completed", icon: CheckCircle },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    children: [
      { label: "All Customers", path: "/customers/all", icon: UsersRound },
      { label: "Add Customer", path: "/customers/add", icon: UserPlus },
      { label: "Verified", path: "/customers/verified", icon: UserCheck },
      { label: "Blocked", path: "/customers/blocked", icon: UserX },
    ],
  },
  {
    label: "Payments",
    icon: CreditCard,
    children: [
      { label: "Overview", path: "/payments/overview", icon: DollarSign },
      {
        label: "Transaction History",
        path: "/payments/history",
        icon: History,
      },
      {
        label: "Pending Payments",
        path: "/payments/pending",
        icon: AlertCircle,
      },
      { label: "Refunds", path: "/payments/refunds", icon: RefreshCw },
    ],
  },
  {
    label: "Reports",
    icon: BarChart3,
    children: [
      { label: "Daily Revenue", path: "/reports/daily", icon: TrendingUp },
      { label: "Monthly Report", path: "/reports/monthly", icon: Calendar },
      { label: "Top Customers", path: "/reports/top-customers", icon: Star },
      { label: "Download CSV", path: "/reports/download", icon: Download },
    ],
  },
  {
    label: "Services & Pricing",
    icon: Wrench,
    children: [
      { label: "All Services", path: "/services/all", icon: Layers },
      { label: "Add Service", path: "/services/add", icon: Plus },
      { label: "Categories", path: "/services/categories", icon: Tag },
      { label: "Discounts", path: "/services/discounts", icon: Percent },
    ],
  },
  {
    label: "Shop Settings",
    icon: Store,
    children: [
      { label: "General Info", path: "/shop/general", icon: MapPin },
      { label: "Working Hours", path: "/shop/hours", icon: Timer },
      { label: "Order Toggle", path: "/shop/orders-toggle", icon: Power },
      { label: "Holiday Mode", path: "/shop/holiday", icon: Palmtree },
    ],
  },
  {
    label: "Files",
    icon: FolderOpen,
    children: [
      { label: "All Files", path: "/files/all", icon: FileText },
      { label: "Upload Files", path: "/files/upload", icon: Upload },
      { label: "Categories", path: "/files/categories", icon: FolderArchive },
      { label: "Archived", path: "/files/archived", icon: Archive },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "Notifications", path: "/settings/notifications", icon: Bell },
      { label: "Security", path: "/settings/security", icon: Lock },
      { label: "Account", path: "/settings/account", icon: UserCheck },
      { label: "Preferences", path: "/settings/preferences", icon: Settings },
    ],
  },
];

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<string[]>(["Orders"]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const protectedNavigate = (path: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login required 🔐",
        description: "Please sign in to access this section",
        variant: "destructive",
      });
      return;
    }

    navigate(path);
  };

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label],
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname === c.path) ||
    location.pathname === item.path;

  return (
    <Sidebar
      className={cn(
        "border-r border-sidebar-border",
        !isAuthenticated && "opacity-70",
      )}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Printer size={16} />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold leading-none">
              <span className="text-primary">PRINT</span>it
            </span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                if (!item.children) {
                  // Simple single nav item
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path || "")}
                        tooltip={item.label}
                        className="h-10"
                      >
                        <button
                          onClick={() => protectedNavigate(item.path || "/")}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive(item.path || "")
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                          )}
                        >
                          <item.icon size={18} />
                          <span className="group-data-[collapsible=icon]:hidden">
                            {item.label}
                          </span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Collapsible group
                const groupOpen =
                  openGroups.includes(item.label) || isGroupActive(item);
                return (
                  <Collapsible
                    key={item.label}
                    open={groupOpen}
                    onOpenChange={() => toggleGroup(item.label)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.label}
                          className={cn(
                            "h-10 w-full",
                            isGroupActive(item) &&
                              "text-sidebar-accent-foreground font-medium",
                          )}
                        >
                          <item.icon size={18} />
                          <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground group-data-[collapsible=icon]:hidden">
                              {item.badge}
                            </span>
                          )}
                          {!item.badge && (
                            <ChevronDown
                              size={14}
                              className={cn(
                                "ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden",
                                groupOpen && "rotate-180",
                              )}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.path}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(child.path)}
                              >
                                <button
                                  onClick={() => protectedNavigate(child.path)}
                                  className={cn(
                                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                    isActive(child.path)
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
                                  )}
                                >
                                  <child.icon size={14} className="shrink-0" />
                                  {child.label}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium">PRINTit Admin v1.0</p>
          <p>© 2024 PRINTit Shop</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
