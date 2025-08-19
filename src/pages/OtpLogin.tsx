import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, Phone } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { OtpVerification } from "@/components/ui/otp-verification";

export default function OtpLogin() {
  const [loginType, setLoginType] = useState<"buyer" | "lister">("buyer");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { signInWithOtp, verifyOtp, resendOtp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || (loginType === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
      navigate(from);
    }
  }, [user, loginType, navigate, location]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    setLoading(true);
    const { error } = await signInWithOtp(contact, contactMethod);
    setLoading(false);

    if (!error) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const result = await verifyOtp(contact, otp, contactMethod);
    if (!result.error) {
      navigate(loginType === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
    }
    return result;
  };

  const handleResendOtp = async () => {
    return await resendOtp(contact, contactMethod);
  };

  const handleBack = () => {
    setOtpSent(false);
    setContact("");
  };

  if (otpSent) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Food Flow</span>
            </Link>
          </div>

          <OtpVerification
            type={contactMethod}
            contact={contact}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            loading={loading}
          />

          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Food Flow</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in with OTP verification</p>
        </div>

        <Card className="glass-card shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Choose Your Role</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "buyer" | "lister")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buyer">Food Buyer</TabsTrigger>
                <TabsTrigger value="lister">Food Lister</TabsTrigger>
              </TabsList>

              <TabsContent value="buyer" className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    For NGOs, charities, and individuals seeking food
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <Tabs value={contactMethod} onValueChange={(value) => setContactMethod(value as "email" | "phone")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-2">
                      <Label htmlFor="buyer-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="buyer-email" 
                          type="email" 
                          placeholder="Enter your email" 
                          className="pl-10"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-2">
                      <Label htmlFor="buyer-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="buyer-phone" 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          className="pl-10"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending OTP..." : `Send OTP to ${contactMethod === "email" ? "Email" : "Phone"}`}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="lister" className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    For restaurants, vendors, hotels, and food providers
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <Tabs value={contactMethod} onValueChange={(value) => setContactMethod(value as "email" | "phone")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-2">
                      <Label htmlFor="lister-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="lister-email" 
                          type="email" 
                          placeholder="Enter your business email" 
                          className="pl-10"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-2">
                      <Label htmlFor="lister-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="lister-phone" 
                          type="tel" 
                          placeholder="Enter your business phone" 
                          className="pl-10"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending OTP..." : `Send OTP to ${contactMethod === "email" ? "Email" : "Phone"}`}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up here
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Prefer password login?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Use password
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}