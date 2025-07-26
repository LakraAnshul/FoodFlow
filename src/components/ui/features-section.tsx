import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  Shield, 
  Smartphone, 
  Bell, 
  CreditCard,
  Users,
  Leaf
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description: "Find food donations near you with integrated map functionality and radius-based search.",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant notifications about new food listings and booking confirmations.",
    color: "text-green-600"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Verified users, secure transactions, and trusted community guidelines ensure safety.",
    color: "text-purple-600"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Access Food Flow on any device with our responsive, mobile-first design.",
    color: "text-orange-600"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Personalized alerts based on your preferences, location, and dietary requirements.",
    color: "text-red-600"
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Support both free donations and paid food options with secure payment processing.",
    color: "text-indigo-600"
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Built for NGOs, charities, restaurants, and individuals to strengthen communities.",
    color: "text-teal-600"
  },
  {
    icon: Leaf,
    title: "Sustainability Impact",
    description: "Track your contribution to reducing food waste and environmental impact.",
    color: "text-green-700"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to connect, share, and make a difference in your community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 border-border bg-card/80 backdrop-blur-sm hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary font-medium">
            <Leaf className="w-5 h-5 mr-2" />
            Join thousands making a difference
          </div>
        </div>
      </div>
    </section>
  );
};