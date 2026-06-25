import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper-200 dark:bg-ink-950 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 w-16 rounded-2xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center mb-6"
      >
        <Rocket className="h-8 w-8 text-forest-600 dark:text-forest-300" />
      </motion.div>
      <h1 className="font-display text-6xl font-bold text-ink-900 dark:text-paper-50">404</h1>
      <p className="text-ink-500 dark:text-paper-300 mt-3 max-w-sm">
        This page doesn't exist, or you've taken a wrong turn on the way to your next role.
      </p>
      <Link to="/dashboard" className="btn-primary mt-7">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
    </div>
  );
}
