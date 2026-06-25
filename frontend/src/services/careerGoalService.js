import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const careerGoalService = {
  async getGoal() {
    const { data } = await api.get(ENDPOINTS.CAREER_GOAL);
    return data;
  },
  async saveGoal(payload) {
    const { data } = await api.post(ENDPOINTS.CAREER_GOAL, payload);
    return data;
  },
};
