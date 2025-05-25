import axios from "axios";
import { useAuthStorage } from "store/authStorage";
import { SignInFormData, SignUpFormData } from "types/auth.types";

const API_URL = "http://192.168.0.248:3000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of public routes that don't need authorization
const publicRoutes = ["/users/signup", "/users/login"];

// Add a request interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    // Skip token authorization for public routes
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

export const authService = {
  signup: async (userData: Omit<SignUpFormData, "confirmPassword">) => {
    const response = await api.post("/users/signup", {
      user: userData,
    });
    return response.data;
  },

  login: async (userData: SignInFormData) => {
    const response = await api.post("/users/login", { user: userData });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
};
