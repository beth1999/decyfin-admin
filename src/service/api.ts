import axios from 'axios';

export const AUTH_KEY = 'decyfin_admin_token';

export const Api = axios.create({
  baseURL: process.env.REACT_APP_BACKENDURL || 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(AUTH_KEY) || ''
  }
});
