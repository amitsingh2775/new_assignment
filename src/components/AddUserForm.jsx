import React, { useState } from 'react';
import { addUser } from '../services/apiService';

function AddUserForm({ refreshUsers }) {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user.firstName || !user.email) {
      setError('First Name and Email are required!');
      return;
    }

    await addUser(user);
    refreshUsers();
    setUser({ firstName: '', lastName: '', email: '', department: '' });
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="input-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            value={user.department}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
