-- Fix the function search path security warning
CREATE OR REPLACE FUNCTION public.validate_user_contact()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NULL AND NEW.phone IS NULL THEN
    RAISE EXCEPTION 'Either email or phone must be provided';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path TO '';