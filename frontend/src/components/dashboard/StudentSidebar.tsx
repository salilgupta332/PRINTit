import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Printer,
  BookOpen,
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
        children:  [
      { title: "Create Assignment", path: "/dashboard/create-assignment" },
      { title: "My Assignments", path: "/dashboard/my-assignments" },
    ],
      },
      {
        title: "Formatting & Cleanup",
        path: "/dashboard/formatting",
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
        path: "/dashboard/projects",
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
        path: "/dashboard/exams",
        children: [
          {
            title: "Question Paper Printing",
            path: "/dashboard/exams/question",
          },
          { title: "Previous Year Papers", path: "/dashboard/exams/previous" },
        ],
      },
    ],
  },



  { title: "Print Documents", icon: Printer, path: "/print" },
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
        "fixed top-0 left-0 h-screen sidebar-gradient text-sidebar-foreground transition-all duration-300 flex flex-col",
        collapsed ? "w-0 lg:w-16 overflow-hidden" : "w-[270px]",
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
          className={cn(
            "w-full flex items-center gap-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-sidebar-accent",
          )}
        >
          {depth > 0 && (
            <span className="absolute left-3 top-0 bottom-0 w-px bg-sidebar-border opacity-40" />
          )}

          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </>
          )}
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
        "flex items-center gap-3 py-2 rounded-md text-sm transition-colors relative",
        isActive(item.path)
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "hover:bg-sidebar-accent",
      )}
    >
      {depth > 0 && (
        <>
          <span className="absolute left-3 top-0 bottom-0 w-px bg-sidebar-border opacity-40" />
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        </>
      )}

      {!collapsed && <span>{item.title}</span>}
    </Link>
  );
}
