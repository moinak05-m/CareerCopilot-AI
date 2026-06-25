import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/ui/PageLoader";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Resume = lazy(() => import("./pages/Resume"));
const CareerGoal = lazy(() => import("./pages/CareerGoal"));
const AtsScore = lazy(() => import("./pages/AtsScore"));
const SkillGap = lazy(() => import("./pages/SkillGap"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Interview = lazy(() => import("./pages/Interview"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
            background: "var(--toast-bg, #15212E)",
            color: "#fff",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#1F7A5C", secondary: "#fff" } },
          error: { iconTheme: { primary: "#D2522A", secondary: "#fff" } },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/career-goal" element={<CareerGoal />} />
            <Route path="/ats-score" element={<AtsScore />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/profile" element={<Profile />} />

          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
