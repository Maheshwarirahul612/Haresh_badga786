import axios from 'axios';

// API URLs
const AUTH_API_URL = 'http://localhost:5000/api/auth';
const NOTIFY_API_URL = 'http://localhost:5000/api/notifications';
const SETTINGS_API_URL = 'http://localhost:5000/api/settings';
const USER_API_URL = 'http://localhost:5000/api/user'; // Get user info
const ADMIN_API_URL = 'http://localhost:5000/api/admin'; // Admin-specific API

// ============================ Auth Functions ============================

// ✅ Login user & return full user info with token
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
    return response.data; // Includes token + user object
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// ✅ Register user
export const registerUser = async (username, email, password) => {
  try {
    const res = await axios.post(`${AUTH_API_URL}/register`, { username, email, password });
    if (res.data.message) {
      return res.data.message;
    }
    return 'Registration successful!';
  } catch (error) {
    console.error('Error during registration:', error.response?.data);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// ========================== Notification Functions =======================

// ✅ Get all notifications
export const getNotifications = async () => {
  try {
    const response = await axios.get(NOTIFY_API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch notifications' };
  }
};

// ✅ Create a new notification
export const createNotification = async (notificationData) => {
  try {
    const response = await axios.post(NOTIFY_API_URL, notificationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create notification' };
  }
};

// ✅ Update a notification
export const updateNotification = async (id, updatedData) => {
  try {
    const response = await axios.put(`${NOTIFY_API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update notification' };
  }
};

// ✅ Delete a notification
export const deleteNotification = async (id) => {
  try {
    const response = await axios.delete(`${NOTIFY_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete notification' };
  }
};

// ========================== User Settings Functions ======================

// ✅ Get user settings
export const getUserSettings = async (userId) => {
  try {
    const response = await axios.get(`${SETTINGS_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch settings' };
  }
};

// ✅ Save or update user settings
export const saveUserSettings = async (userId, settingsData) => {
  try {
    const response = await axios.post(`${SETTINGS_API_URL}/${userId}`, settingsData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to save settings' };
  }
};

// ✅ Reset user settings to default
export const resetUserSettings = async (userId) => {
  try {
    const response = await axios.put(`${SETTINGS_API_URL}/${userId}/reset`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset settings' };
  }
};

// ✅ Delete user account
export const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.delete(`${SETTINGS_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete account' };
  }
};

// =========================== User Info Functions ========================

// ✅ Get user information (for profile, dashboard, etc.)
export const getUserInfoById = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${USER_API_URL}/info/${userId}`, {  // Corrected here!
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('API error (getUserInfoById):', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to fetch user info' };
  }
};

// ✅ Update user information
export const updateUserInfo = async (userId, updatedInfo) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${USER_API_URL}/${userId}`, updatedInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error.response?.data || { message: 'Failed to update user info' };
  }
};

// ========================== Admin Functions ===========================

// ✅ Get all users (Admin Control)
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    const response = await axios.get(`${ADMIN_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
    throw error;  // Or handle the error gracefully, like showing a message to the user
  }
};

// ✅ Delete user by ID (Admin Control)
export const adminDeleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.delete(`${ADMIN_API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Returns confirmation that user was deleted
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};

// ✅ Update user role by ID (Admin Control)
export const adminUpdateUserRole = async (userId, newRole) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.put(`${ADMIN_API_URL}/user/${userId}/role`, 
      { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data; // Returns confirmation of role change
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user role' };
  }
};

// ========================== Others user Functions ===========================

// Get user profile with followers and following
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/profile/${userId}`);
    return response.data;  // Return the user profile data
  } catch (error) {
    console.error('Error fetching profile', error);
    throw error;
  }
};

// Send a follow request to a user
export const sendFollowRequest = async (receiverId) => {
  try {
    const response = await axios.post(`/follow/send-follow-request/${receiverId}`);
    return response.data;  // Return the success message
  } catch (error) {
    console.error('Error sending follow request', error);
    throw error;
  }
};

// Accept a follow request
export const acceptFollowRequest = async (requestId) => {
  try {
    const response = await axios.post(`/follow/accept-follow-request/${requestId}`);
    return response.data;  // Return success message
  } catch (error) {
    console.error('Error accepting follow request', error);
    throw error;
  }
};

// Reject a follow request
export const rejectFollowRequest = async (requestId) => {
  try {
    const response = await axios.post(`/follow/reject-follow-request/${requestId}`);
    return response.data;  // Return success message
  } catch (error) {
    console.error('Error rejecting follow request', error);
    throw error;
  }
};

// Get all follow requests for the logged-in user
export const getFollowRequests = async () => {
  try {
    const response = await axios.get('/follow/requests');
    return response.data;  // Return list of follow requests
  } catch (error) {
    console.error('Error fetching follow requests', error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (receiverId) => {
  try {
    const response = await axios.post(`/follow/unfollow-user/${receiverId}`);
    return response.data;  // Return success message
  } catch (error) {
    console.error('Error unfollowing user', error);
    throw error;
  }
};  
