import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

const getUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`https://guardify-backend-6.onrender.com/api/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user profile');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    toast.error('Failed to load profile, please try again.');
    throw error;
  }
};

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (userId) => {
    try {
      const data = await getUserProfile(userId);
      setUserProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Skeleton height={250} />
        <div className="mt-6 space-y-4">
          <Skeleton height={30} width="60%" />
          <Skeleton height={20} width="40%" />
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <div className="text-center text-red-500 font-bold">Error: User profile not found</div>;
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-blue-200 shadow-2xl rounded-3xl border border-blue-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-10">
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="w-36 h-36 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
          src={userProfile.avatar || "https://via.placeholder.com/150"}
          alt={`${userProfile.username}'s avatar`}
        />
        <h1 className="text-4xl font-bold text-indigo-700 mt-4">{userProfile.username}</h1>
        <p className="text-lg text-gray-600">{userProfile.email}</p>
      </div>

      <motion.div 
        className="profile-details mb-10 p-6 bg-white rounded-xl shadow-md"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Bio</h2>
        <p className="text-lg text-gray-700">{userProfile.bio || 'No bio available'}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Followers */}
        <motion.div 
          className="followers-container p-6 bg-white rounded-xl shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Followers</h2>
          <ul className="space-y-4">
            {Array.isArray(userProfile.followers) && userProfile.followers.length > 0 ? (
              userProfile.followers.map((follower) => (
                <li key={follower._id} className="flex items-center justify-between hover:bg-indigo-50 p-3 rounded-md transition duration-300">
                  <span className="text-gray-800">{follower.username}</span>
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
                    onClick={() => handleFollow(follower._id)}
                  >
                    Follow
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No followers yet</li>
            )}
          </ul>
        </motion.div>

        {/* Following */}
        <motion.div 
          className="following-container p-6 bg-white rounded-xl shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Following</h2>
          <ul className="space-y-4">
            {Array.isArray(userProfile.following) && userProfile.following.length > 0 ? (
              userProfile.following.map((following) => (
                <li key={following._id} className="flex items-center justify-between hover:bg-indigo-50 p-3 rounded-md transition duration-300">
                  <span className="text-gray-800">{following.username}</span>
                  <button
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                    onClick={() => handleUnfollow(following._id)}
                  >
                    Unfollow
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Not following anyone</li>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Add/Edit Profile Modal or Button */}
      <motion.div 
        className="mt-8 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => handleEditProfile()}
        >
          Edit Profile
        </button>
      </motion.div>
    </motion.div>
  );

  // Helper functions for follow/unfollow
  function handleFollow(followerId) {
    toast.success(`You followed ${followerId}`);
    // Here you would also make an API call to actually follow the user
  }

  function handleUnfollow(followingId) {
    toast.success(`You unfollowed ${followingId}`);
    // Here you would also make an API call to actually unfollow the user
  }

  function handleEditProfile() {
    toast.info('Edit profile functionality is under construction.');
    // Here you would ideally show a modal or redirect to an edit profile page
  }
};

export default OtherUserProfile;
