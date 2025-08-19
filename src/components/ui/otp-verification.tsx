import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Clock, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OtpVerificationProps {
  type: "email" | "phone";
  contact: string;
  onVerify: (otp: string) => Promise<{ error: any }>;
  onResend: () => Promise<{ error: any }>;
  loading?: boolean;
}

export function OtpVerification({ type, contact, onVerify, onResend, loading }: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setVerifying(true);
    const { error } = await onVerify(otp);
    setVerifying(false);

    if (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setResending(true);
    const { error } = await onResend();
    setResending(false);

    if (!error) {
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: "OTP Resent",
        description: `New OTP sent to your ${type}`,
      });
    }
  };

  return (
    <Card className="glass-card shadow-card w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {type === "email" ? (
            <Mail className="w-6 h-6 text-primary" />
          ) : (
            <Phone className="w-6 h-6 text-primary" />
          )}
        </div>
        <CardTitle>Verify {type === "email" ? "Email" : "Phone"}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {contact}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-lg tracking-widest"
              autoComplete="one-time-code"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={verifying || loading || otp.length !== 6}
          >
            {verifying ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className="text-sm"
          >
            {resending ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Resending...
              </>
            ) : countdown > 0 ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Resend in {countdown}s
              </>
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}