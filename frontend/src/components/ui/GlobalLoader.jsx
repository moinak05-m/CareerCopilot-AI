import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-paper-200/80 dark:bg-ink-950/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-forest-200 border-t-forest-600 animate-spin" />
            <span className="font-display text-sm text-ink-600 dark:text-paper-200">Ascent</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
