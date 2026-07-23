'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('theme-dark', isDarkMode);
  }, [isDarkMode]);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((prev) => !prev),
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={isDarkMode ? 'theme-dark bg-[#101010] text-white' : 'bg-white text-black'}>{children}</div>
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
