// Frontend: UserList.js
import React, { useEffect, useState } from 'react';
import { getUserInfoById } from '../../api/api';  // Import your API function

const UserList = ({ onlineUsers, user, onUserSelect, newMessages, unreadCounts }) => {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const details = {};
                for (let userId of onlineUsers) {
                    if (userId === user._id) continue; // Apna ID skip karo

                    const userInfo = await getUserInfoById(userId);

                    if (userInfo) {
                        details[userId] = userInfo; // { username, email, profileImage }
                    }
                }
                setUserDetails(details);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false);
            }
        };

        if (onlineUsers.length > 0 && user) {
            fetchUserDetails();
        }
    }, [onlineUsers, user]);

    return (
        <div className="w-1/4 bg-white border-r overflow-y-auto">
            <h2 className="text-xl font-bold p-4">Online Users</h2>
            <ul>
                {onlineUsers
                    .filter(userId => userId !== user._id) // Filter out the current user
                    .map((userId) => (
                        <li
                            key={userId}
                            className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onUserSelect({ _id: userId, ...userDetails[userId] })}
                        >
                            <div className="flex items-center">
                                <img
                                    src={userDetails[userId]?.profileImage || `https://ui-avatars.com/api/?name=${userDetails[userId]?.username || 'User'}`}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <span>
                                    {loading ? 'Loading...' : userDetails[userId]?.username || 'No Username'}
                                </span>
                            </div>

                            {/* New message red dot */}
                            {newMessages && newMessages[userId] && (
                                <span className="w-2 h-2 rounded-full bg-red-500 ml-2"></span>
                            )}

                            {/* Unread message count */}
                            {unreadCounts && unreadCounts[userId] > 0 && (
                                <span className="text-sm text-red-500">{unreadCounts[userId]}</span>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default UserList;
