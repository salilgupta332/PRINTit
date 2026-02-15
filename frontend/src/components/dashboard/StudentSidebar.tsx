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

/* ---------------- TYPES ---------------- */

interface NavItem {
  title: string;
  icon?: React.ElementType;
  path?: string;
  children?: NavItem[];
}

/* ---------------- MENU ITEMS (YOUR OLD SIDEBAR MERGED) ---------------- */

const navItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },

  {
    title: "Services",
    icon: Printer,
    children: [
      {
        title: "Notes & Printing",

        children: [{ title: "Class Notes", path: "/dashboard/notes/class" }],
      },
      {
        title: "Assignment Support",
        icon: ClipboardList,
        children: [
          { title: "Create Assignment", path: "/dashboard/create-assignment" },
          { title: "My Assignments", path: "/dashboard/my-assignments" },
        ],
      },
      {
        title: "Formatting & Cleanup",
        icon: AlignLeft,
        children: [
          { title: "Margin Fixing", path: "/dashboard/formatting/margin" },
          { title: "Font Alignment", path: "/dashboard/formatting/font" },
          { title: "Page Numbering", path: "/dashboard/formatting/numbering" },
          {
            title: "Front Page Creation",
            path: "/dashboard/formatting/frontpage",
          },
        ],
      },
      {
        title: "Project & Reports",
        icon: FolderKanban,
        children: [
          { title: "Final Year Projects", path: "/dashboard/projects/final" },
          { title: "Lab Manuals", path: "/dashboard/projects/lab" },
          { title: "Case Study Reports", path: "/dashboard/projects/case" },
          {
            title: "Internship Reports",
            path: "/dashboard/projects/internship",
          },
        ],
      },
      {
        title: "Exam Utilities",
        icon: Library,
        path: "/dashboard/exams",
        children: [
          {
            title: "Question Paper Printing",
            path: "/dashboard/exams/question",
          },
          { title: "Previous Year Papers", path: "/dashboard/exams/previous" },
        ],
      },
      {
        title: "Document Services",
        icon: FileText,
        path: "/dashboard/document-services",
        children: [
          {
            title: "Official Document Printing",
            path: "/dashboard/document-services",
          },
        ],
      },
    ],
  },

  { title: "My Orders", icon: FolderKanban, path: "/orders" },
  { title: "Profile", icon: Users, path: "/profile" },
  { title: "Support", icon: HelpCircle, path: "/support" },
];

/* ---------------- MAIN SIDEBAR ---------------- */

export function StudentSidebar({ collapsed, onToggle }) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-67.5 z-40",
        "bg-linear-to-b from-[#0f172a] via-[#0b132b] to-[#020617] text-white",
        "text-white shadow-xl border-r border-white/10",
        collapsed && "lg:w-16",
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && <h1 className="text-lg font-bold">📄 PrintIT</h1>}
        <button onClick={onToggle}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
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
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */

function SidebarItem({
  item,
  isActive,
  openMenus,
  toggleMenu,
  collapsed,
  depth = 0,
}) {
  const hasChildren = item.children && item.children.length > 0;
  const key = `${depth}-${item.title}`;
  const isOpen = openMenus[key];
  const Icon = item.icon || BookOpen;

  /* ---------- CATEGORY (HAS CHILDREN) ---------- */

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(key)}
          style={{ paddingLeft: `${12 + depth * 18}px` }}
          className="group relative w-full flex items-center gap-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white transition-colors"
        >
          {/* Hover bg */}
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-3 w-full">
           {depth === 0 && <Icon size={18} className="shrink-0" />}
{depth === 1 && <Icon size={16} className="shrink-0 opacity-80" />}

            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </>
            )}
          </div>
        </button>
        {isOpen && !collapsed && (
          <div className="space-y-0.5">
            {item.children.map((child) => (
              <SidebarItem
                key={child.title}
                item={child}
                isActive={isActive}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                collapsed={collapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ---------- LEAF (ACTUAL PAGE) ---------- */

return (
  <Link
    to={item.path || "#"}
    style={{ paddingLeft: `${12 + depth * 18}px` }}
    className={cn(
      "group relative flex items-center gap-3 py-2.5 rounded-lg text-sm overflow-hidden transition-all",
      isActive(item.path)
        ? "bg-blue-500 text-white shadow-lg"
        : "text-slate-300 hover:text-white"
    )}
  >
    {/* Hover bg */}
    {!isActive(item.path) && (
      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />
    )}

    {/* Content */}
    <div className="relative z-10 flex items-center gap-3 w-full">

      {/* ICON FOR MAIN ITEMS */}
      {depth === 0 && item.icon && (
        <item.icon size={18} className="shrink-0" />
      )}

      {/* DOT FOR CHILD PAGES */}
      {depth > 0 && (
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
      )}

      {!collapsed && <span>{item.title}</span>}
    </div>
  </Link>
);

}
