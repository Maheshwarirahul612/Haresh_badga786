import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import UserList from '../UserList/UserList';
import MessageBubble from '../MessageInput/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Server address

const Chat = ({ user }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [newMessages, setNewMessages] = useState({}); // new state for notifications
  const [unreadCounts, setUnreadCounts] = useState({}); // Track unread message counts
  const [lastSeen, setLastSeen] = useState(null); // Track last seen time for selected user

  useEffect(() => {
    if (!user) return;

    console.log('Current User in Chat:', user);

    socket.emit('user-online', user.id || user._id);

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('update-online-users', (users) => {
      console.log("Updated list of online users:", users);
      setOnlineUsers(users);
    });

    socket.on('receive-message', ({ senderId, content }) => {
      console.log('Message received from:', senderId, 'content:', content);

      if (selectedUser && senderId === selectedUser._id) {
        setMessages(prev => [...prev, { sender: senderId, content }]);
      } else {
        setNewMessages(prev => ({
          ...prev,
          [senderId]: true
        }));

        // Increment unread message count for the sender
        setUnreadCounts(prev => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1
        }));
      }
    });

    socket.on('typing', ({ senderId }) => {
      setTypingUser(senderId);
      setTimeout(() => setTypingUser(null), 3000);
    });

    socket.on('message-seen-ack', ({ messageId, receiverId }) => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    });

    return () => {
      socket.off('connect');
      socket.off('update-online-users');
      socket.off('receive-message');
      socket.off('typing');
      socket.off('message-seen-ack');
    };
  }, [user, selectedUser]);

  const fetchMessages = useCallback(async (receiverId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.get(`/api/chat/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setMessages(res.data.data);
        // Reset unread counts when messages are fetched
        setUnreadCounts(prev => {
          const updated = { ...prev };
          delete updated[receiverId];
          return updated;
        });
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  const fetchLastSeen = useCallback(async (receiverId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.get(`/api/chat/last-seen/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const lastSeenDate = new Date(res.data.data.lastSeen);
        // Check if the date is valid
        if (!isNaN(lastSeenDate.getTime())) {
          setLastSeen(lastSeenDate);
        } else {
          console.error("Invalid last seen date:", res.data.data.lastSeen);
        }
      } else {
        console.error("Failed to fetch last seen data");
      }
    } catch (error) {
      console.error('Error fetching last seen:', error);
    }
  }, []);

  const handleUserSelect = useCallback((userData) => {
    if (userData && userData._id) {
      setSelectedUser(userData);
      fetchMessages(userData._id);
      fetchLastSeen(userData._id);

      setNewMessages((prev) => {
        const updated = { ...prev };
        delete updated[userData._id];
        return updated;
      });

      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => {
          if (msg.receiver === userData._id && !msg.isRead) {
            socket.emit('message-seen', { messageId: msg._id, receiverId: userData._id });
            return { ...msg, isRead: true };
          }
          return msg;
        });
        return updatedMessages;
      });
    }
  }, [fetchMessages, fetchLastSeen]);

  const sendMessage = useCallback(async (content) => {
    if (!selectedUser) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found!");
      return;
    }

    try {
      const res = await axios.post('/api/chat/send', {
        receiverId: selectedUser._id,
        content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        socket.emit('send-message', {
          senderId: user._id || user.id,
          receiverId: selectedUser._id,
          content
        });

        setMessages(prev => [...prev, { sender: user._id || user.id, receiver: selectedUser._id, content }]);
      } else {
        console.error("Message sending failed");
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [selectedUser, user]);

  const handleTyping = useCallback(() => {
    if (selectedUser) {
      socket.emit('typing', {
        senderId: user._id || user.id,
        receiverId: selectedUser._id
      });
    }
  }, [selectedUser, user]);

  const handleMessageSeen = useCallback((messageId) => {
    if (selectedUser) {
      socket.emit('message-seen', { messageId, receiverId: selectedUser._id });
    }
  }, [selectedUser]);

  return (
    <div className="flex h-screen">
      <UserList
        onlineUsers={onlineUsers}
        user={user}
        onUserSelect={handleUserSelect}
        newMessages={newMessages}
      />

      <div className="flex flex-col flex-1 bg-gray-100 p-4">
        {selectedUser ? (
          <>
            <div className="flex-1 overflow-y-auto mb-2 hide-scrollbar">
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    message={msg}
                    self={msg.sender === (user._id || user.id)}
                    onMessageSeen={handleMessageSeen}
                  />
                ))
              ) : (
                <div>No messages found</div>
              )}

              {typingUser === selectedUser._id && (
                <div className="text-sm text-gray-500">Typing...</div>
              )}
            </div>

            {lastSeen && (
              <div className="text-sm text-gray-500">
                Last seen: {lastSeen.toLocaleString() || 'Invalid Date'}
              </div>
            )}

            <MessageInput onSend={sendMessage} onTyping={handleTyping} />
          </>
        ) : (
          <div className="text-center text-gray-400 m-auto">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
