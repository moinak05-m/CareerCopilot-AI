/**
 * Central map of backend routes.
 *
 * These paths follow common REST conventions for the feature set described
 * in the project brief (auth, profile, resume, career goal, ATS, skill gap,
 * interview questions, roadmap, dashboard). Your existing Express backend
 * was not changed to build this UI — if any of your real route paths differ,
 * update them here ONLY. Nothing else in the app needs to change.
 */
export const ENDPOINTS = {
  // Auth
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  ME: "/auth/profile",

  // Profile
  PROFILE: "/auth/profile",
  UPDATE_PROFILE: "/auth/profile",

  // Resume
  RESUME_UPLOAD: "/resume/upload",
  RESUME: "/resume",

  // Career goal
  CAREER_GOAL: "/career/goal",

  // ATS
  ATS_SCORE: "/ats-score",

  // Skill gap
  SKILL_GAP: "/skill-gap",

  // Interview
  INTERVIEW_QUESTIONS: "/interview",

  // Roadmap
  ROADMAP: "/roadmap/my-roadmap",
  ROADMAP_GENERATE: "/roadmap/generate",
  ROADMAP_ITEM: (id) => `/roadmap/${id}`,

  // Dashboard
  DASHBOARD: "/dashboard",
};
