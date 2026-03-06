import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordOtp } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      await resetPasswordOtp(email, otp, password);

      toast({
        title: "Password Reset Successful",
      });

      navigate("/login");

    } catch (error: any) {

      toast({
        title: "Invalid OTP",
        variant: "destructive",
      });

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label>Enter OTP</Label>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          Reset Password
        </Button>

      </form>

    </div>
  );
}