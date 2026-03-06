import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/api/client";

type Step = "email" | "otp" | "reset";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  /* ================= SEND OTP ================= */

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setStep("otp");

      toast({
        title: "OTP Sent!",
        description: `A 6-digit OTP has been sent to ${email}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT ================= */

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    const nextEmpty = pasted.length < 6 ? pasted.length : 5;
    otpRefs.current[nextEmpty]?.focus();
  };

  /* ================= VERIFY OTP ================= */

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < 6) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the full 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    // No backend call here
    setStep("reset");

    toast({
      title: "OTP Entered",
      description: "Now set your new password.",
    });
  };

  /* ================= RESET PASSWORD ================= */

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await apiFetch("/auth/reset-password-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otp.join(""),
          password: newPassword,
        }),
      });

      toast({
        title: "Password Changed!",
        description: "You can now log in with your new password.",
      });

      setStep("email");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const otpFilled = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-16">
      <div className="w-full max-w-md">
        {/* Header */}

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">
                P
              </span>
            </div>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Set New Password"}
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            {step === "email" &&
              "Enter your email and we'll send you a verification OTP"}
            {step === "otp" && `Enter the 6-digit code sent to ${email}`}
            {step === "reset" &&
              "Create a strong new password for your account"}
          </p>
        </div>

        {/* EMAIL STEP */}

        {step === "email" && (
          <form
            onSubmit={handleSendOtp}
            className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-card"
          >
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link
                to="/login"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Login
              </Link>
            </p>
          </form>
        )}

        {/* OTP STEP */}

        {step === "otp" && (
          <form
            onSubmit={handleVerifyOtp}
            className="bg-card p-8 rounded-2xl border border-border shadow-card text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>

            <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl bg-background border-2 text-foreground outline-none transition-all duration-300 ${
                    digit
                      ? "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                      : "border-border"
                  } focus:border-primary focus:shadow-[0_0_16px_hsl(var(--primary)/0.6)]`}
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading || !otpFilled}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Didn't receive it?{" "}
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-primary hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>

            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp(["", "", "", "", "", ""]);
              }}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Change email
            </button>
          </form>
        )}

        {/* RESET PASSWORD STEP */}

        {step === "reset" && (
          <form
            onSubmit={handleResetPassword}
            className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-card"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-8 w-8 text-primary" />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Password"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <Link
                to="/login"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
