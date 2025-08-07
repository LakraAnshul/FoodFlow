import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
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
  const { verifyOtp, resendOtp, user } = useAuth();
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

    if (user) {
      navigate(signupData.role === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
    }
  }, [signupData, user, navigate]);

  if (!signupData) {
    return null;
  }

  const handleEmailVerify = async (otp: string) => {
    return await verifyOtp(signupData.email, otp, 'email');
  };

  const handlePhoneVerify = async (otp: string) => {
    return await verifyOtp(signupData.phone, otp, 'phone');
  };

  const handleEmailResend = async () => {
    return await resendOtp(signupData.email, 'email');
  };

  const handlePhoneResend = async () => {
    return await resendOtp(signupData.phone, 'phone');
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