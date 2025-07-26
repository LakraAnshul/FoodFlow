import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { 
  ArrowLeft,
  Package, 
  Clock, 
  DollarSign, 
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  CheckCircle
} from "lucide-react";

// Mock data - in real app this would come from API
const mockFoodDetails = {
  1: {
    id: 1,
    foodName: "Fresh Vegetable Soup",
    quantity: "20 servings",
    provider: "Green Cafe",
    location: "Downtown, 0.5 miles",
    expiryTime: "2 hours",
    price: "Free",
    contact: "+1 (555) 123-4567",
    email: "contact@greencafe.com",
    address: "123 Main St, Downtown",
    description: "Healthy vegetable soup made with fresh organic vegetables. Perfect for community meals.",
    available: true
  }
};

export default function BookingPage() {
  const { id } = useParams();
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    requestedQuantity: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    organization: "",
    pickupTime: "",
    specialRequests: ""
  });

  const foodItem = mockFoodDetails[parseInt(id || "1") as keyof typeof mockFoodDetails];

  if (!foodItem) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Food Item Not Found</h1>
          <Link to="/buyer-dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    setBookingStep(prev => prev + 1);
  };

  const handleBookingSubmit = () => {
    // In real app, this would submit to API
    setBookingStep(4); // Success step
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/buyer-dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Food Item</h1>
          <p className="text-muted-foreground">Complete your booking request</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Food Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>Food Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {foodItem.foodName}
                </h3>
                <p className="text-muted-foreground">{foodItem.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{foodItem.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Quantity:</span>
                  <span className="font-medium">{foodItem.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <Badge variant={foodItem.price === "Free" ? "default" : "secondary"}>
                    {foodItem.price}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available for:</span>
                  <span className="font-medium">{foodItem.expiryTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{foodItem.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{foodItem.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{foodItem.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {bookingStep === 1 && "Booking Details"}
                {bookingStep === 2 && "Contact Information"}
                {bookingStep === 3 && "Review & Confirm"}
                {bookingStep === 4 && "Booking Confirmed!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Requested Quantity</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 10 servings"
                      value={bookingDetails.requestedQuantity}
                      onChange={(e) => handleInputChange("requestedQuantity", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickup-time">Preferred Pickup Time</Label>
                    <Input
                      id="pickup-time"
                      type="datetime-local"
                      value={bookingDetails.pickupTime}
                      onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requirements or notes..."
                      value={bookingDetails.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleNextStep}
                    disabled={!bookingDetails.requestedQuantity}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contact-name"
                        placeholder="Your full name"
                        className="pl-10"
                        value={bookingDetails.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input
                      id="organization"
                      placeholder="NGO, charity, or organization name"
                      value={bookingDetails.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="Your phone number"
                        className="pl-10"
                        value={bookingDetails.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="Your email address"
                        className="pl-10"
                        value={bookingDetails.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => setBookingStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handleNextStep}
                      disabled={!bookingDetails.contactName || !bookingDetails.contactPhone || !bookingDetails.contactEmail}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Food Item:</span>
                        <span>{foodItem.foodName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Requested Quantity:</span>
                        <span>{bookingDetails.requestedQuantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pickup Time:</span>
                        <span>{bookingDetails.pickupTime || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>{bookingDetails.contactName}</span>
                      </div>
                      {bookingDetails.organization && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Organization:</span>
                          <span>{bookingDetails.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {foodItem.price !== "Free" && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Payment Information</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Payment Required</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          A booking fee will be charged for this item. Payment processing will be handled securely.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => setBookingStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handleBookingSubmit}
                    >
                      {foodItem.price === "Free" ? "Submit Request" : "Pay & Book"}
                    </Button>
                  </div>
                </div>
              )}

              {bookingStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Booking Request Submitted!
                    </h3>
                    <p className="text-muted-foreground">
                      Your booking request has been sent to {foodItem.provider}. 
                      You'll receive a confirmation email shortly.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg text-left">
                    <h4 className="font-medium text-foreground mb-2">Next Steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Wait for provider confirmation</li>
                      <li>• Check your email for updates</li>
                      <li>• Contact provider if needed: {foodItem.contact}</li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/buyer-dashboard">View My Bookings</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/buyer-dashboard">Browse More Food</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}