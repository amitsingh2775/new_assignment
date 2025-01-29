import React, { useEffect, useState, useCallback } from 'react';
import UserItem from './UserItem';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { fetchUsers } from '../services/apiService';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUsersFromAPI = useCallback(async (reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = reset ? 1 : Math.floor(users.length / 10) + 1;
      const fetchedUsers = await fetchUsers(nextPage);

      if (fetchedUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers(prevUsers => {
          const uniqueUsers = [...new Map([...prevUsers, ...fetchedUsers].map(user => [user.id, user])).values()];
          return reset ? fetchedUsers : uniqueUsers;
        });
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, users]);

  useEffect(() => {
    fetchUsersFromAPI();
  }, [fetchUsersFromAPI]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      fetchUsersFromAPI();
    }
  }, [fetchUsersFromAPI]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const refreshUsers = () => {
    setHasMore(true);
    setUsers([]);
    fetchUsersFromAPI(true);
  };

  return (
    <div className="user-list-container">
      <div className="fixed-header">
        <h1>User Management Dashboard</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={`toggle-form-btn ${showAddForm ? 'cancel' : ''}`}
        >
          {showAddForm ? 'Cancel' : 'Add User'}
        </button>
        {showAddForm && (
          <div className="form-container">
            <AddUserForm refreshUsers={refreshUsers} onSuccess={() => setShowAddForm(false)} />
          </div>
        )}
      </div>
      <div className="scrollable-content">
        {editingUser ? (
          <EditUserForm 
            user={editingUser} 
            refreshUsers={refreshUsers}
            onCancel={() => setEditingUser(null)}
          />
        ) : (
          <div className="user-items">
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                refreshUsers={refreshUsers}
                onEdit={setEditingUser}
              />
            ))}
            {loading && <div className="loading">Loading more users...</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
