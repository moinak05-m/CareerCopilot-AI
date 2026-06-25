import { AnimatePresence, motion } from "framer-motion";
import { X, Compass } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./navConfig";
import { useAuth } from "../hooks/useAuth";

export default function MobileSidebar({ open, onClose }) {
  const { logout } = useAuth();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-ink-900 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-ink-100 dark:border-ink-700/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center">
                  <Compass className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-ink-900 dark:text-paper-50">Ascent</span>
              </div>
              <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                      isActive
                        ? "bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-300"
                        : "text-ink-500 dark:text-paper-300"
                    }`
                  }
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-ink-100 dark:border-ink-700/60">
              <button onClick={logout} className="btn-secondary w-full">
                Log out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
