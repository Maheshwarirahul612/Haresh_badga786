import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
