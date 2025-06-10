import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Brand */}
        <div className="text-2xl font-bold text-primary">Office Leasing</div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-accent transition-colors">Hem</Link>
          <Link to="/auth" className="hover:text-accent transition-colors">Logga in</Link>
          <Link
            to="/search"
            className="px-4 py-2 bg-accent text-white rounded hover:bg-primary transition-colors"
          >
            Sök
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
