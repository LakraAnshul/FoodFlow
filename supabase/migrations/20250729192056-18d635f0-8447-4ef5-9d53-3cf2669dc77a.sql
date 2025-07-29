-- Fix security definer functions by setting search_path

-- Drop and recreate handle_new_user function with proper search_path
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'buyer'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Drop and recreate update_updated_at_column function with proper search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop and recreate notify_on_new_booking function with proper search_path
DROP FUNCTION IF EXISTS public.notify_on_new_booking();
CREATE OR REPLACE FUNCTION public.notify_on_new_booking()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;