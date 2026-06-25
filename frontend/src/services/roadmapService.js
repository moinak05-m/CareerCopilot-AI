import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const roadmapService = {
  async getRoadmap() {
    const { data } = await api.get(ENDPOINTS.ROADMAP);
    return data;
  },
  async markCompleted(id, completed) {
    const { data } = await api.patch(ENDPOINTS.ROADMAP_ITEM(id), { completed });
    return data;
  },
};
