import api from "./api";
import { ENDPOINTS } from "./endpoints";

export const resumeService = {
  async upload(file, onProgress) {
    const formData = new FormData();
    formData.append("resume", file);
    const { data } = await api.post(ENDPOINTS.RESUME_UPLOAD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      },
    });
    return data;
  },
  async getResume() {
    const { data } = await api.get(ENDPOINTS.RESUME);
    return data;
  },
  async deleteResume() {
    const { data } = await api.delete(ENDPOINTS.RESUME);
    return data;
  },
};
