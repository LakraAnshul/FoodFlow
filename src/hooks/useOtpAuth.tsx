import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useOtpAuth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const normalizePhone = (p: string) => (p?.trim().startsWith('+') ? p.trim() : `+${p?.trim()}`);

  const sendSignupOtp = async (email: string, phone: string, userData: any) => {
    setLoading(true);
    
    try {
      // Send email OTP - explicitly request OTP type
      const formattedPhone = normalizePhone(phone);
      const { error: emailError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: undefined, // This prevents magic link
          data: { ...userData, phone: formattedPhone }
        }
      });

      if (emailError) throw emailError;

      // Do NOT attempt to create/send phone OTP here yet.
      // We will send the phone OTP after email verification using updateUser().
      
      // Inform the user what's next
      toast({
        title: "OTP Sent",
        description: "Verification code sent to email. Verify email to trigger phone OTP.",
      });

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
      : { phone: normalizePhone(contact), token: otp, type: 'sms' as const };

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
    if (type === 'phone') {
      // For phone, we must be authenticated and use updateUser to trigger SMS OTP
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast({
          title: "Verify Email First",
          description: "Please verify your email to continue with phone verification.",
          variant: "destructive"
        });
        return { error: new Error('Session required to resend phone OTP') };
      }

      const { error } = await supabase.auth.updateUser({ phone: normalizePhone(contact) });

      if (error) {
        toast({
          title: "Resend Error",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "OTP Sent",
        description: "Verification code sent to your phone",
      });
      return { error: null };
    }

    // Email resend via OTP (no magic link)
    const { error } = await supabase.auth.signInWithOtp({
      email: contact,
      options: {
        emailRedirectTo: undefined // Prevent magic link
      }
    });

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

  const sendPhoneOtp = async (phone: string) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast({
        title: "Verify Email First",
        description: "Please verify your email to continue with phone verification.",
        variant: "destructive"
      });
      return { error: new Error('Session required to send phone OTP') };
    }

    const { error } = await supabase.auth.updateUser({ phone: normalizePhone(phone) });

    if (error) {
      toast({
        title: "Phone OTP Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    toast({
      title: "OTP Sent",
      description: "Verification code sent to your phone",
    });

    return { error: null };
  };

  return {
    loading,
    sendSignupOtp,
    verifySignupOtp,
    resendSignupOtp,
    sendPhoneOtp
  };
}