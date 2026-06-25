import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const toneText = {
  forest: "text-forest-600 dark:text-forest-300",
  amber: "text-amber-600 dark:text-amber-300",
  coral: "text-coral-500",
  ink: "text-ink-700 dark:text-paper-100",
};

const toneBg = {
  forest: "bg-forest-50 dark:bg-forest-900/30",
  amber: "bg-amber-50 dark:bg-amber-900/20",
  coral: "bg-coral-400/10",
  ink: "bg-ink-100 dark:bg-ink-700",
};

export default function StatCard({ icon: Icon, label, value, sub, tone = "forest", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="card p-5 flex items-start justify-between gap-4"
    >
      <div className="min-w-0">
        <p className="label-text">{label}</p>
        <p className="font-display text-2xl font-bold mt-2 text-ink-900 dark:text-paper-50 truncate">{value}</p>
        {sub && <p className="text-xs text-ink-500 dark:text-paper-300 mt-1">{sub}</p>}
      </div>
      {Icon && (
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", toneBg[tone])}>
          <Icon className={cn("h-5 w-5", toneText[tone])} />
        </div>
      )}
    </motion.div>
  );
}
