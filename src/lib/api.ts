import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  signup: async (userData: { email: string; password: string; companyName: string }) => {
    const { data } = await api.post('/auth/signup', userData);
    return data;
  },
  resetPassword: async (email: string) => {
    const { data } = await api.post('/auth/reset-password', { email });
    return data;
  },
  confirmResetPassword: async (token: string, newPassword: string) => {
    const { data } = await api.post('/auth/confirm-reset-password', { token, newPassword });
    return data;
  },
};

export default api;