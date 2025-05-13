import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pending follow requests when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/follow/requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token for authorization
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch follow requests');
        }

        const data = await response.json();
        // Assuming the API returns an array of requests
        setRequests(data);
      } catch (error) {
        console.error('Error fetching follow requests:', error);
        setError('Error fetching follow requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/follow/accept/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token in header
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Follow request accepted');
        // Update the state by filtering out the accepted request
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
      } else {
        alert(data.message || 'Error accepting follow request');
      }
    } catch (error) {
      console.error('Error accepting follow request:', error);
      alert('Error accepting follow request');
    }
  };

  if (loading) {
    return <div>Loading follow requests...</div>;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Pending Follow Requests</h1>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center text-gray-500">No pending follow requests</div>
        ) : (
          requests.map((request) => (
            <motion.div
              key={request._id}
              className="flex justify-between items-center p-4 bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center">
                <img
                  src={request.sender.profileImage || 'https://via.placeholder.com/50'}
                  alt={`${request.sender.username}'s profile`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <span className="text-xl font-semibold">{request.sender.username}</span>
              </div>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => handleAcceptRequest(request._id)}
              >
                Accept
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PendingRequests;
