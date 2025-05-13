import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import HomePage from './pages/Home/HomePage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';
import Info from './pages/Info/Info';
import Help from './pages/Help/Help';
import AdminControls from './pages/ADMIN CONTROLS/ADMIN CONTROLS';
import UserProfile from './pages/UserProfile/UserProfile';
import Loading from './pages/Loading/Loading';
import Chat from './pages/Chat/Chat';
import OtherUserProfile from './pages/OtherUserProfile/OtherUserProfile';
import AllUsers from './pages/AllUsers/AllUsers';
import PendingRequests from './pages/AllUsers/PendingRequests';
import GuardifyLogo from './pages/GuardifyLogo/GuardifyLogo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage on page load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AdminControls" element={<AdminControls />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Auth" element={<Auth setUser={setUser} />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/info" element={<Info />} />
          <Route path="/help" element={<Help />} />
          <Route path="/Loading" element={<Loading />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/PendingRequests" element={<PendingRequests />} />
          <Route path="/profile/:userId" element={<OtherUserProfile />} />
          <Route path="/GuardifyLogo" element={<GuardifyLogo />} />
          <Route path="/Chat" element={<Chat user={user} />} /> {/* Pass user to Chat */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
