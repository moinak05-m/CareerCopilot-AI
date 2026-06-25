import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WelcomeBanner({ name, goalTitle }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = name ? name.split(" ")[0] : "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-700 via-forest-800 to-ink-900 px-6 py-7 sm:px-8 sm:py-9 text-paper-50"
    >
      <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-forest-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative">
        <span className="badge bg-white/10 text-amber-200 mb-3">
          <Sparkles className="h-3 w-3" />
          {greeting}
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          Welcome back, {firstName}.
        </h1>
        <p className="text-paper-200/80 text-sm mt-2 max-w-xl">
          {goalTitle
            ? <>You're working toward <span className="text-amber-200 font-medium">{goalTitle}</span>. Here's where things stand today.</>
            : "Set a career goal to unlock personalized scoring and a roadmap built around it."}
        </p>
      </div>
    </motion.div>
  );
}
