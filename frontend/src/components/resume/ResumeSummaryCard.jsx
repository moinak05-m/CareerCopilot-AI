import { motion } from "framer-motion";
import { FileText, Calendar, HardDrive, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/format";

export default function ResumeSummaryCard({ resume, onDelete }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-14 w-14 rounded-xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6 text-forest-600 dark:text-forest-300" />
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-ink-900 dark:text-paper-50 truncate">
              {resume.fileName || resume.name || "resume.pdf"}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-ink-500 dark:text-paper-300">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Uploaded {formatDate(resume.uploadedAt || resume.createdAt)}
              </span>
              {resume.size && (
                <span className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" /> {(resume.size / 1024).toFixed(0)} KB
                </span>
              )}
            </div>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-ink-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors shrink-0"
            title="Delete Resume"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
