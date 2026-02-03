export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        PRINTit Admin
      </h1>

      <nav className="space-y-2">
        <a
          href="/dashboard"
          className="block px-4 py-2 rounded-md hover:bg-indigo-50"
        >
          📊 Dashboard
        </a>

        <a
          href="/assignments"
          className="block px-4 py-2 rounded-md bg-indigo-600 text-white"
        >
          📄 Assignments
        </a>
      </nav>
    </aside>
  );
}
