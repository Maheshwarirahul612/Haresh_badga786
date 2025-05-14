import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://guardify-backend-6.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowRequest = async (e, userId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`https://guardify-backend-6.onrender.com/api/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      alert(response.ok ? 'Follow request sent!' : data.message);
    } catch (error) {
      console.error('Error sending follow request:', error);
      alert('Error sending follow request');
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold animate-pulse">Finding awesome people...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        🌟 Connect With Amazing People
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="relative group bg-white p-6 rounded-3xl shadow-xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => handleUserClick(user._id)}
            onMouseEnter={() => setHoveredUserId(user._id)}
            onMouseLeave={() => setHoveredUserId(null)}
          >
            {/* Background Blur */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-pink-100 opacity-0 group-hover:opacity-100 transition-all blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredUserId === user._id ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Profile Info */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Online Status */}
              <div className="relative">
                <img
                  src={user.profileImage || 'https://via.placeholder.com/80'}
                  alt={`${user.username}'s profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:border-pink-400"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
              </div>

              {/* Username */}
              <h2 className="mt-4 text-xl font-bold text-gray-800">{user.username}</h2>
              <p className="text-gray-400 text-sm">@{user.username.toLowerCase()}</p>

              {/* Follow Button */}
              {hoveredUserId === user._id && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
                  onClick={(e) => handleFollowRequest(e, user._id)}
                >
                  <FaUserPlus /> Follow
                </motion.button>
              )}
            </div>

            {/* Popover Preview */}
            {hoveredUserId === user._id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 right-0 p-4 bg-white rounded-3xl shadow-2xl text-center z-20"
              >
                <p className="text-sm text-gray-600">
                  📄 Short bio: Passionate developer | Dreamer 🚀
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
