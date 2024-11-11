import { useEffect } from 'react';
import { useThemeStore } from '../../../lib/theme';

export function useTheme() {
  const { theme, accentColor } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Update theme class
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Update accent color
    root.style.setProperty('--accent-color', accentColor);
  }, [theme, accentColor]);

  return { theme, accentColor };
}