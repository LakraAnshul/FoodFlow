import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Verify user is a buyer
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'buyer') {
      throw new Error('Only buyers can create bookings');
    }

    const {
      food_listing_id,
      quantity_requested,
      pickup_time,
      buyer_notes
    } = await req.json();

    // Get the food listing to verify availability and get lister info
    const { data: listing, error: listingError } = await supabase
      .from('food_listings')
      .select('*')
      .eq('id', food_listing_id)
      .eq('is_available', true)
      .single();

    if (listingError || !listing) {
      throw new Error('Food listing not found or not available');
    }

    // Check if requested quantity is available
    if (quantity_requested > listing.quantity) {
      throw new Error('Requested quantity exceeds available quantity');
    }

    // Calculate total amount
    const total_amount = listing.price * quantity_requested;

    // Create the booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        food_listing_id,
        buyer_id: user.id,
        lister_id: listing.lister_id,
        quantity_requested,
        pickup_time,
        buyer_notes,
        total_amount,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }

    // Update the food listing quantity
    const newQuantity = listing.quantity - quantity_requested;
    const { error: updateError } = await supabase
      .from('food_listings')
      .update({
        quantity: newQuantity,
        is_available: newQuantity > 0
      })
      .eq('id', food_listing_id);

    if (updateError) {
      console.error('Error updating food listing quantity:', updateError);
    }

    return new Response(
      JSON.stringify({ success: true, booking: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-booking:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});