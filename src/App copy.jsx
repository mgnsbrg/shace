import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Listing from "./pages/Listing";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import HostDashboard from "./pages/HostDashboard";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import AdminPanel from "./pages/AdminPanel";
import Auth from "./pages/Auth";

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full bg-white">
        <Navbar />
        <main className="flex-grow w-full pt-[90px] pb-[220px]">
          {/* pt matches navbar height+margin, pb matches footer height+padding */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/host-dashboard" element={<HostDashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
