import { motion } from "framer-motion";
import Button from "./Button";

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex flex-col items-center justify-center text-center py-14 px-6"
    >
      <div className="h-14 w-14 rounded-2xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center mb-4">
        {Icon && <Icon className="h-7 w-7 text-forest-600 dark:text-forest-300" />}
      </div>
      <h3 className="text-lg font-semibold text-ink-900 dark:text-paper-50 font-display">{title}</h3>
      <p className="text-sm text-ink-500 dark:text-paper-300 mt-1.5 max-w-sm">{description}</p>
      {actionLabel && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
