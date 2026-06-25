import {
  LayoutGrid,
  FileStack,
  Crosshair,
  ScanSearch,
  PieChart,
  Map,
  MessagesSquare,
  UserRound,
  SlidersHorizontal,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/resume", label: "Resume", icon: FileStack },
  { to: "/career-goal", label: "Career Goal", icon: Crosshair },
  { to: "/ats-score", label: "ATS Score", icon: ScanSearch },
  { to: "/skill-gap", label: "Skill Gap", icon: PieChart },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/interview", label: "Interview Prep", icon: MessagesSquare },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: SlidersHorizontal },
];
