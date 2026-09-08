/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP Theme Management
 * Supports 'editorial' (Default Editorial Cream #F4F4F1) and 'midnight' (Midnight Artistic #0D0D0E).
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { sound } from './audio';

export type AppTheme = 'editorial' | 'midnight';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  setTheme: (theme: AppTheme) => void;
  isMidnight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'ultraop_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'midnight' || saved === 'editorial') {
        return saved;
      }
      // If user OS prefers dark mode, default to midnight, otherwise editorial
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'midnight';
      }
    } catch {
      // Fallback
    }
    return 'editorial';
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'midnight';

    if (isDark) {
      root.classList.add('theme-midnight');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'midnight');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('theme-midnight');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'editorial');
      root.style.colorScheme = 'light';
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    sound.playScore();
    setThemeState((prev) => (prev === 'editorial' ? 'midnight' : 'editorial'));
  };

  const setTheme = (newTheme: AppTheme) => {
    sound.playScore();
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isMidnight: theme === 'midnight',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
