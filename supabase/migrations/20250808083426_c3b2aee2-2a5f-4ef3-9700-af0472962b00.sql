-- Fix the profiles table to allow null email temporarily during phone-only signup
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- Add a trigger to ensure either email or phone is provided
CREATE OR REPLACE FUNCTION public.validate_user_contact()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NULL AND NEW.phone IS NULL THEN
    RAISE EXCEPTION 'Either email or phone must be provided';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_user_contact_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_user_contact();