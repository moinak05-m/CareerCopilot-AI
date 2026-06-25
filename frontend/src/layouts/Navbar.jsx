import { useState } from "react";
import { Menu, Moon, Sun, Bell, Search } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navConfig";

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const current = NAV_ITEMS.find((i) => location.pathname.startsWith(i.to));
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-100 dark:border-ink-700/60 bg-white/80 dark:bg-ink-900/80 backdrop-blur-xl px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden h-9 w-9 grid place-items-center rounded-lg text-ink-600 dark:text-paper-200 hover:bg-ink-100 dark:hover:bg-ink-800"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50 hidden sm:block">
        {current?.label || "Overview"}
      </h1>

      <div className="flex-1" />

      <div
        className={`hidden md:flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
          searchFocused
            ? "border-forest-400 ring-2 ring-forest-500/15"
            : "border-ink-200 dark:border-ink-700"
        } bg-paper-100 dark:bg-ink-800`}
      >
        <Search className="h-4 w-4 text-ink-400" />
        <input
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search skills, roadmap, questions…"
          className="bg-transparent outline-none w-56 text-ink-700 dark:text-paper-100 placeholder:text-ink-400"
        />
      </div>

      <button className="h-9 w-9 grid place-items-center rounded-lg text-ink-500 dark:text-paper-300 hover:bg-ink-100 dark:hover:bg-ink-800 relative">
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-coral-500" />
      </button>

      <button
        onClick={toggleTheme}
        className="h-9 w-9 grid place-items-center rounded-lg text-ink-500 dark:text-paper-300 hover:bg-ink-100 dark:hover:bg-ink-800"
        title="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
      </button>
    </header>
  );
}
