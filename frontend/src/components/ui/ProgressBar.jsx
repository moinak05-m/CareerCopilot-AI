import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const toneBar = {
  forest: "from-forest-500 to-forest-600",
  amber: "from-amber-400 to-amber-500",
  coral: "from-coral-400 to-coral-500",
};

export default function ProgressBar({ value = 0, tone = "forest", className, height = "h-2" }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full rounded-full bg-ink-100 dark:bg-ink-700 overflow-hidden", height, className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={cn("h-full rounded-full bg-gradient-to-r", toneBar[tone])}
      />
    </div>
  );
}
