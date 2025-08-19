import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordInput } from "@/components/ui/password-input";
import { Heart, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [loginType, setLoginType] = useState<"lister" | "buyer">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role after login
      navigate(loginType === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
    }
  }, [user, loginType, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (!error) {
      navigate(loginType === "lister" ? "/lister-dashboard" : "/buyer-dashboard");
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your food sharing journey</p>
        </div>

        <Card className="glass-card shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Choose Your Role</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "lister" | "buyer")}>
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
                    <Label htmlFor="buyer-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="buyer-password" 
                        placeholder="Enter your password" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In as Food Buyer"}
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
                    <Label htmlFor="lister-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="lister-email" 
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
                    <Label htmlFor="lister-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <PasswordInput 
                        id="lister-password" 
                        placeholder="Enter your password" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In as Food Lister"}
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
            </div>

            <div className="mt-4 text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground block">
                Forgot your password?
              </Link>
              <Link to="/otp-login" className="text-sm text-primary hover:underline block">
                Sign in with OTP instead
              </Link>
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