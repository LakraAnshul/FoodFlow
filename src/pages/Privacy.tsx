import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          {/* Privacy Principles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">Your data is protected with industry-standard security</p>
            </Card>
            <Card className="text-center p-6">
              <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Transparent</h3>
              <p className="text-sm text-muted-foreground">Clear information about what we collect and why</p>
            </Card>
            <Card className="text-center p-6">
              <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Private</h3>
              <p className="text-sm text-muted-foreground">We never sell your personal information</p>
            </Card>
            <Card className="text-center p-6">
              <UserCheck className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Controlled</h3>
              <p className="text-sm text-muted-foreground">You control your data and privacy settings</p>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Information You Provide</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Account information (name, email, phone number)</li>
                          <li>Profile information (organization details, location)</li>
                          <li>Food listings and requests</li>
                          <li>Communications with other users</li>
                          <li>Payment information (processed securely by third parties)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Information We Collect Automatically</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Device information and identifiers</li>
                          <li>Usage patterns and app interactions</li>
                          <li>Location data (with your permission)</li>
                          <li>Log files and technical information</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Provide and improve our food sharing platform</li>
                      <li>Connect food providers with food receivers</li>
                      <li>Process transactions and send confirmations</li>
                      <li>Communicate important updates and notifications</li>
                      <li>Ensure platform safety and prevent fraud</li>
                      <li>Analyze usage patterns to improve user experience</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell, trade, or rent your personal information. We may share information in these situations:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">With Other Users</h3>
                        <p className="text-muted-foreground">
                          Contact information is shared between food providers and receivers to facilitate exchanges.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">With Service Providers</h3>
                        <p className="text-muted-foreground">
                          Trusted third parties who help us operate the platform (payment processors, hosting providers).
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">For Legal Reasons</h3>
                        <p className="text-muted-foreground">
                          When required by law, to protect rights, or to ensure safety.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We implement appropriate security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Secure payment processing through certified providers</li>
                      <li>Employee training on data protection</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Privacy Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You have the following rights regarding your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li><strong>Access:</strong> Request a copy of your personal data</li>
                      <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                      <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                      <li><strong>Portability:</strong> Export your data in a readable format</li>
                      <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      <li><strong>Restrictions:</strong> Limit how we process your data</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies and Tracking</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar technologies to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Remember your preferences and settings</li>
                      <li>Improve platform performance and functionality</li>
                      <li>Analyze usage patterns and trends</li>
                      <li>Provide personalized content and recommendations</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      You can control cookie preferences through your browser settings.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your information for as long as necessary to provide our services and comply with legal obligations. 
                      Account information is kept while your account is active. After account deletion, we may retain some 
                      information for legal, safety, or business purposes as required.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Food Flow is not intended for children under 13. We do not knowingly collect personal information 
                      from children under 13. If we become aware that we have collected such information, we will take 
                      steps to delete it promptly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your information may be processed and stored in countries other than your own. We ensure appropriate 
                      safeguards are in place to protect your data during international transfers.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any material changes 
                      by posting the new policy on this page and updating the "Last updated" date.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or want to exercise your privacy rights, 
                      please contact us:
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-foreground font-medium">Food Flow Privacy Team</p>
                      <p className="text-muted-foreground">Email: privacy@foodflow.org</p>
                      <p className="text-muted-foreground">Address: 123 Community St, San Francisco, CA 94102</p>
                      <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
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