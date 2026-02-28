import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // already logged in → go dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}