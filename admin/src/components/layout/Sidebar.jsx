import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkBase =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition";

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        PRINTit Admin
      </h1>

      <nav className="space-y-2">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        {/* Assignments */}
        <NavLink
          to="/assignments"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          📄 Assignments
        </NavLink>
      </nav>
    </aside>
  );
}
