import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // wait auth restore (important)
  if (loading) return null;

  // not logged in → go login
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}