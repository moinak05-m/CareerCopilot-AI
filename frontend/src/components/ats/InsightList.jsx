import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const toneStyle = {
  forest: { wrap: "bg-forest-50 dark:bg-forest-900/30", icon: "text-forest-600 dark:text-forest-300" },
  amber: { wrap: "bg-amber-50 dark:bg-amber-900/20", icon: "text-amber-600 dark:text-amber-300" },
  coral: { wrap: "bg-coral-400/10", icon: "text-coral-500" },
};

export default function InsightList({ title, items = [], icon: Icon, tone = "forest", emptyText }) {
  const t = toneStyle[tone];
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", t.wrap)}>
          <Icon className={cn("h-4 w-4", t.icon)} />
        </div>
        <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-400 py-2">{emptyText}</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="text-sm text-ink-600 dark:text-paper-200 flex items-start gap-2.5 leading-relaxed"
            >
              <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", t.icon.replace("text-", "bg-"))} />
              {item}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
