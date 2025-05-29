import axios from "axios";
import { useAuthStorage } from "store/authStorage";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of public routes with no authorisation
const publicRoutes = ["/users/signup", "/users/login"];

// Request interceptor for adding the token to all requests
api.interceptors.request.use(
  (config) => {
    // Skip token authorisation for public routes
    if (publicRoutes.some((route) => config.url?.includes(route))) {
      return config;
    }

    const token = useAuthStorage.getState().token;
    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
