import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Support() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!email || !message) {
      setStatus("Fyll i både e-post och meddelande.");
      return;
    }
    const { error } = await supabase
      .from("support_messages")
      .insert([{ email, message }]);
    if (error) {
      setStatus("Något gick fel. Försök igen.");
    } else {
      setStatus("Tack för ditt meddelande! Vi återkommer så snart vi kan.");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-lg">
      <h1 className="text-3xl mb-4">Support & Kontakt</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Din e-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Hur kan vi hjälpa dig?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border rounded min-h-[100px]"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Skicka
        </button>
        {status && <div className="text-sm mt-2">{status}</div>}
      </form>
      <div className="mt-8 text-gray-600">
        <p>Du kan också kontakta oss på <a href="mailto:support@shace.se" className="underline text-blue-600">support@shace.se</a></p>
      </div>
    </div>
  );
}
