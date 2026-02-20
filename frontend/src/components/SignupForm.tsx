import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, ShieldCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AuthInput from "@/components/AuthInput";
import SocialLogin from "@/components/SocialLogin";
import authBg from "@/assets/auth-bg.jpg";
import { useState } from "react";
import { signupUser } from "@/api/authApi";

const UserSignUp = () => {
  const navigate = useNavigate();

  // 🔥 form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 submit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("You must accept Terms & Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signupUser({
        fullName,
        email,
        password,
        confirmPassword,
        mobileNumber,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="auth-split-left">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-md text-center px-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <ShieldCheck size={40} className="text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold font-display text-primary-foreground">
            Join Our Community
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Create your account and unlock a world of possibilities. Fast, secure, and tailored for you.
          </p>
          <div className="flex justify-center gap-2 pt-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary-foreground" : "bg-primary-foreground/40"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-split-right">
        <div className="auth-form-container">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-display text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <AuthInput label="Full Name" id="fullname" placeholder="John Doe" icon={<User size={18} />} required
              value={fullName} onChange={(e:any)=>setFullName(e.target.value)} />

            <AuthInput label="Email Address" id="email" type="email" placeholder="john@example.com" icon={<Mail size={18} />} required
              value={email} onChange={(e:any)=>setEmail(e.target.value)} />

            <AuthInput label="Mobile Number" id="mobile" type="tel" placeholder="+91 98765 43210" icon={<Phone size={18} />} required
              value={mobileNumber} onChange={(e:any)=>setMobileNumber(e.target.value)} />

            <AuthInput label="Password" id="password" type="password" placeholder="Min. 8 characters" icon={<Lock size={18} />} required
              value={password} onChange={(e:any)=>setPassword(e.target.value)} />

            <AuthInput label="Confirm Password" id="confirmPassword" type="password" placeholder="Re-enter password" icon={<Lock size={18} />} required
              value={confirmPassword} onChange={(e:any)=>setConfirmPassword(e.target.value)} />

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the <span className="text-primary font-medium hover:underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-primary font-medium hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button type="submit" disabled={loading} className="auth-btn-primary">
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <SocialLogin />
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;