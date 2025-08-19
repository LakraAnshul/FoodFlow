import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithOtp: (contact: string, type: 'email' | 'phone') => Promise<{ error: any }>;
  verifyOtp: (contact: string, otp: string, type: 'email' | 'phone') => Promise<{ error: any }>;
  resendOtp: (contact: string, type: 'email' | 'phone') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success!",
        description: "Account created successfully. Please check your email to verify your account."
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in."
      });
    }

    return { error };
  };

  const signInWithOtp = async (contact: string, type: 'email' | 'phone') => {
    const otpOptions = type === 'email' 
      ? { 
          email: contact,
          options: {
            shouldCreateUser: false // Don't create user during login OTP
          }
        }
      : { 
          phone: contact,
          options: {
            shouldCreateUser: false // Don't create user during login OTP
          }
        };

    const { error } = await supabase.auth.signInWithOtp(otpOptions);

    if (error) {
      toast({
        title: "OTP Send Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${type}`,
      });
    }

    return { error };
  };

  const verifyOtp = async (contact: string, otp: string, type: 'email' | 'phone') => {
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
    } else {
      toast({
        title: "Verification Successful",
        description: "You have been signed in successfully",
      });
    }

    return { error };
  };

  const resendOtp = async (contact: string, type: 'email' | 'phone') => {
    return await signInWithOtp(contact, type);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign Out Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithOtp,
      verifyOtp,
      resendOtp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}