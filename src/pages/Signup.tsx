import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PasswordInput } from "@/components/ui/password-input";
import { Heart, Mail, Lock, User, Phone, MapPin, Building, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useOtpAuth } from "@/hooks/useOtpAuth";

export default function Signup() {
  const [signupType, setSignupType] = useState<"lister" | "buyer">("buyer");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { sendSignupOtp } = useOtpAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Do not redirect here; OTP verification flow will handle navigation after both email and phone are verified.
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including phone number for OTP verification.",
        variant: "destructive"
      });
      return;
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Store pending password locally to set after email verification
    try { sessionStorage.setItem('ff_pending_password', password); } catch {}
    
    const userData = {
      full_name: fullName,
      role: signupType,
      phone,
      address,
      organization_name: signupType === "buyer" ? organizationName : fullName
    };

    const { error } = await sendSignupOtp(email, phone, userData);
    setLoading(false);

    if (!error) {
      // Navigate to OTP verification with signup data
      navigate("/otp-signup", {
        state: {
          signupData: {
            email,
            phone,
            role: signupType,
            fullName,
            address,
            organizationName
          }
        }
      });
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground mb-2">Join Food Flow</h1>
          <p className="text-muted-foreground">Start making a difference in your community</p>
        </div>

        <Card className="glass-card shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={signupType} onValueChange={(value) => setSignupType(value as "lister" | "buyer")}>
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer-name">Full Name / Organization Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="buyer-name" 
                        placeholder="Enter your name" 
                        className="pl-10"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="buyer-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="buyer-phone" 
                        type="tel" 
                        placeholder="Enter your phone" 
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="buyer-location" 
                        placeholder="City, State" 
                        className="pl-10"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="buyer-password" 
                        placeholder="Create a password (min 6 characters)" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="buyer-confirm-password" 
                        placeholder="Confirm your password" 
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {password && confirmPassword && password !== confirmPassword && (
                      <div className="flex items-center text-destructive text-sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Passwords do not match
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Food Buyer Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="lister" className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    For restaurants, vendors, hotels, and food providers
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lister-business">Business Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lister-business" 
                        placeholder="Enter business name" 
                        className="pl-10"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-contact">Contact Person</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lister-contact" 
                        placeholder="Contact person name" 
                        className="pl-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lister-email" 
                        type="email" 
                        placeholder="Business email" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lister-phone" 
                        type="tel" 
                        placeholder="Business phone" 
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-address">Business Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Textarea 
                        id="lister-address" 
                        placeholder="Full business address" 
                        className="pl-10 min-h-[60px]"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="lister-password" 
                        placeholder="Create a password (min 6 characters)" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lister-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="lister-confirm-password" 
                        placeholder="Confirm your password" 
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {password && confirmPassword && password !== confirmPassword && (
                      <div className="flex items-center text-destructive text-sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Passwords do not match
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Food Lister Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in here
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