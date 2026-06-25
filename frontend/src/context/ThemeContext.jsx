import { createContext, useMemo } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Enforce Light Mode permanently as requested
  const value = useMemo(() => ({ theme: "light", toggleTheme: () => {}, setTheme: () => {} }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
