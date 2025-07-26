import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, HandHeart, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "List Your Food",
    description: "Food providers upload available meals with details like quantity, expiry time, and location.",
    userType: "Food Lister"
  },
  {
    icon: Search,
    title: "Discover Available Food",
    description: "NGOs and individuals browse nearby food options filtered by location, quantity, and dietary needs.",
    userType: "Food Buyer"
  },
  {
    icon: HandHeart,
    title: "Connect & Coordinate",
    description: "Direct communication between providers and receivers to arrange pickup or delivery details.",
    userType: "Both"
  },
  {
    icon: CheckCircle,
    title: "Complete Exchange",
    description: "Track the food exchange from booking to completion, ensuring transparency and accountability.",
    userType: "Both"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How Food Flow Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and effective. Connect with your community in four easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-card transition-all duration-300 border-border bg-gradient-card">
              <CardContent className="p-6">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-soft">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {step.description}
                </p>

                {/* User Type Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-accent rounded-full text-xs font-medium text-accent-foreground">
                  {step.userType}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connect Arrow */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};