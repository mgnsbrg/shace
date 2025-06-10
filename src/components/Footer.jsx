import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate newsletter subscription
    setSubscribeStatus("Tack för din anmälan!");
    setEmail("");
    
    setTimeout(() => {
      setSubscribeStatus("");
    }, 3000);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 text-gray-700 text-sm px-4 py-6 shadow-lg z-40">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-3 text-gray-900">Prenumerera på vårt nyhetsbrev</h3>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                required
                placeholder="Din e-post"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <button 
                type="submit" 
                className="bg-accent px-4 rounded-r-lg text-white hover:bg-primary transition-colors"
              >
                Prenumerera
              </button>
            </form>
            {subscribeStatus && (
              <p className="text-green-600 text-xs mt-2">{subscribeStatus}</p>
            )}
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3 text-gray-900">Snabblänkar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Hem</Link></li>
              <li><Link to="/search" className="hover:text-accent transition-colors">Sök kontor</Link></li>
              <li><Link to="/user-dashboard" className="hover:text-accent transition-colors">Mina bokningar</Link></li>
              <li><Link to="/host-dashboard" className="hover:text-accent transition-colors">Bli hyresvärd</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-bold mb-3 text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="hover:text-accent transition-colors">Kontakta oss</Link></li>
              <li><Link to="/messages" className="hover:text-accent transition-colors">Meddelanden</Link></li>
              <li>
                <a href="mailto:support@officeleasing.se" className="hover:text-accent transition-colors">
                  support@officeleasing.se
                </a>
              </li>
              <li className="text-gray-500">08-123 456 78</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Office Leasing. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;