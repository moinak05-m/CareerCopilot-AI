import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const skillGapService = {
  async getSkillGap() {
    const { data } = await api.get(ENDPOINTS.SKILL_GAP);
    return data;
  },
};
