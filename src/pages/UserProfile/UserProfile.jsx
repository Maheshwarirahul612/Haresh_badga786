import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../components/useLocalStorage';
import { getUserInfoById, updateUserInfo } from '../../api/api';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage('user', null);
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const defaultProfileImage = 'https://i.imgur.com/QCNbOAo.png';

  useEffect(() => {
    if (!user) return navigate('/Auth');
    
    const fetchUserInfo = async (userId) => {
      try {
        const data = await getUserInfoById(userId);
        if (data && data.username) {
          setUserInfo(data);
          setNewUserInfo(data);
        } else {
          setError('User information is not available.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user information.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchUserInfo(user.id);
    else navigate('/Auth');
  }, [user, navigate]);

  const handleEditClick = () => setEditing(true);
  const handleCancelEdit = () => {
    setNewUserInfo(userInfo);
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateUserInfo(userInfo.id, newUserInfo);
      setUserInfo(newUserInfo);
      setEditing(false);
    } catch (err) {
      console.error('Error updating user info:', err);
      setError('Failed to update user information.');
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      return setError('Please select an image to upload.');
    }

    // Log the selected file to ensure it's correctly selected
    console.log('Selected File:', selectedFile);

    // Retrieve the token from localStorage directly
    const token = localStorage.getItem('token');
    if (!token) {
      return setError('No valid authentication token found.');
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    // Log the FormData object to make sure the file is being appended correctly
    console.log('Form Data being sent:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/auth/upload-avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo((prev) => ({ ...prev, profileImage: data.profileImage }));
        setSelectedFile(null);
        console.log('Avatar uploaded successfully:', data);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Failed to upload image');
    }
  };

  if (loading) return <div className="text-center text-white mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-6 py-12 transition-all duration-300">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl transition-all duration-300 text-white">
        {/* Greeting Header */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-300 to-indigo-500">
          Welcome, {userInfo?.username} 🌟
        </h1>

        {/* Profile Content */}
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Image */}
          <img
            src={userInfo.profileImage || defaultProfileImage}
            alt="User"
            className="rounded-full w-36 h-36 border-4 border-white shadow-lg hover:scale-110 transition duration-300 object-cover"
          />

          {/* Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="bg-white/20 p-2 rounded-xl"
            />
            <button
              onClick={handleImageUpload}
              className="bg-indigo-600 hover:bg-indigo-700 py-2 px-6 rounded-full flex items-center mx-auto shadow-md"
            >
              Upload Image
            </button>
          </div>

          {/* Edit Mode */}
          {editing ? (
            <div className="w-full space-y-5 text-white">
              <input
                type="text"
                value={newUserInfo?.username || ''}
                onChange={(e) => setNewUserInfo({ ...newUserInfo, username: e.target.value })}
                placeholder="Username"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
              />
              <input
                type="email"
                value={newUserInfo?.email || ''}
                onChange={(e) => setNewUserInfo({ ...newUserInfo, email: e.target.value })}
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
              />
              <input
                type="text"
                value={newUserInfo?.profileImage || ''}
                onChange={(e) => setNewUserInfo({ ...newUserInfo, profileImage: e.target.value })}
                placeholder="Profile Image URL"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
              />

              {/* Save / Cancel Buttons */}
              <div className="flex space-x-4 justify-center mt-4">
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 py-2 px-6 rounded-full flex items-center shadow-md">
                  <FaSave className="mr-2" />
                  Save
                </button>
                <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-600 py-2 px-6 rounded-full flex items-center shadow-md">
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full text-center space-y-2">
              <p className="text-lg"><strong>Username:</strong> {userInfo?.username}</p>
              <p className="text-lg"><strong>Email:</strong> {userInfo?.email}</p>
              <button onClick={handleEditClick} className="mt-6 bg-indigo-600 hover:bg-indigo-700 py-2 px-6 rounded-full flex items-center mx-auto shadow-md">
                <FaPen className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
