import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const atsService = {
  async getScore() {
    const { data } = await api.get(ENDPOINTS.ATS_SCORE);
    return data;
  },
};
