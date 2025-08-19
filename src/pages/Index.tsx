import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { HowItWorks } from "@/components/ui/how-it-works";
import { FeaturesSection } from "@/components/ui/features-section";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
