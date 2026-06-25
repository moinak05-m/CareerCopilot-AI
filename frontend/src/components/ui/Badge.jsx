import { cn } from "../../utils/cn";

const tones = {
  forest: "bg-forest-50 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  coral: "bg-coral-400/10 text-coral-600 dark:text-coral-400",
  ink: "bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-paper-200",
};

export default function Badge({ tone = "ink", children, className, icon: Icon }) {
  return (
    <span className={cn("badge", tones[tone], className)}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}
