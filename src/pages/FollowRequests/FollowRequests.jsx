import React, { useEffect, useState } from 'react';
import { getFollowRequests, acceptFollowRequest, rejectFollowRequest } from '../../api/api';

const FollowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowRequests = async () => {
      try {
        const data = await getFollowRequests();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching follow requests', error);
        setLoading(false);
      }
    };

    fetchFollowRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await acceptFollowRequest(requestId);
      alert('Follow request accepted');
      setRequests(requests.filter((req) => req._id !== requestId)); // Remove accepted request from list
    } catch (error) {
      alert('Error accepting request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFollowRequest(requestId);
      alert('Follow request rejected');
      setRequests(requests.filter((req) => req._id !== requestId)); // Remove rejected request from list
    } catch (error) {
      alert('Error rejecting request');
    }
  };

  if (loading) return <div>Loading follow requests...</div>;

  return (
    <div>
      <h2>Follow Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <p>{request.sender.username} wants to follow you</p>
              <button onClick={() => handleAccept(request._id)}>Accept</button>
              <button onClick={() => handleReject(request._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowRequests;
