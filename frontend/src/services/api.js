import axios from "axios";

/**
 * Single Axios instance for the whole app.
 * Base URL is read from the VITE_API_BASE_URL env var so this project can be
 * pointed at your existing Express backend without touching any code.
 * See .env.example.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ascent_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralised 401 handling -> log the user out and bounce to /login
let onUnauthorized = () => {};
export const registerUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
