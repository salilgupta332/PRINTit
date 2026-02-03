import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
