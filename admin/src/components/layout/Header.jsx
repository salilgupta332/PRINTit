export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">Admin Panel</h2>

      <button className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </header>
  );
}
