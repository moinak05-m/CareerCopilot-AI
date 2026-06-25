import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

export default function UploadProgress({ fileName, progress }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex items-center gap-4"
    >
      <div className="h-11 w-11 rounded-xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center shrink-0">
        <FileText className="h-5 w-5 text-forest-600 dark:text-forest-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-sm font-medium text-ink-800 dark:text-paper-50 truncate">{fileName}</p>
          <span className="text-xs text-ink-500 dark:text-paper-300 shrink-0 ml-2">{progress}%</span>
        </div>
        <ProgressBar value={progress} tone="forest" height="h-1.5" />
      </div>
    </motion.div>
  );
}
