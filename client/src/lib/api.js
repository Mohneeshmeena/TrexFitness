import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('apexfit_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data) => api.post('/api/users/register', data),
  login: (data) => api.post('/api/users/login', data),
  getMe: () => api.get('/api/users/me'),
  updateMe: (data) => api.put('/api/users/profile', data),
  updateStats: (data) => api.put('/api/users/stats', data),
};

// ─── Workouts ─────────────────────────────────────────────────────────────────
export const workoutsApi = {
  getAll: (params) => api.get('/api/workouts', { params }),
  getById: (id) => api.get(`/api/workouts/${id}`),
  create: (data) => api.post('/api/workouts', data),
  update: (id, data) => api.put(`/api/workouts/${id}`, data),
  delete: (id) => api.delete(`/api/workouts/${id}`),
};

// ─── Diets ────────────────────────────────────────────────────────────────────
export const dietsApi = {
  getAll: (params) => api.get('/api/diets', { params }),
  getById: (id) => api.get(`/api/diets/${id}`),
};

// ─── Custom Plans ─────────────────────────────────────────────────────────────
export const customPlansApi = {
  getAll: () => api.get('/api/custom-plans'),
  create: (data) => api.post('/api/custom-plans', data),
  update: (id, data) => api.put(`/api/custom-plans/${id}`, data),
  delete: (id) => api.delete(`/api/custom-plans/${id}`),
  toggleItem: (planId, itemId) => api.patch(`/api/custom-plans/${planId}/items/${itemId}/toggle`),
  addItem: (planId, item) => api.post(`/api/custom-plans/${planId}/items`, item),
  removeItem: (planId, itemId) => api.delete(`/api/custom-plans/${planId}/items/${itemId}`),
};

export default api;
