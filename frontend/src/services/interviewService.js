import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const interviewService = {
  async getQuestions(params = {}) {
    const { data } = await api.get(ENDPOINTS.INTERVIEW_QUESTIONS, { params });
    return data;
  },
};
