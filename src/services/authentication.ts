import { SignInFormData, SignUpFormData } from "types/auth.types";

import api from "./api";

export const authenticationService = {
  login: async (userData: SignInFormData) => {
    const response = await api.post("/users/login", { user: userData });
    return response.data;
  },

  signup: async (userData: Omit<SignUpFormData, "confirmPassword">) => {
    const response = await api.post("/users/signup", {
      user: userData,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
};
