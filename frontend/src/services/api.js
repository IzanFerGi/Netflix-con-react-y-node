import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  // timeout: 5000,
});

// Interceptor opcional para añadir token desde localStorage si no usas AuthContext para setearlo
api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // nothing
  }
  return config;
});

export default api;
