import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaExclamationCircle, FaLock, FaTimes, FaSearch } from 'react-icons/fa';
import {
  getNotifications,
  updateNotification,
  deleteNotification as apiDeleteNotification,
} from '../../api/api'; // Ensure the deleteNotification API function is properly imported

const translations = {
  en: {
    title: 'Notifications',
    languageSwitch: 'Switch Language',
    filter: 'Filter Notifications',
    clearAll: 'Clear All Notifications',
    markAllRead: 'Mark All as Read',
    searchPlaceholder: 'Search Notifications...',
  },
  hi: {
    title: 'सूचनाएँ',
    languageSwitch: 'भाषा बदलें',
    filter: 'सूचनाओं को छानें',
    clearAll: 'सभी सूचनाएँ हटाएं',
    markAllRead: 'सभी को पढ़ें',
    searchPlaceholder: 'सूचनाएँ खोजें...',
  },
};

const Notifications = () => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [notifications, setNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem('notifFilter') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };
    fetchData();
  }, []);

  const markAsRead = async (id) => {
    try {
      await updateNotification(id, { read: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await updateNotification(id, { read: !currentStatus });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: !currentStatus } : n))
      );
    } catch (err) {
      console.error('Failed to toggle read status:', err);
    }
  };

  // Updated deleteNotification function with logging and state update
  const deleteNotification = async (id) => {
    try {
      console.log(`Attempting to delete notification with ID: ${id}`);
      // Call the API to delete the notification
      const response = await apiDeleteNotification(id);
      console.log("Delete response:", response);
      
      // Update the state to remove the notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
      console.log(`Notification with ID ${id} deleted successfully`);
    } catch (err) {
      console.error('Failed to delete notification:', err.message);
    }
  };

  const clearAllNotifications = async () => {
    try {
      for (const n of notifications) {
        await deleteNotification(n._id); // Delete each notification
      }
      setNotifications([]); // Clear all notifications after deletion
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((n) => updateNotification(n._id, { read: true }))
      );
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const filterNotifications = () => {
    switch (selectedFilter) {
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'read':
        return notifications.filter((n) => n.read);
      default:
        return notifications;
    }
  };

  const searchedNotifications = filterNotifications().filter((notification) =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('notifFilter', selectedFilter);
  }, [selectedFilter]);

  const renderIcon = (type) => {
    const iconMap = {
      info: <FaCheckCircle className="text-blue-400 mr-2" />,
      warning: <FaExclamationCircle className="text-yellow-400 mr-2" />,
      success: <FaLock className="text-green-400 mr-2" />,
      error: <FaTimes className="text-red-400 mr-2" />,
    };
    return iconMap[type] || <FaCheckCircle className="text-gray-400 mr-2" />;
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-500">
          {translations[language].title} ⚙️
        </h1>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder={translations[language].searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 w-full max-w-md"
            />
          </div>
          <div>
            <label className="text-lg">{translations[language].filter}: </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-xl overflow-hidden shadow-md text-sm sm:text-base">
            <thead className="bg-white/10 text-cyan-300">
              <tr>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {searchedNotifications.map((notification) => (
                <tr key={notification._id} className="hover:bg-white/5 transition duration-200">
                  <td className="px-4 py-3">{notification.message}</td>
                  <td className="px-4 py-3">
                    {new Date(notification.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => toggleReadStatus(notification._id, notification.read)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full text-white transition duration-200"
                    >
                      {notification.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-x-4">
          <button
            onClick={markAllAsRead}
            className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-full text-white font-semibold transition-all"
          >
            {translations[language].markAllRead}
          </button>

          <button
            onClick={clearAllNotifications}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white font-semibold transition-all"
          >
            <FaTimes className="inline mr-2" />
            {translations[language].clearAll}
          </button>
        </div>

        <div className="mt-6">
          <label className="text-lg">{translations[language].languageSwitch}: </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white font-semibold transition-all"
          >
            ⬅ Back to Home
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-full text-white font-semibold transition-all"
          >
            📊 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
