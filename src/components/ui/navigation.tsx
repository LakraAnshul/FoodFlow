import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    // You might want to check user role from metadata or profiles table
    return "/buyer-dashboard"; // Default for now
  };

  return (
    <nav className={cn("glass-nav sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Food Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-smooth">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-smooth">
              Contact
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#how-it-works" 
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <Button variant="outline" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to={getDashboardLink()} className="flex items-center justify-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};