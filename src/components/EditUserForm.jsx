import React, { useState } from 'react';
import { updateUser } from '../services/apiService';

function EditUserForm({ user, refreshUsers, onCancel }) {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(editedUser);
    refreshUsers();
    onCancel();
  };

  return (
    <div className="edit-user-form-container">
      <button className="back-button" onClick={onCancel}>
        &larr; Back to List
      </button>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="input-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={editedUser.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={editedUser.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={editedUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Department</label>
          <input
            name="department"
            value={editedUser.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
         
          <button type="submit" className="submit-button">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;