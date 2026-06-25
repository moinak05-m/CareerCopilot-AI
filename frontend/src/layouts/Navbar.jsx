import { useState } from "react";
import { Menu, Search, Command } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navConfig";
import toast from "react-hot-toast";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const current = NAV_ITEMS.find((i) => location.pathname.startsWith(i.to));

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      toast.success(`Searching for: ${searchValue}`);
      setSearchValue("");
    }
  };

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
        className={`hidden md:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition-all w-64 justify-between bg-white shadow-sm ${
          searchFocused
            ? "border-forest-400 ring-2 ring-forest-500/15"
            : "border-ink-200 hover:border-ink-300"
        }`}
      >
        <div className="flex items-center gap-2 flex-1">
          <Search className={`h-4 w-4 transition-colors ${searchFocused ? "text-forest-500" : "text-ink-400"}`} />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={handleSearch}
            placeholder="Search or jump to..."
            className="bg-transparent outline-none w-full text-ink-700 placeholder:text-ink-400 text-sm"
          />
        </div>
        {!searchFocused && (
          <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-ink-200 bg-paper-50 px-1 py-0.5 text-[10px] font-mono text-ink-400 font-medium shadow-sm">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        )}
      </div>

      <div className="flex items-center gap-2 pl-2 border-l border-ink-200">

        <button className="h-9 w-9 rounded-full bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center text-forest-700 font-medium text-sm border-2 border-white shadow-sm hover:shadow-md transition-shadow overflow-hidden ring-1 ring-ink-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Moinak&backgroundColor=transparent" alt="User Profile" className="h-full w-full object-cover" />
        </button>
      </div>
    </header>
  );
}
