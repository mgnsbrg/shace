import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Registrering lyckades! Kolla din e-post.");
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert("Inloggad!");
  };

  return (
    <div className="max-w-md p-4">
      <h1 className="text-2xl mb-4">Logga in eller registrera dig</h1>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border"
      />
      <button onClick={handleSignUp} className="w-full p-2 bg-blue-500 text-white">
        Registrera
      </button>
      <button onClick={handleSignIn} className="w-full p-2 mt-2 bg-green-500 text-white">
        Logga in
      </button>
    </div>
  );
}