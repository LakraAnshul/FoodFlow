import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Leaf, Target, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    description: "Former NGO director passionate about fighting food waste and hunger."
  },
  {
    name: "Mike Chen",
    role: "CTO",
    description: "Tech entrepreneur focused on building platforms for social good."
  },
  {
    name: "Emily Rodriguez",
    role: "Community Manager",
    description: "Expert in community building and stakeholder engagement."
  }
];

const impactStats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Lives Impacted",
    description: "People who have received food through our platform"
  },
  {
    icon: Leaf,
    number: "50,000+",
    label: "Meals Saved",
    description: "Food items rescued from going to waste"
  },
  {
    icon: Globe,
    number: "150+",
    label: "Partner Organizations",
    description: "Restaurants, NGOs, and community groups"
  },
  {
    icon: Award,
    number: "25+",
    label: "Cities",
    description: "Communities actively using Food Flow"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-light/30 rounded-full text-sm font-medium text-primary-dark mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Our Story
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Building Bridges Between
            <span className="text-primary block">Abundance & Need</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Food Flow was born from a simple yet powerful idea: in a world where food waste coexists with hunger, 
            technology can create connections that nourish communities and protect our planet.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that no food should go to waste while people in our communities go hungry. 
                Food Flow connects food providers with those in need, creating a sustainable ecosystem 
                of sharing that benefits everyone.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform empowers restaurants, hotels, event venues, and individuals to easily 
                share surplus food with NGOs, charities, and community members who can put it to good use.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Reduce Food Waste</h3>
                    <p className="text-muted-foreground">Divert surplus food from landfills to communities in need.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Fight Hunger</h3>
                    <p className="text-muted-foreground">Ensure nutritious food reaches those who need it most.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Strengthen Communities</h3>
                    <p className="text-muted-foreground">Build connections that create lasting positive impact.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Sustainable</h3>
                  <p className="text-sm text-muted-foreground">Environmentally responsible food sharing</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Local connections that matter</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Compassionate</h3>
                  <p className="text-sm text-muted-foreground">Care-driven food distribution</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Efficient</h3>
                  <p className="text-sm text-muted-foreground">Quick and effective food rescue</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a real difference in communities across the country.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                <h4 className="font-semibold text-foreground mb-2">{stat.label}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to creating positive change through technology and community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of individuals and organizations who are already part of the Food Flow community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">Join Food Flow</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}