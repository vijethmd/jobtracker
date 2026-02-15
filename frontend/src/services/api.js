import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors globally (optional)
    if (error.response?.status === 401) {
      // Could redirect to login or clear auth state
      console.log('Unauthorized - please log in');
    }
    return Promise.reject(error);
  }
);

export default api;
