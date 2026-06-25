import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const profileService = {
  async getProfile() {
    const { data } = await api.get(ENDPOINTS.PROFILE);
    return data;
  },
  async updateProfile(payload) {
    const { data } = await api.put(ENDPOINTS.UPDATE_PROFILE, payload);
    return data;
  },
};
