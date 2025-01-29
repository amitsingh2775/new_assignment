import React from 'react';
import { deleteUser } from '../services/apiService';

function UserItem({ user, refreshUsers, onEdit }) {
  const handleDelete = async () => {
    await deleteUser(user.id);
    refreshUsers();
  };

  return (
    <div className="user-item">
      <span>{user.firstName} {user.lastName}</span>
      <span>{user.email}</span>
      <span>{user.department}</span>
      <button className="edit" onClick={() => onEdit(user)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default UserItem;
