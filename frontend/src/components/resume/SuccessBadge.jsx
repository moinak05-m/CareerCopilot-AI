import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SuccessBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
      className="flex items-center gap-2 rounded-xl bg-forest-50 dark:bg-forest-900/30 border border-forest-200 dark:border-forest-800 px-4 py-3 text-forest-700 dark:text-forest-300 text-sm font-medium"
    >
      <CheckCircle2 className="h-4.5 w-4.5" />
      Resume uploaded successfully
    </motion.div>
  );
}
