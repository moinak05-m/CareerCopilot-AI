import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const authService = {
  async register({ name, email, password }) {
    const { data } = await api.post(ENDPOINTS.REGISTER, { name, email, password });
    return data;
  },
  async login({ email, password }) {
    const { data } = await api.post(ENDPOINTS.LOGIN, { email, password });
    return data;
  },
  async getMe() {
    const { data } = await api.get(ENDPOINTS.ME);
    return data;
  },
};
