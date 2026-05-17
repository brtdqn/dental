import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const storageData = localStorage.getItem('auth-storage');
    if (storageData) {
      try {
        const { state } = JSON.parse(storageData);
        if (state && state.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (e) {
        console.error('Failed to parse auth storage', e);
      }
    }
  }
  return config;
});

export default api;
