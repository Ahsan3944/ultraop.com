/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UltraOP Theme Toggle Button
 * Controls switching between Editorial Light (#F4F4F1) and Midnight Artistic (#0D0D0E) modes.
 */

import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../utils/theme';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  variant?: 'icon' | 'compact' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { theme, toggleTheme, isMidnight } = useTheme();

  if (variant === 'full') {
    return (
      <button
        id="theme-toggle-full-btn"
        onClick={toggleTheme}
        className={`w-full p-3.5 flex items-center justify-between border transition-all duration-300 ${
          isMidnight
            ? 'bg-[#17171A] border-white/20 text-[#F4F4F1] hover:border-[#FF3E00]'
            : 'bg-white border-black/15 text-[#121212] hover:border-black'
        } ${className}`}
        aria-label="Toggle between Editorial Light and Midnight Artistic Theme"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-none transition-colors ${
              isMidnight ? 'bg-[#FF3E00] text-white' : 'bg-[#121212] text-white'
            }`}
          >
            {isMidnight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <div className="text-xs font-black uppercase tracking-wider font-heading">
              {isMidnight ? 'Midnight Artistic' : 'Editorial Light'}
            </div>
            <div className="text-[10px] text-[#888888] font-medium">
              {isMidnight ? 'Deep Ink & Neon Orange' : 'Warm Cream & Rich Black'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-black/5 dark:bg-white/10 text-[9px] font-black uppercase tracking-widest">
          <span>Switch</span>
        </div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        id="theme-toggle-compact-btn"
        onClick={toggleTheme}
        className={`px-3 py-2 flex items-center gap-2 border text-xs font-black uppercase tracking-wider transition-all duration-300 ${
          isMidnight
            ? 'bg-[#17171A] border-white/20 text-[#F4F4F1] hover:border-[#FF3E00] hover:text-[#FF3E00]'
            : 'bg-white border-black/20 text-[#121212] hover:border-black hover:bg-[#121212] hover:text-white'
        } ${className}`}
        title={isMidnight ? 'Switch to Editorial Light (#F4F4F1)' : 'Switch to Midnight Artistic (#0D0D0E)'}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMidnight ? (
            <motion.div
              key="midnight"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <Moon className="w-3.5 h-3.5 text-[#FF3E00]" />
              <span className="text-[10px] tracking-[0.15em]">Midnight</span>
            </motion.div>
          ) : (
            <motion.div
              key="editorial"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-[#121212]" />
              <span className="text-[10px] tracking-[0.15em]">Editorial</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      id="theme-toggle-icon-btn"
      onClick={toggleTheme}
      className={`p-2 rounded-none border transition-all duration-300 relative group overflow-hidden ${
        isMidnight
          ? 'bg-[#17171A] text-[#F4F4F1] border-white/20 hover:border-[#FF3E00]'
          : 'bg-white text-[#121212] border-black/20 hover:border-black hover:bg-[#121212] hover:text-white'
      } ${className}`}
      title={isMidnight ? 'Switch to Editorial Light Mode (#F4F4F1)' : 'Switch to Midnight Artistic Mode (#0D0D0E)'}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isMidnight ? (
          <motion.div
            key="midnight-icon"
            initial={{ y: -12, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-[#FF3E00]" />
          </motion.div>
        ) : (
          <motion.div
            key="editorial-icon"
            initial={{ y: 12, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 group-hover:text-white transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
