import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navigation } from "@/components/ui/navigation";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Package, 
  Clock, 
  DollarSign, 
  MapPin,
  Users,
  Bell,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

// Mock data for food listings
const mockMyListings = [
  {
    id: 1,
    foodName: "Fresh Vegetable Soup",
    quantity: "20 servings",
    expiryTime: "2 hours",
    price: "Free",
    status: "active",
    views: 24,
    interested: 5,
    created: "2 hours ago"
  },
  {
    id: 2,
    foodName: "Surplus Wedding Food",
    quantity: "50 servings",
    expiryTime: "1 hour",
    price: "Free",
    status: "active",
    views: 45,
    interested: 12,
    created: "1 hour ago"
  },
  {
    id: 3,
    foodName: "Fresh Bakery Items",
    quantity: "30 items",
    expiryTime: "Expired",
    price: "$2 each",
    status: "expired",
    views: 18,
    interested: 3,
    created: "1 day ago"
  }
];

const mockBookingRequests = [
  {
    id: 1,
    buyerName: "City Food Bank",
    foodItem: "Fresh Vegetable Soup",
    requestedQuantity: "10 servings",
    contactInfo: "+1 (555) 123-4567",
    email: "contact@cityfoodbank.org",
    message: "We would like to pick up 10 servings for our evening distribution program.",
    requestTime: "30 minutes ago"
  },
  {
    id: 2,
    buyerName: "Green Community Center",
    foodItem: "Surplus Wedding Food",
    requestedQuantity: "25 servings",
    contactInfo: "+1 (555) 987-6543",
    email: "info@greencenter.org",
    message: "Perfect for our community lunch program tomorrow.",
    requestTime: "1 hour ago"
  }
];

export default function ListerDashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Food Lister Dashboard</h1>
            <p className="text-muted-foreground">Manage your food listings and booking requests</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Food Listing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input id="food-name" placeholder="e.g., Fresh Vegetable Soup" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input id="quantity" placeholder="e.g., 20 servings, 10 boxes" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiry">Available Until</Label>
                  <Input id="expiry" type="datetime-local" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (leave empty for free)</Label>
                  <Input id="price" placeholder="e.g., $5 per serving or leave empty" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the food item..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pickup-address">Pickup Address</Label>
                  <Textarea id="pickup-address" placeholder="Full pickup address..." />
                </div>
                
                <Button className="w-full" onClick={() => setIsAddDialogOpen(false)}>
                  Create Listing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">87</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="requests">Booking Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">My Food Listings</h2>
              {mockMyListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{listing.foodName}</h3>
                          <Badge variant={listing.status === "active" ? "default" : "destructive"}>
                            {listing.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{listing.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Available for {listing.expiryTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{listing.price}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{listing.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{listing.interested} interested</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">Created {listing.created}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Booking Requests</h2>
              {mockBookingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">{request.buyerName}</h3>
                          <p className="text-sm text-muted-foreground">Interested in: {request.foodItem}</p>
                        </div>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span>Requested: {request.requestedQuantity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{request.contactInfo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{request.requestTime}</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm"><strong>Message:</strong> {request.message}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm">Accept Request</Button>
                        <Button variant="outline" size="sm">Contact Buyer</Button>
                        <Button variant="destructive" size="sm">Decline</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}