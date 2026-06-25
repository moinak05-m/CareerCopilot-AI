import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Settings</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">Customize how Ascent looks and feels.</p>
      </div>

      <div className="card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-ink-100 dark:bg-ink-700 flex items-center justify-center">
            {isDark ? <Moon className="h-5 w-5 text-paper-200" /> : <Sun className="h-5 w-5 text-amber-500" />}
          </div>
          <div>
            <p className="font-medium text-ink-800 dark:text-paper-50">Dark mode</p>
            <p className="text-sm text-ink-500 dark:text-paper-300">Switch between light and dark themes.</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          aria-pressed={isDark}
          className={`relative h-7 w-12 rounded-full transition-colors ${isDark ? "bg-forest-600" : "bg-ink-200"}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              isDark ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
