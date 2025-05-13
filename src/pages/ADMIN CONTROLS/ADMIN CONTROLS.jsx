import React, { useState, useEffect } from 'react';
import { getAllUsers, adminDeleteUser, adminUpdateUserRole } from '../../api/api'; // Your API functions

const AdminControls = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ ADDED: state to manage role selections and update status
  const [roleMap, setRoleMap] = useState({});
  const [updatingRole, setUpdatingRole] = useState(null);

  useEffect(() => {
    // Fetch all users when component mounts
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);

        // ✅ ADDED: initialize roleMap with user roles
        const initialRoles = {};
        usersData.forEach(user => {
          initialRoles[user._id] = user.role;
        });
        setRoleMap(initialRoles);

        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await adminDeleteUser(userId);
      setUsers(users.filter(user => user._id !== userId)); // Remove user from UI
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Handle role update
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await adminUpdateUserRole(userId, newRole);
      setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user)); // Update role in UI
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  // ✅ ADDED: Handles role change button
  const handleRoleChange = async (userId, newRole) => {
    if (!newRole) return;

    setUpdatingRole(userId);
    try {
      await handleUpdateUserRole(userId, newRole);
      setRoleMap(prev => ({ ...prev, [userId]: '' })); // Optional: reset dropdown
    } catch (err) {
      setError('Failed to update user role');
    } finally {
      setUpdatingRole(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-500">
          Admin Controls ⚙️
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-white">All Users</h2>

        {loading ? (
          <p className="text-center text-lg text-gray-200">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-xl overflow-hidden shadow-md text-sm sm:text-base">
              <thead className="bg-white/10 text-cyan-300">
                <tr>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition duration-200">
                    <td className="px-4 py-3">{user.username}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={roleMap[user._id] || ''}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          setRoleMap((prev) => ({ ...prev, [user._id]: newRole }));
                        }}
                        className="bg-white/10 text-white px-3 py-1 rounded-lg border border-white/20 focus:outline-none"
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleRoleChange(user._id, roleMap[user._id])}
                        disabled={updatingRole === user._id || !roleMap[user._id]}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full text-white transition duration-200"
                      >
                        {updatingRole === user._id ? 'Updating...' : 'Update'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
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
        )}
      </div>
    </div>
  );
};

export default AdminControls;
