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

    // Verify user is a lister
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'lister') {
      throw new Error('Only listers can create food listings');
    }

    const {
      title,
      description,
      food_type,
      quantity,
      unit,
      pickup_location,
      pickup_time_start,
      pickup_time_end,
      expiry_date,
      price,
      special_instructions,
      contact_phone,
      image_url
    } = await req.json();

    // Create the food listing
    const { data, error } = await supabase
      .from('food_listings')
      .insert({
        lister_id: user.id,
        title,
        description,
        food_type,
        quantity,
        unit,
        pickup_location,
        pickup_time_start,
        pickup_time_end,
        expiry_date,
        price: price || 0,
        special_instructions,
        contact_phone,
        image_url
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating food listing:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, listing: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-food-listing:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});