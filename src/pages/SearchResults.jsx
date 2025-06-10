import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Card from "../components/Card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SearchResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data } = await supabase.from("offices").select("*");
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl font-bold mb-4">Sökresultat</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((office) => (
            <Card office={office} key={office.id} />
          ))}
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <MapContainer center={[59.3293, 18.0686]} zoom={13} className="w-full h-96 rounded shadow">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {results.map((office) =>
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
    </div>
  );
}