import { motion } from "framer-motion";
import ProgressBar from "../ui/ProgressBar";

export default function SkillBars({ title, skills = [], tone = "forest", emptyText }) {
  return (
    <div className="card">
      <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50 mb-4">{title}</h3>
      {skills.length === 0 ? (
        <p className="text-sm text-ink-400 py-2">{emptyText}</p>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, i) => {
            const name = typeof skill === "string" ? skill : skill.name;
            const level = typeof skill === "string" ? 100 : skill.level ?? 100;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink-700 dark:text-paper-100">{name}</span>
                  <span className="text-xs text-ink-400">{level}%</span>
                </div>
                <ProgressBar value={level} tone={tone} height="h-1.5" />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
