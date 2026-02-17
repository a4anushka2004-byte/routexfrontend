import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DriverProvider } from './context/DriverContext';
import LandingPage from './pages/LandingPage';
import PartnerDashboard from './pages/PartnerDashboard';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ActiveOrder from './pages/ActiveOrder';
import DropOff from './pages/DropOff';
import DeliveryRequest from './pages/DeliveryRequest';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import EditProfile from './pages/EditProfile';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';

import AdminDashboard from './pages/AdminDashboard';
import FleetManagerDashboard from './pages/FleetManagerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <DriverProvider>
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Partner Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['driver']}>
                <PartnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={<ProtectedRoute roles={['driver']}><Wallet /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/delivery-request" element={<ProtectedRoute roles={['driver']}><DeliveryRequest /></ProtectedRoute>} />
            <Route path="/active-order" element={<ProtectedRoute roles={['driver']}><ActiveOrder /></ProtectedRoute>} />
            <Route path="/drop-off" element={<ProtectedRoute roles={['driver']}><DropOff /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

            {/* Fleet Manager Routes */}
            <Route path="/fleet-dashboard" element={
              <ProtectedRoute roles={['fleet_manager']}>
                <FleetManagerDashboard />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </DriverProvider>
    </ThemeProvider>
  );
}

export default App;