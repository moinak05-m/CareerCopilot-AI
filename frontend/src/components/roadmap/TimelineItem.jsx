import { motion } from "framer-motion";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import { cn } from "../../utils/cn";

export default function TimelineItem({ milestone, isLast, onToggle, toggling }) {
  const completed = !!milestone.completed;
  return (
    <div className="relative pl-12 pb-8">
      {!isLast && (
        <span className="absolute left-[15px] top-8 bottom-0 w-px bg-ink-100 dark:bg-ink-700" />
      )}
      <button
        onClick={() => onToggle(milestone)}
        disabled={toggling}
        className={cn(
          "absolute left-0 top-0 h-8 w-8 rounded-full grid place-items-center border-2 transition-colors",
          completed
            ? "bg-forest-600 border-forest-600 text-white"
            : "bg-white dark:bg-ink-800 border-ink-200 dark:border-ink-600 text-ink-300 hover:border-forest-400"
        )}
        title={completed ? "Mark as not completed" : "Mark as completed"}
      >
        {completed ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Circle className="h-4 w-4" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("card", completed && "opacity-70")}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
          <span className="badge bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300">
            {milestone.month || milestone.period || `Month ${milestone.order || 1}`}
          </span>
          {completed && (
            <span className="badge bg-forest-600 text-white">Completed</span>
          )}
        </div>
        <h4 className="font-display font-semibold text-ink-900 dark:text-paper-50">{milestone.title}</h4>
        {milestone.description && (
          <p className="text-sm text-ink-500 dark:text-paper-300 mt-1.5 leading-relaxed">{milestone.description}</p>
        )}
        {Array.isArray(milestone.resources) && milestone.resources.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {milestone.resources.map((res, i) => (
              <li key={i} className="text-sm text-ink-600 dark:text-paper-200 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                {res}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
