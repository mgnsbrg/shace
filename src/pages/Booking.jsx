import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("DIN_STRIPE_PUBLISHABLE_KEY");

export default function Booking() {
  const { id } = useParams();

  const handleBooking = async () => {
    const { data: office } = await supabase.from("offices").select("*").eq("id", id).single();
    const { data: user } = await supabase.auth.getUser();

    // Skapa bokning
    const { data: booking } = await supabase
      .from("bookings")
      .insert([{ user_id: user.id, office_id: id, price: office.price }])
      .select()
      .single();

    // Skicka e-postbekräftelse
    await supabase.functions.invoke("send-email", {
      body: { to: user.email, subject: "Bokningsbekräftelse", message: `Du har bokat ${office.title}!` },
    });

    // Betalning med Stripe
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "DIN_STRIPE_PRICE_ID", quantity: 1 }],
      mode: "payment",
      successUrl: `${window.location.origin}/user-dashboard`,
      cancelUrl: `${window.location.origin}/booking/${id}`,
    });

    if (error) alert(error.message);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Bekräfta din bokning</h1>
      <button onClick={handleBooking} className="p-2 bg-blue-500 text-white">
        Boka i 3 klick
      </button>
    </div>
  );
}