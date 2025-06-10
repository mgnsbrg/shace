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
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col w-full bg-white">
          <Navbar />
          <main className="flex-grow w-full pt-[90px] pb-[220px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/listing/:id" element={<Listing />} />
              <Route path="/booking/:id" element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } />
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/host-dashboard" element={
                <ProtectedRoute>
                  <HostDashboard />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/support" element={<Support />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;