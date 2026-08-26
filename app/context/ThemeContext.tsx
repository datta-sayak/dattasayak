'use client';

import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeBridge>{children}</ThemeBridge>
    </NextThemeProvider>
  );
}

function ThemeBridge({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', isDarkMode);
  }, [isDarkMode]);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setTheme(isDarkMode ? 'light' : 'dark'),
    }),
    [isDarkMode, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={isDarkMode ? 'theme-dark bg-[#101010] text-white' : 'bg-[#F5F4F3] text-black'}>{children}</div>
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
