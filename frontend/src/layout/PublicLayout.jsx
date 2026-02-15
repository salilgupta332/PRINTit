import { Outlet } from "react-router-dom";
import Navbar from "../components/landing/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
