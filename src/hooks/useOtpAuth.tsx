import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useOtpAuth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendSignupOtp = async (email: string, phone: string, userData: any) => {
    setLoading(true);
    
    try {
      // Send email OTP - explicitly request OTP type
      const { error: emailError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: undefined, // This prevents magic link
          data: userData
        }
      });

      if (emailError) throw emailError;

      // Send phone OTP
      const { error: phoneError } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          shouldCreateUser: true,
          data: userData
        }
      });

      if (phoneError) {
        console.warn('Phone OTP failed:', phoneError.message);
        // Don't throw error for phone, continue with email only
        toast({
          title: "OTP Sent",
          description: "Verification code sent to email. Phone verification unavailable.",
        });
      } else {
        toast({
          title: "OTP Sent",
          description: "Verification codes sent to both email and phone",
        });
      }

      return { error: null };
    } catch (error: any) {
      toast({
        title: "OTP Send Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOtp = async (contact: string, otp: string, type: 'email' | 'phone') => {
    const verifyOptions = type === 'email'
      ? { email: contact, token: otp, type: 'email' as const }
      : { phone: contact, token: otp, type: 'sms' as const };

    const { error } = await supabase.auth.verifyOtp(verifyOptions);

    if (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    }

    return { error };
  };

  const resendSignupOtp = async (contact: string, type: 'email' | 'phone') => {
    const otpOptions = type === 'email' 
      ? { 
          email: contact,
          options: {
            emailRedirectTo: undefined // Prevent magic link
          }
        }
      : { phone: contact };

    const { error } = await supabase.auth.signInWithOtp(otpOptions);

    if (error) {
      toast({
        title: "Resend Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "OTP Resent",
        description: `New verification code sent to your ${type}`,
      });
    }

    return { error };
  };

  return {
    loading,
    sendSignupOtp,
    verifySignupOtp,
    resendSignupOtp
  };
}