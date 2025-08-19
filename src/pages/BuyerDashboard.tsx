import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/ui/navigation";
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Heart, 
  Filter,
  Star,
  Phone,
  Mail,
  Calendar,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for food listings
const mockFoodListings = [
  {
    id: 1,
    foodName: "Fresh Vegetable Soup",
    quantity: "20 servings",
    provider: "Green Cafe",
    location: "Downtown, 0.5 miles",
    expiryTime: "2 hours",
    price: "Free",
    rating: 4.8,
    contact: "+1 (555) 123-4567",
    email: "contact@greencafe.com",
    address: "123 Main St, Downtown",
    description: "Healthy vegetable soup made with fresh organic vegetables.",
    available: true
  },
  {
    id: 2,
    foodName: "Sandwiches & Salads",
    quantity: "15 items",
    provider: "Metro Deli",
    location: "Midtown, 1.2 miles",
    expiryTime: "4 hours",
    price: "$5 per item",
    rating: 4.5,
    contact: "+1 (555) 987-6543",
    email: "orders@metrodeli.com",
    address: "456 Oak Ave, Midtown",
    description: "Assorted sandwiches and fresh salads, perfect for groups.",
    available: true
  },
  {
    id: 3,
    foodName: "Wedding Surplus Food",
    quantity: "50 servings",
    provider: "Grand Palace Hotel",
    location: "Uptown, 2.1 miles",
    expiryTime: "1 hour",
    price: "Free",
    rating: 4.9,
    contact: "+1 (555) 456-7890",
    email: "events@grandpalace.com",
    address: "789 Palace Drive, Uptown",
    description: "High-quality surplus food from wedding event including appetizers and main courses.",
    available: true
  }
];

const mockMyBookings = [
  {
    id: 1,
    foodName: "Fresh Bread & Pastries",
    provider: "Baker's Corner",
    quantity: "10 items",
    bookingDate: "Today, 2:00 PM",
    status: "confirmed",
    pickupTime: "4:00 PM - 6:00 PM"
  },
  {
    id: 2,
    foodName: "Fruit Boxes",
    provider: "Organic Market",
    quantity: "5 boxes",
    bookingDate: "Yesterday",
    status: "completed",
    pickupTime: "Delivered"
  }
];

export default function BuyerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<number | null>(null);

  const filteredListings = mockFoodListings.filter(listing =>
    listing.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Food Buyer Dashboard</h1>
          <p className="text-muted-foreground">Discover and book available food in your area</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="browse">Browse Food</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for food, restaurants, or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Near Me
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Food Listings */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Listings List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Available Food ({filteredListings.length})</h2>
                {filteredListings.map((listing) => (
                  <Card 
                    key={listing.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                      selectedListing === listing.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedListing(listing.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{listing.foodName}</h3>
                        <Badge variant={listing.price === "Free" ? "default" : "secondary"}>
                          {listing.price}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{listing.provider}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span>Quantity: {listing.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Available for {listing.expiryTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{listing.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected Listing Details */}
              <div className="lg:sticky lg:top-24">
                {selectedListing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Listing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const listing = mockFoodListings.find(l => l.id === selectedListing);
                        if (!listing) return null;
                        
                        return (
                          <>
                            <div>
                              <h3 className="font-semibold text-lg text-foreground mb-2">
                                {listing.foodName}
                              </h3>
                              <p className="text-muted-foreground">{listing.description}</p>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Provider:</span>
                                <span className="font-medium">{listing.provider}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Quantity:</span>
                                <span className="font-medium">{listing.quantity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Price:</span>
                                <Badge variant={listing.price === "Free" ? "default" : "secondary"}>
                                  {listing.price}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Available for:</span>
                                <span className="font-medium">{listing.expiryTime}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium text-foreground">Contact Information</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{listing.contact}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span>{listing.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span>{listing.address}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button className="w-full" asChild>
                                <Link to={`/booking/${listing.id}`}>
                                  Book This Food
                                </Link>
                              </Button>
                              <Button variant="outline" className="w-full">
                                Contact Provider
                              </Button>
                            </div>
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-foreground mb-2">Select a Listing</h3>
                      <p className="text-sm text-muted-foreground">
                        Click on any food listing to view details and contact information
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">My Bookings</h2>
              <div className="space-y-4">
                {mockMyBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">{booking.foodName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.provider}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.quantity}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.bookingDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pickup: {booking.pickupTime}
                          </p>
                        </div>
                        <Badge 
                          variant={booking.status === "completed" ? "default" : "secondary"}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}