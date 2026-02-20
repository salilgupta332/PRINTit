import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AuthInput from "@/components/AuthInput";
import SocialLogin from "@/components/SocialLogin";
import authBg from "@/assets/auth-bg.jpg";

import { loginUser } from "@/api/authApi";
import { AuthContext } from "@/context/AuthContext";

const UserSignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 🔥 SAME STATES AS OLD FORM
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 SAME LOGIN LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Panel */}
      <div className="auth-split-left min-w-0">
        <img
          src={authBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-md text-center px-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <LogIn size={40} className="text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold font-display text-primary-foreground">
            Welcome Back
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Sign in to access your dashboard, manage orders, and stay connected.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-split-right min-w-0">
        <div className="auth-form-container">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-display text-foreground">
              Sign In
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <AuthInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="john@example.com"
              icon={<Mail size={18} />}
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <AuthInput
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock size={18} />}
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {message && (
              <p className="text-sm text-red-500 text-center">{message}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="auth-btn-primary"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <SocialLogin />
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/user/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
