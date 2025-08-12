import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useOtpAuth } from "@/hooks/useOtpAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { DualOtpVerification } from "@/components/ui/dual-otp-verification";
import { useToast } from "@/hooks/use-toast";

interface SignupData {
  email: string;
  phone: string;
  role: string;
  fullName: string;
  address: string;
  organizationName: string;
}

export default function OtpSignup() {
  const { user } = useAuth();
  const { verifySignupOtp, resendSignupOtp, sendPhoneOtp } = useOtpAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const signupData = location.state?.signupData as SignupData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
      return;
    }
    // Do NOT redirect on user presence; we wait until both verifications are complete
  }, [signupData, navigate]);

  if (!signupData) {
    return null;
  }

  const handleEmailVerify = async (otp: string) => {
    const result = await verifySignupOtp(signupData.email, otp, 'email');
    if (!result.error) {
      // After email verification, trigger phone OTP via updateUser
      await sendPhoneOtp(signupData.phone);
    }
    return result;
  };

  const handlePhoneVerify = async (otp: string) => {
    return await verifySignupOtp(signupData.phone, otp, 'phone');
  };

  const handleEmailResend = async () => {
    return await resendSignupOtp(signupData.email, 'email');
  };

  const handlePhoneResend = async () => {
    return await resendSignupOtp(signupData.phone, 'phone');
  };

  const handleComplete = () => {
    toast({
      title: "Account Verified!",
      description: "Your account has been successfully verified. Welcome to Food Flow!",
    });
    
    setTimeout(() => {
      navigate(signupData.role === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
    }, 2000);
  };

  return (
    <DualOtpVerification
      email={signupData.email}
      phone={signupData.phone}
      onEmailVerify={handleEmailVerify}
      onPhoneVerify={handlePhoneVerify}
      onEmailResend={handleEmailResend}
      onPhoneResend={handlePhoneResend}
      onComplete={handleComplete}
      loading={loading}
    />
  );
}