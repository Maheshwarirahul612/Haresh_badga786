import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../components/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCog, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { getUserInfoById, getNotifications } from '../../api/api';

// Custom Hook for fetching user info
const useFetchUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoById(userId);
        setUserInfo(data);
      } catch (error) {
        setError('Failed to fetch user information');
      }
    };

    if (userId) fetchUserInfo();
  }, [userId]);

  return { userInfo, error };
};

// Home Component
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser, removeUser] = useLocalStorage('user', null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const handleLogout = () => {
    removeUser();
    localStorage.removeItem('token');
    navigate('/Auth');
  };

  const handleNotificationClick = () => navigate('/notifications');
  const handleSettingsClick = () => navigate('/settings');
  const handleInfoClick = () => navigate('/info');
  const handleHelpClick = () => navigate('/help');

  // Fetching user info using custom hook
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/Auth');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser?.id) {
        setUser(parsedUser);
      } else {
        navigate('/Auth');
      }
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      navigate('/Auth');
    }
  }, [navigate]);

  // Fetching notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        const unread = data.filter((n) => !n.read);
        setUnreadCount(unread.length);
      } catch (err) {
        console.error('Failed to fetch notifications:', err.message);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Background effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { userInfo, error } = useFetchUserInfo(user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-600 text-white flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Top Right Icons */}
      <div className="absolute top-4 right-6 flex space-x-6 z-20">
        {/* Bell with badge */}
        <div className="relative cursor-pointer text-white hover:text-indigo-300" onClick={handleNotificationClick}>
          <FaBell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="cursor-pointer text-white hover:text-indigo-300" onClick={handleSettingsClick}>
          <FaCog size={22} />
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-300" onClick={handleInfoClick}>
          <FaInfoCircle size={22} />
        </div>
        <div className="cursor-pointer text-white hover:text-indigo-300" onClick={handleHelpClick}>
          <FaQuestionCircle size={22} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mb-12 z-10 relative">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 leading-tight tracking-wide text-shadow-lg animate-fadeIn">
          {userInfo ? `Welcome back, ${userInfo.username}!` : 'Welcome to Guardify 🔐'}
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mt-4 leading-relaxed animate-typewriter">
          <span className="font-semibold text-indigo-200">
            Apki digital zindagi ki suraksha.
          </span>{' '}
          Bina rukavat. Bina dar ke. <br />
          Trusted by thousands to keep what matters most safe.
        </p>

        {userInfo && (
          <div className="mt-6 flex justify-center items-center">
            <img
              src={userInfo.profileImage || 'https://i.imgur.com/QCNbOAo.png'}
              alt="User Profile"
              className="rounded-full w-28 h-28 border-4 border-white shadow-2xl transition-transform transform hover:scale-110"
            />
          </div>
        )}

        {userInfo && (
          <p className="mt-4 text-lg text-gray-200">
            We're thrilled to have you back, <strong>{userInfo.username}!</strong> 😊
          </p>
        )}

        {userInfo && (
          <button
            onClick={handleLogout}
            className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold transition-all duration-300 shadow-xl transform hover:scale-105"
            aria-label="Logout"
          >
            Logout
          </button>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </section>

      {/* Feature Section */}
      <div className="w-full max-w-5xl bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-10 shadow-2xl flex flex-col sm:flex-row justify-between gap-8 text-white relative z-10 transition-transform transform hover:scale-105">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Why Guardify?</h2>
          <ul className="space-y-3 text-white/90">
            <li>✅ Real-time security alerts</li>
            <li>✅ End-to-end encryption for your data</li>
            <li>✅ Seamless login experience</li>
            <li>✅ Multi-factor authentication for added security</li>
            <li>✅ Instant device activity tracking</li>
            <li>✅ AI-driven malware detection and prevention</li>
            <li>✅ Secure cloud storage for your important data</li>
            <li>✅ 24/7 monitoring and automatic security updates</li>
            <li>✅ Privacy-focused data handling with no third-party access</li>
          </ul>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-6">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl transform hover:scale-105">
            Get Started
          </button>
          <button className="w-full bg-white/20 hover:bg-white/30 py-3 px-6 rounded-full text-lg font-medium text-white backdrop-blur-lg border border-white/30 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute inset-0 z-0 animate-background"></div>

      <footer className="mt-12 text-sm text-gray-300 text-center relative z-10">
        © 2025 Guardify. Made with 💙 to protect your digital peace.
      </footer>
    </div>
  );
};

export default Home;
