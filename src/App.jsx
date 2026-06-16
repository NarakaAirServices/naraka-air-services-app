import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import FlightBooking from './pages/FlightBooking';
import UmrahPackages from './pages/UmrahPackages';
import VisaServices from './pages/VisaServices';
import Hotels from './pages/Hotels';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactForm from './pages/ContactForm';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white pb-20">
          <Header />
          <main className="animate-fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<FlightBooking />} />
              <Route path="/umrah" element={<UmrahPackages />} />
              <Route path="/visa" element={<VisaServices />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;