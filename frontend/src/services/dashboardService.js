import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const dashboardService = {
  async getSummary() {
    const { data } = await api.get(ENDPOINTS.DASHBOARD);
    return data;
  },
};
