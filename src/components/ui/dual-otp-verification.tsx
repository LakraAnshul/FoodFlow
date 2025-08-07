import { useState } from "react";
import { OtpVerification } from "./otp-verification";
import { CheckCircle } from "lucide-react";

interface DualOtpVerificationProps {
  email: string;
  phone: string;
  onEmailVerify: (otp: string) => Promise<{ error: any }>;
  onPhoneVerify: (otp: string) => Promise<{ error: any }>;
  onEmailResend: () => Promise<{ error: any }>;
  onPhoneResend: () => Promise<{ error: any }>;
  onComplete: () => void;
  loading?: boolean;
}

export function DualOtpVerification({
  email,
  phone,
  onEmailVerify,
  onPhoneVerify,
  onEmailResend,
  onPhoneResend,
  onComplete,
  loading
}: DualOtpVerificationProps) {
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleEmailVerify = async (otp: string) => {
    const result = await onEmailVerify(otp);
    if (!result.error) {
      setEmailVerified(true);
      if (phoneVerified) {
        onComplete();
      }
    }
    return result;
  };

  const handlePhoneVerify = async (otp: string) => {
    const result = await onPhoneVerify(otp);
    if (!result.error) {
      setPhoneVerified(true);
      if (emailVerified) {
        onComplete();
      }
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Verify Your Account</h1>
          <p className="text-muted-foreground">
            Please verify both your email and phone number to complete registration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Verification */}
          <div className="relative">
            {emailVerified && (
              <div className="absolute -top-2 -right-2 z-10">
                <CheckCircle className="w-8 h-8 text-green-500 bg-background rounded-full" />
              </div>
            )}
            <OtpVerification
              type="email"
              contact={email}
              onVerify={handleEmailVerify}
              onResend={onEmailResend}
              loading={loading}
            />
          </div>

          {/* Phone Verification */}
          <div className="relative">
            {phoneVerified && (
              <div className="absolute -top-2 -right-2 z-10">
                <CheckCircle className="w-8 h-8 text-green-500 bg-background rounded-full" />
              </div>
            )}
            <OtpVerification
              type="phone"
              contact={phone}
              onVerify={handlePhoneVerify}
              onResend={onPhoneResend}
              loading={loading}
            />
          </div>
        </div>

        {(emailVerified || phoneVerified) && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {emailVerified && phoneVerified
                ? "Both verifications complete! Redirecting..."
                : `${emailVerified ? "Email" : "Phone"} verified. Please verify your ${emailVerified ? "phone" : "email"} to continue.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}