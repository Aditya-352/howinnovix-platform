// Central API configuration for deployment
// In development: VITE_API_URL is empty or http://localhost:5000
// In production: VITE_API_URL points to your deployed backend (e.g. https://innovex-backend.onrender.com)
const API_URL = import.meta.env.VITE_API_URL || '';

export default API_URL;
