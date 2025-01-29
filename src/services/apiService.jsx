import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/amitsingh2775/new_assignment/users';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    return [];
  }
};

export const addUser = async (user) => {
  try {
    await axios.post(API_URL, user);
    alert('User added successfully');
  } catch (error) {
    console.error('Error adding user', error);
  }
};

export const updateUser = async (user) => {
  try {
    await axios.put(`${API_URL}/${user.id}`, user);
    alert('User updated successfully');
  } catch (error) {
    console.error('Error updating user', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    alert('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user', error);
  }
};
