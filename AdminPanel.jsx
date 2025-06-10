import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffices = async () => {
    setLoading(true);
    const { data } = await supabase.from("offices").select("*");
    setOffices(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta kontor?")) return;
    await supabase.from("offices").delete().eq("id", id);
    fetchOffices();
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Adminpanel</h1>
      {loading ? (
        <div>Laddar kontor...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Titel</th>
              <th className="border p-2">Pris</th>
              <th className="border p-2">Värd</th>
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
                <td className="border p-2">{office.host_name}</td>
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
