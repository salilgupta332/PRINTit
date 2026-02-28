import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, GraduationCap, Stamp, FileText,
  Briefcase, Users, ChevronDown, ChevronRight, HelpCircle,
  Settings, Printer, X, Menu, ClipboardList, AlignLeft,
  FolderOpen, BarChart3, FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubSubItem {
  label: string;
  path: string;
}

interface SubItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: SubSubItem[];
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  {
    icon: Printer, label: "Services", children: [
      {
        icon: BookOpen, label: "Notes & Printing", children: [
          { label: "Class Notes", path: "/dashboard/class-notes" },
        ],
      },
      {
        icon: GraduationCap, label: "Assignment Support", children: [
          { label: "Create Assignment", path: "/dashboard/assignment" },
          { label: "My Assignments", path: "/dashboard/my-assignments" },
        ],
      },
      {
        icon: AlignLeft, label: "Formatting & Cleanup", children: [
          { label: "Document Formatting", path: "/dashboard/formatting" },
        ],
      },
      {
        icon: FolderOpen, label: "Project & Reports", children: [
          { label: "Project & Report Printing", path: "/dashboard/project-reports" },
        ],
      },
      {
        icon: BarChart3, label: "Exam Utilities", children: [
          { label: "Question Paper Printing", path: "/dashboard/question-papers" },
          { label: "Previous Year Papers", path: "/dashboard/previous-papers" },
        ],
      },
      {
        icon: FileCheck, label: "Document Services", children: [
          { label: "Official Document Printing", path: "/dashboard/official-docs" },
        ],
      },
      {
        icon: Briefcase, label: "Business Printing", children: [
          { label: "Business Cards", path: "/dashboard/business-cards" },
          { label: "Bulk Printing", path: "/dashboard/bulk" },
        ],
      },
    ],
  },
  { icon: FileText, label: "My Orders", path: "/dashboard/orders" },
  { icon: HelpCircle, label: "Help & Support", path: "/dashboard/help" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Services"]);
  const [expandedSubs, setExpandedSubs] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const toggleSub = (label: string) => {
    setExpandedSubs((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-sm">P</span>
            </div>
            <span className="font-display font-bold text-lg text-sidebar-foreground">
              PRINT<span className="text-sidebar-primary">it</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden text-sidebar-foreground" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            if (item.children) {
              const isExpanded = expandedGroups.includes(item.label);

              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {item.children.map((sub) => {
                        const isSubExpanded = expandedSubs.includes(sub.label);
                        const hasActiveChild = sub.children?.some((c) => isActive(c.path));

                        if (sub.children) {
                          return (
                            <div key={sub.label}>
                              <button
                                onClick={() => toggleSub(sub.label)}
                                className={cn(
                                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                                  hasActiveChild
                                    ? "text-sidebar-primary font-medium"
                                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                )}
                              >
                                <sub.icon className="h-3.5 w-3.5" />
                                <span className="flex-1 text-left">{sub.label}</span>
                                {isSubExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                              </button>
                              {isSubExpanded && (
                                <div className="ml-6 mt-0.5 space-y-0.5">
                                  {sub.children.map((child) => (
                                    <button
                                      key={child.path}
                                      onClick={() => { navigate(child.path); onClose(); }}
                                      className={cn(
                                        "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2",
                                        isActive(child.path)
                                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                          : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                      )}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                                      {child.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={sub.label}
                            onClick={() => { if (sub.path) { navigate(sub.path); onClose(); } }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive(sub.path || "")
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                            )}
                          >
                            <sub.icon className="h-3.5 w-3.5" />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => { if (item.path) { navigate(item.path); onClose(); } }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path || "")
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
