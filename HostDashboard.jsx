import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function HostDashboard() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hostEmail, setHostEmail] = useState("");

  useEffect(() => {
    const fetchHostOffices = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      setHostEmail(email);

      if (email) {
        const { data } = await supabase
          .from("offices")
          .select("*")
          .eq("host_email", email);
        setOffices(data || []);
      }
      setLoading(false);
    };
    fetchHostOffices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Vill du ta bort detta kontor?")) return;
    await supabase.from("offices").delete().eq("id", id);
    setOffices(offices.filter((office) => office.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Värddashboard</h1>
      {loading ? (
        <div>Laddar dina kontor...</div>
      ) : offices.length === 0 ? (
        <div>Du har inga kontor upplagda.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Titel</th>
              <th className="border p-2">Pris</th>
              <th className="border p-2">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id}>
                <td className="border p-2">{office.id}</td>
                <td className="border p-2">
                  <Link to={`/listing/${office.id}`} className="text-blue-500 underline">
                    {office.title}
                  </Link>
                </td>
                <td className="border p-2">{office.price} kr/dag</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Ta bort
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
