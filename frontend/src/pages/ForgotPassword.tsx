import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to backend password reset API
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast({ title: "Reset link sent!", description: "Check your email for the password reset link." });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">P</span>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your email and we'll send you a reset link</p>
        </div>

        {sent ? (
          <div className="bg-card p-8 rounded-2xl border border-border shadow-card text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <strong className="text-foreground">{email}</strong>
            </p>
            <Link to="/login">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-card">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
