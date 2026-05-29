import axios from 'axios';
import constants from '../constant';

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

// Fetch all users
export const fetchUsers = () => API.get('/');

// Create a user
export const createUser = (user) => API.post('/', user);

// Update a user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete a user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login a user
export const loginUser = (credentials) => API.post('/login', credentials);