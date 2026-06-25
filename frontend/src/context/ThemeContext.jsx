import { createContext, useMemo, useEffect } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const value = useMemo(() => ({ theme: "light", toggleTheme: () => {}, setTheme: () => {} }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
