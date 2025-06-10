import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Listing() {
  const { id } = useParams();
  const [office, setOffice] = useState(null);

  useEffect(() => {
    const fetchOffice = async () => {
      const { data } = await supabase.from("offices").select("*").eq("id", id).single();
      setOffice(data);
    };
    fetchOffice();
  }, [id]);

  if (!office) return <div>Laddar...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">{office.title}</h1>
      <img src={office.image} alt={office.title} className="w-full h-64 object-cover mb-4" />
      <p>{office.description}</p>
      <p>Pris: {office.price} kr/dag</p>
      <p>Värd: {office.host_name}</p>
      <Link to={`/booking/${id}`} className="p-2 bg-blue-500 text-white mt-4 inline-block">
        Boka nu
      </Link>
    </div>
  );
}