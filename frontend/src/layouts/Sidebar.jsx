import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, LogOut } from "lucide-react";
import { NAV_ITEMS } from "./navConfig";
import { useAuth } from "../hooks/useAuth";
import { initials } from "../utils/format";

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-ink-100 dark:border-ink-700/60 bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-ink-100 dark:border-ink-700/60">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center">
          <Compass className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-ink-900 dark:text-paper-50">
          Ascent
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "text-forest-700 dark:text-forest-300"
                  : "text-ink-500 dark:text-paper-300 hover:text-ink-800 dark:hover:text-paper-50 hover:bg-ink-50 dark:hover:bg-ink-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-forest-50 dark:bg-forest-900/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.icon className="h-4.5 w-4.5 relative z-10" strokeWidth={2} />
                <span className="relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-ink-100 dark:border-ink-700/60">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center font-display text-sm font-semibold text-amber-700 dark:text-amber-300 shrink-0">
            {initials(user?.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink-800 dark:text-paper-50 truncate">
              {user?.name || "Your account"}
            </p>
            <p className="text-xs text-ink-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Log out"
            className="h-8 w-8 grid place-items-center rounded-lg text-ink-400 hover:text-coral-500 hover:bg-coral-400/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
