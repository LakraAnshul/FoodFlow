import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HelpCircle,
  Users
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours",
    contact: "hello@foodflow.org",
    action: "Send Email"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    action: "Call Now"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Stop by our office for an in-person chat",
    contact: "123 Community St, San Francisco, CA 94102",
    action: "Get Directions"
  }
];

const supportOptions = [
  {
    icon: HelpCircle,
    title: "General Inquiries",
    description: "Questions about how Food Flow works or getting started"
  },
  {
    icon: Users,
    title: "Partnership Opportunities",
    description: "Interested in partnering with Food Flow or bulk enrollments"
  },
  {
    icon: MessageCircle,
    title: "Technical Support",
    description: "Need help with the platform or experiencing technical issues"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help you make the most of Food Flow. Reach out with questions, 
            suggestions, or partnership opportunities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input id="organization" placeholder="Your organization name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <p className="font-medium text-foreground text-sm">{method.contact}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Office Hours</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday:</span>
                        <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday:</span>
                        <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday:</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Types */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">What can we help you with?</h3>
              <div className="space-y-3">
                {supportOptions.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                      <option.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}