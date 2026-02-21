import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Store } from "lucide-react";
import AuthInput from "@/components/AuthInput";
import adminBg from "@/assets/admin-bg.jpg";

import { apiPost } from "@/api/client";
import { useAuth } from "@/context/AuthContext";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ===== STATES (added) =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== SUBMIT HANDLER =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiPost("/admin/login", { email, password });

      login(data.token);          // save JWT
      navigate("/dashboard");   // redirect dashboard
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-theme flex min-h-screen">
      {/* Left Panel */}
      <div className="auth-split-left">
        <img src={adminBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-md text-center px-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <Store size={40} className="text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold font-display text-primary-foreground">
            Admin Portal
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Manage your shop, track orders, and grow your business — all in one place.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-split-right">
        <div className="auth-form-container">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
              <Store size={14} /> Admin
            </div>
            <h1 className="text-3xl font-bold font-display text-foreground">Admin Sign In</h1>
            <p className="text-muted-foreground">Access your shop management dashboard</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="admin@shop.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />

            <AuthInput
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-end">
              <button type="button" className="text-sm text-primary font-medium hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="auth-btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Admin"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Want to register your shop?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Register Now
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;