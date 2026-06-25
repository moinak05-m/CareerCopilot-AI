import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ExtractedSkills({ skills = [] }) {
  if (!skills.length) return null;
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4.5 w-4.5 text-amber-500" />
        <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">Extracted skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-full bg-ink-50 dark:bg-ink-700 border border-ink-100 dark:border-ink-600 px-3 py-1.5 text-sm text-ink-700 dark:text-paper-100"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
