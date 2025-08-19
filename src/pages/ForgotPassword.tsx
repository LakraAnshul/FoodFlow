import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Mail, Lock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithOtp, verifyOtp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password - Food Flow";
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithOtp(email, "email");
    setLoading(false);
    if (!error) setStep(2);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Enter 6-digit code", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await verifyOtp(email, otp, "email");
    setLoading(false);
    if (!error) setStep(3);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6 || password !== confirmPassword) {
      toast({ title: "Password Error", description: "Ensure passwords match and are 6+ chars", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Reset Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password Updated", description: "You can now sign in with your new password." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Food Flow</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">Reset your password using an email OTP</p>
        </div>

        <Card className="glass-card shadow-card">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 1 && "Enter your email"}
              {step === 2 && "Enter the OTP sent to your email"}
              {step === 3 && "Set a new password"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-digit OTP</Label>
                  <Input id="otp" maxLength={6} inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <PasswordInput id="confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
                <div className="flex items-center justify-center mt-2 text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">After verification, you're temporarily logged in to change password.</span>
                </div>
              </form>
            )}

            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
