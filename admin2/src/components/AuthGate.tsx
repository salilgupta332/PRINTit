import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="relative">

      {/* Blurred content */}
      <div className="pointer-events-none blur-sm opacity-60 select-none">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-background/90 backdrop-blur-md border rounded-xl shadow-xl p-8 text-center space-y-4 max-w-md">
          <Lock className="mx-auto h-10 w-10 text-primary" />
          <h2 className="text-xl font-semibold">Admin Login Required</h2>
          <p className="text-muted-foreground">
            Please sign in to manage orders, customers and services
          </p>

          <div className="flex gap-3 justify-center">
            <Button>Sign In</Button>
            <Button variant="outline">Sign Up</Button>
          </div>
        </div>
      </div>

    </div>
  );
}