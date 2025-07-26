import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using Food Flow ("the Service"), you accept and agree to be bound by the terms 
                      and provision of this agreement. These Terms of Service ("Terms") apply to all visitors, users, 
                      and others who access or use the Service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Food Flow is a platform that connects food providers (restaurants, vendors, hotels, etc.) with 
                      food receivers (NGOs, charities, individuals) to facilitate the sharing and distribution of 
                      surplus food.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      The Service includes both free food donations and paid food transactions, with features for 
                      listing, browsing, booking, and coordinating food exchanges.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Food Providers</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Ensure all listed food meets health and safety standards</li>
                          <li>Provide accurate information about quantity, expiry time, and pickup details</li>
                          <li>Respond promptly to booking requests</li>
                          <li>Comply with local food safety regulations</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Food Receivers</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Use the food responsibly and for intended purposes</li>
                          <li>Respect pickup times and provider instructions</li>
                          <li>Report any food safety concerns immediately</li>
                          <li>Provide accurate contact and organization information</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Food Safety and Liability</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Important Notice:</strong> Food Flow is a platform that facilitates connections between 
                      food providers and receivers. We do not handle, prepare, or distribute food directly.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Food providers are solely responsible for food safety and quality</li>
                      <li>Food receivers assume responsibility upon accepting food items</li>
                      <li>Users must comply with local health department regulations</li>
                      <li>Food Flow is not liable for foodborne illness or safety issues</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For paid food items:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Payment is processed securely through our payment partners</li>
                      <li>Booking fees may apply and are non-refundable</li>
                      <li>Refunds are subject to provider policies and circumstances</li>
                      <li>All prices are listed in local currency</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Content and Conduct</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Users agree not to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Post false, misleading, or fraudulent information</li>
                      <li>Use the Service for any illegal or unauthorized purpose</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Violate any local, state, or national laws</li>
                      <li>Attempt to gain unauthorized access to the Service</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Privacy and Data Protection</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your privacy is important to us. Our collection and use of personal information is governed by 
                      our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, 
                      you consent to the collection and use of your information as outlined in the Privacy Policy.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Food Flow shall not be liable for any indirect, incidental, special, consequential, or punitive 
                      damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
                      losses, resulting from your use of the Service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may terminate or suspend your account and bar access to the Service immediately, without prior 
                      notice or liability, under our sole discretion, for any reason whatsoever, including without 
                      limitation a breach of the Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                      we will provide at least 30 days notice prior to any new terms taking effect.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-foreground font-medium">Food Flow Legal Team</p>
                      <p className="text-muted-foreground">Email: legal@foodflow.org</p>
                      <p className="text-muted-foreground">Address: 123 Community St, San Francisco, CA 94102</p>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}