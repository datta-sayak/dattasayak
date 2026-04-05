'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((prev) => !prev),
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={isDarkMode ? 'theme-dark bg-black text-white' : 'bg-white text-black'}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
