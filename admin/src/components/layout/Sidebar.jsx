import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { adminSidebarMenu } from "../../config/adminSidebarMenu";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [userToggled, setUserToggled] = useState(false);
  const location = useLocation();
  const baseLink =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition";

  useEffect(() => {
    if (!location.pathname.startsWith("/assignments")) {
      setOpenMenu(null);
      setUserToggled(false);
    }
  }, [location.pathname]);
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">PRINTit Admin</h1>

      <nav className="space-y-2">
        {adminSidebarMenu.map((item, index) => {
          // SIMPLE LINK
          if (!item.children) {
            return (
              <NavLink
                key={index}
                to={item.path}
                end
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            );
          }

          // 🔥 DROPDOWN MENU
          const isRouteActive = item.children.some((child) =>
            location.pathname.startsWith(child.path),
          );

          const isOpen = userToggled ? openMenu === item.label : isRouteActive;

          return (
            <div key={index}>
              <button
                onClick={() => {
                  setUserToggled(true);
                  setOpenMenu(isOpen ? null : item.label);
                }}
                className={`${baseLink} w-full justify-between text-gray-700 hover:bg-indigo-50`}
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.label}
                </span>
                <span>{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child, i) => (
                    <NavLink
                      key={i}
                      to={child.path}
                      end
                      className={({ isActive }) =>
                        `${baseLink} text-sm ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-indigo-50"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
