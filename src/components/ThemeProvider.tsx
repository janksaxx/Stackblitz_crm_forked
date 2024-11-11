import { useEffect } from 'react';
import { useThemeStore } from '../lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, accentColor } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle theme
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    // Handle accent color
    root.style.setProperty('--accent-color', `var(--${accentColor}-500)`);
    root.style.setProperty('--accent-color-light', `var(--${accentColor}-400)`);
    root.style.setProperty('--accent-color-dark', `var(--${accentColor}-600)`);
  }, [theme, accentColor]);

  return <>{children}</>;
}