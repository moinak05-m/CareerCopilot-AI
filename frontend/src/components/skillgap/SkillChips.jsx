import { cn } from "../../utils/cn";

const toneStyle = {
  forest: "bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300 border-forest-200 dark:border-forest-800",
  coral: "bg-coral-400/10 text-coral-600 dark:text-coral-400 border-coral-400/20",
};

export default function SkillChips({ title, skills = [], tone = "forest", emptyText }) {
  return (
    <div className="card">
      <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50 mb-4">{title}</h3>
      {skills.length === 0 ? (
        <p className="text-sm text-ink-400 py-2">{emptyText}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const name = typeof skill === "string" ? skill : skill.name;
            return (
              <span key={name} className={cn("rounded-full border px-3 py-1.5 text-sm font-medium", toneStyle[tone])}>
                {name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
