import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const id = userData?.user?.id;
      setUserId(id);

      if (id) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, office:office_id(*)")
          .eq("user_id", id)
          .order("created_at", { ascending: false });
        setBookings(data || []);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Mina bokningar</h1>
      {loading ? (
        <div>Laddar dina bokningar...</div>
      ) : bookings.length === 0 ? (
        <div>Du har inga bokningar ännu.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Boknings-ID</th>
              <th className="border p-2">Kontor</th>
              <th className="border p-2">Pris</th>
              <th className="border p-2">Datum</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border p-2">{booking.id}</td>
                <td className="border p-2">
                  <Link to={`/listing/${booking.office_id}`} className="text-blue-500 underline">
                    {booking.office?.title || "Kontor"}
                  </Link>
                </td>
                <td className="border p-2">{booking.price} kr</td>
                <td className="border p-2">{booking.created_at?.slice(0, 10)}</td>
                <td className="border p-2">{booking.status || "Bokad"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
