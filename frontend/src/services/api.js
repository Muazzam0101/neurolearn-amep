import axios from 'axios';

// 1️⃣ Define API base URL and ensure /api prefix
const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_BASE_URL = BACKEND_URL.endsWith('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;

// 3️⃣ Console log to confirm resolved value at runtime
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('- Resolved API_BASE_URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2️⃣ & 3️⃣ API calls with /api prefix
export const authAPI = {
  login: (credentials) => {
    console.log('Making login request to:', `${API_BASE_URL}/login`);
    return api.post('/login', credentials);
  },
  signup: (userData) => {
    console.log('Making signup request to:', `${API_BASE_URL}/signup`);
    return api.post('/signup', userData);
  },
};

// Password Reset API functions
export const requestPasswordReset = async (email) => {
  console.log('Making password reset request to:', `${API_BASE_URL}/forgot-password`);
  const response = await api.post('/forgot-password', { email });
  return response.data;
};

export const validateResetToken = async (token) => {
  console.log('Validating reset token:', `${API_BASE_URL}/validate-reset-token`);
  const response = await api.post('/validate-reset-token', { token });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  console.log('Resetting password:', `${API_BASE_URL}/reset-password`);
  const response = await api.post('/reset-password', { token, newPassword });
  return response.data;
};

export default api;