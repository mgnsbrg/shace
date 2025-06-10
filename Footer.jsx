import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Tack för din anmälan!");
    setEmail("");
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 text-gray-700 text-sm px-4 py-8 shadow-lg z-40">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        {/* Newsletter */}
        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="font-bold mb-2">Prenumerera på vårt nyhetsbrev</h3>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              required
              placeholder="Din e-post"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 rounded-l text-black flex-1"
            />
            <button type="submit" className="bg-accent px-4 rounded-r text-white">Prenumerera</button>
          </form>
        </div>
        {/* Links */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Länkar</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Hem</Link></li>
            <li><Link to="/search" className="hover:underline">Sök</Link></li>
            <li><Link to="/user-dashboard" className="hover:underline">Mina bokningar</Link></li>
            <li><Link to="/host-dashboard" className="hover:underline">Hyresvärd</Link></li>
            <li><Link to="/messages" className="hover:underline">Meddelanden</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
            <li><Link to="/admin" className="hover:underline">Admin</Link></li>
            <li><Link to="/auth" className="hover:underline">Logga in</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Office Leasing. Alla rättigheter förbehållna.</p>
    </footer>
  );
};

export default Footer;