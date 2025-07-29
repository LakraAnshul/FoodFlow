-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('buyer', 'lister');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  organization_name TEXT, -- For NGOs/charities or restaurant names
  organization_type TEXT, -- 'ngo', 'charity', 'restaurant', 'vendor', etc.
  role user_role NOT NULL DEFAULT 'buyer',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create food listings table
CREATE TABLE public.food_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lister_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  food_type TEXT, -- 'vegetarian', 'non-vegetarian', 'vegan', etc.
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL, -- 'plates', 'kg', 'portions', etc.
  pickup_location TEXT NOT NULL,
  pickup_time_start TIMESTAMPTZ NOT NULL,
  pickup_time_end TIMESTAMPTZ NOT NULL,
  expiry_date TIMESTAMPTZ NOT NULL,
  price DECIMAL(10,2) DEFAULT 0, -- Can be 0 for free food
  is_available BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  special_instructions TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lister_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quantity_requested INTEGER NOT NULL,
  pickup_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  buyer_notes TEXT,
  lister_notes TEXT,
  total_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for food_listings table
CREATE POLICY "Anyone can view available listings" ON public.food_listings FOR SELECT USING (is_available = true);
CREATE POLICY "Listers can view own listings" ON public.food_listings FOR SELECT USING (auth.uid() = lister_id);
CREATE POLICY "Listers can create listings" ON public.food_listings FOR INSERT WITH CHECK (auth.uid() = lister_id);
CREATE POLICY "Listers can update own listings" ON public.food_listings FOR UPDATE USING (auth.uid() = lister_id);
CREATE POLICY "Listers can delete own listings" ON public.food_listings FOR DELETE USING (auth.uid() = lister_id);

-- Create policies for bookings table
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = lister_id);
CREATE POLICY "Buyers can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Users can update bookings they're involved in" ON public.bookings FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = lister_id);

-- Create policies for notifications table
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'buyer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_food_listings_updated_at BEFORE UPDATE ON public.food_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle booking creation notifications
CREATE OR REPLACE FUNCTION public.notify_on_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify the lister about new booking
  INSERT INTO public.notifications (user_id, title, message, type, related_booking_id)
  VALUES (
    NEW.lister_id,
    'New Booking Request',
    'You have received a new booking request for your food listing.',
    'info',
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for booking notifications
CREATE TRIGGER on_booking_created
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_new_booking();

-- Create indexes for better performance
CREATE INDEX idx_food_listings_lister_id ON public.food_listings(lister_id);
CREATE INDEX idx_food_listings_available ON public.food_listings(is_available);
CREATE INDEX idx_food_listings_pickup_time ON public.food_listings(pickup_time_start, pickup_time_end);
CREATE INDEX idx_bookings_buyer_id ON public.bookings(buyer_id);
CREATE INDEX idx_bookings_lister_id ON public.bookings(lister_id);
CREATE INDEX idx_bookings_food_listing_id ON public.bookings(food_listing_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);