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

    const {
      booking_id,
      status,
      lister_notes
    } = await req.json();

    // Verify the booking exists and user has permission to update it
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .or(`buyer_id.eq.${user.id},lister_id.eq.${user.id}`)
      .single();

    if (bookingError || !booking) {
      throw new Error('Booking not found or access denied');
    }

    // Determine what can be updated based on user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    let updateData: any = {};

    if (profile?.role === 'lister' && booking.lister_id === user.id) {
      // Listers can update status and add notes
      updateData.status = status;
      if (lister_notes) {
        updateData.lister_notes = lister_notes;
      }
    } else if (profile?.role === 'buyer' && booking.buyer_id === user.id) {
      // Buyers can only cancel their bookings
      if (status === 'cancelled') {
        updateData.status = status;
      } else {
        throw new Error('Buyers can only cancel their bookings');
      }
    } else {
      throw new Error('Access denied');
    }

    // Update the booking
    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', booking_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      throw error;
    }

    // If booking is cancelled, return quantity to the food listing
    if (status === 'cancelled') {
      const { error: updateListingError } = await supabase
        .from('food_listings')
        .update({
          quantity: supabase.raw(`quantity + ${booking.quantity_requested}`),
          is_available: true
        })
        .eq('id', booking.food_listing_id);

      if (updateListingError) {
        console.error('Error updating food listing quantity:', updateListingError);
      }
    }

    // Create notification for the other party
    const notificationUserId = booking.buyer_id === user.id ? booking.lister_id : booking.buyer_id;
    const notificationMessage = status === 'confirmed' 
      ? 'Your booking has been confirmed!'
      : status === 'cancelled'
      ? 'A booking has been cancelled.'
      : `Booking status updated to ${status}.`;

    await supabase
      .from('notifications')
      .insert({
        user_id: notificationUserId,
        title: 'Booking Update',
        message: notificationMessage,
        type: status === 'cancelled' ? 'warning' : 'info',
        related_booking_id: booking_id
      });

    return new Response(
      JSON.stringify({ success: true, booking: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in update-booking-status:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});