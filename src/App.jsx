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

function App() {
  return (
    <DriverProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PartnerDashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/delivery-request" element={<DeliveryRequest />} />
          <Route path="/active-order" element={<ActiveOrder />} />
          <Route path="/drop-off" element={<DropOff />} />
        </Routes>
      </BrowserRouter>
    </DriverProvider>
  );
}

export default App;