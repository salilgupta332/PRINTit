import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  AlignLeft,
  FolderKanban,
  FileText,
  ClipboardList,
  Library,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Printer,
  Users,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; path: string; children?: { title: string; path: string }[] }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    title: "Services",
    icon: Printer,
    children: [
      {
        title: "Notes & Printing",
        path: "/dashboard/notes",
        children: [
          { title: "Class Notes", path: "/dashboard/notes/class" },
          { title: "Coaching Material", path: "/dashboard/notes/coaching" },
          { title: "Chapter-wise", path: "/dashboard/notes/chapter" },
          { title: "Spiral Binding", path: "/dashboard/notes/binding" },
          { title: "Cover Page", path: "/dashboard/notes/cover" },
        ],
      },
      {
        title: "Assignment Support",
        path: "/dashboard/assignments",
        children: [
          { title: "Writing from Scratch", path: "/dashboard/assignments/writing" },
          { title: "Partial Completion", path: "/dashboard/assignments/partial" },
          { title: "Editing & Formatting", path: "/dashboard/assignments/editing" },
          { title: "Plagiarism Check", path: "/dashboard/assignments/plagiarism" },
          { title: "Urgent Delivery", path: "/dashboard/assignments/urgent" },
        ],
      },
      {
        title: "Formatting & Cleanup",
        path: "/dashboard/formatting",
        children: [
          { title: "Margin Fixing", path: "/dashboard/formatting/margin" },
          { title: "Font Alignment", path: "/dashboard/formatting/font" },
          { title: "Page Numbering", path: "/dashboard/formatting/numbering" },
          { title: "Front Page Creation", path: "/dashboard/formatting/frontpage" },
        ],
      },
      {
        title: "Project & Reports",
        path: "/dashboard/projects",
        children: [
          { title: "Final Year Projects", path: "/dashboard/projects/final" },
          { title: "Lab Manuals", path: "/dashboard/projects/lab" },
          { title: "Case Study Reports", path: "/dashboard/projects/case" },
          { title: "Internship Reports", path: "/dashboard/projects/internship" },
        ],
      },
      {
        title: "Exam Utilities",
        path: "/dashboard/exams",
        children: [
          { title: "Question Paper Printing", path: "/dashboard/exams/question" },
          { title: "Previous Year Papers", path: "/dashboard/exams/previous" },
        ],
      },
    ],
  },
  { title: "Orders", icon: ClipboardList, path: "/dashboard/orders" },
  { title: "Customers", icon: Users, path: "/dashboard/customers" },
  { title: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  { title: "Help & Support", icon: HelpCircle, path: "/dashboard/help" },
];

const iconMap: Record<string, React.ElementType> = {
  "Notes & Printing": BookOpen,
  "Assignment Support": PenTool,
  "Formatting & Cleanup": AlignLeft,
  "Project & Reports": FolderKanban,
  "Exam Utilities": FileText,
};

export function DashboardSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Services: true,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen sidebar-gradient text-sidebar-foreground transition-all duration-300 flex flex-col",
          collapsed ? "w-0 lg:w-16 overflow-hidden" : "w-67.5"
        )}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <h1 className="text-lg font-bold text-sidebar-primary-foreground font-['Plus_Jakarta_Sans']">
              📄 PrintHub
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              isActive={isActive}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({
  item,
  isActive,
  openMenus,
  toggleMenu,
  collapsed,
  depth = 0,
}: {
  item: NavItem;
  isActive: (path?: string) => boolean;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  collapsed: boolean;
  depth?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenus[item.title];
  const Icon = iconMap[item.title] || item.icon || BookOpen;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.title)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-sidebar-accent",
            depth > 0 && "pl-8"
          )}
        >
          <Icon size={18} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </>
          )}
        </button>
        {isOpen && !collapsed && (
          <div className="ml-2 mt-1 space-y-0.5">
            {item.children!.map((child) => (
              <SidebarSubItem
                key={child.title}
                item={child}
                isActive={isActive}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path || "/dashboard"}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
        isActive(item.path)
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "hover:bg-sidebar-accent",
        depth > 0 && "pl-8"
      )}
    >
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span>{item.title}</span>}
    </Link>
  );
}

function SidebarSubItem({
  item,
  isActive,
  openMenus,
  toggleMenu,
}: {
  item: { title: string; path: string; children?: { title: string; path: string }[] };
  isActive: (path?: string) => boolean;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenus[item.title];
  const Icon = iconMap[item.title] || BookOpen;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.title)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-sidebar-accent pl-6"
          )}
        >
          <Icon size={16} className="shrink-0" />
          <span className="flex-1 text-left">{item.title}</span>
          {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2">
            {item.children!.map((child) => (
              <Link
                key={child.title}
                to={child.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                  isActive(child.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/70"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors pl-6",
        isActive(item.path)
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "hover:bg-sidebar-accent"
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span>{item.title}</span>
    </Link>
  );
}
