import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState({ location: "", dates: "", guests: "" });
  const [offices, setOffices] = useState([]);

  const fetchPopularOffices = async () => {
    const { data } = await supabase.from("offices").select("*").limit(4);
    setOffices(data);
  };

  useEffect(() => {
    fetchPopularOffices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Hitta ditt perfekta kontor</h1>
      <div className="flex flex-col md:flex-row mb-4 gap-2">
        <input
          type="text"
          placeholder="Plats"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <input
          type="date"
          value={search.dates}
          onChange={(e) => setSearch({ ...search, dates: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <input
          type="number"
          placeholder="Antal gäster"
          value={search.guests}
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <Link to="/search" className="p-2 bg-accent text-white rounded min-w-[100px] text-center flex items-center justify-center">
          Sök
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Populära kontor</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {offices.map((office) => (
          <Card office={office} key={office.id} />
        ))}
      </div>
      <MapContainer center={[59.3293, 18.0686]} zoom={13} className="h-64 mt-8 rounded shadow">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {offices.map((office) =>
          typeof office.lat === "number" &&
          typeof office.lng === "number" &&
          !isNaN(office.lat) &&
          !isNaN(office.lng) ? (
            <Marker position={[office.lat, office.lng]} key={office.id}>
              <Popup>{office.title} - {office.price} kr</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}