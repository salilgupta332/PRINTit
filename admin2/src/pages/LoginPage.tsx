import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, LogIn, Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@printit.com");
  const [password, setPassword] = useState("admin123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast({ title: "Welcome back!", description: "Successfully signed in to PRINTit Admin." });
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use admin@printit.com / admin123");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
      {/* Theme toggle */}
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="absolute right-4 top-4 rounded-full">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </Button>

      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Printer size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-primary">PRINT</span>it
          </h1>
          <p className="mt-1 text-muted-foreground">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <h2 className="mb-6 text-xl font-semibold">Sign in to your account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@printit.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</p>}

            <div className="rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
              <strong>Demo:</strong> admin@printit.com / admin123
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin" />Signing In...</> : <><LogIn size={16} />Sign In</>}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">© 2024 PRINTit. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
