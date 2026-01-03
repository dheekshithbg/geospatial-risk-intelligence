// Frontend configuration
// Uses environment variables for easy deployment configuration

const getApiUrl = () => {
  // Use VITE_API_URL from environment, fallback to localhost for development
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

export const API_URL = getApiUrl();

export default {
  API_URL
};
