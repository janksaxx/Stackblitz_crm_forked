import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../../lib/theme';
import { cn } from '../../../lib/utils';

const ACCENT_COLORS = [
  { name: 'Blue', value: '#0066FF' },
  { name: 'Purple', value: '#6B46C1' },
  { name: 'Green', value: '#059669' },
  { name: 'Red', value: '#DC2626' },
  { name: 'Orange', value: '#EA580C' },
] as const;

export function ThemeToggle() {
  const { theme, toggleTheme, accentColor, setAccentColor } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.setProperty('--accent-color', accentColor);
  }, [theme, accentColor]);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        className={cn(
          "rounded-lg p-2 transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      
      <div className="flex gap-2">
        {ACCENT_COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => setAccentColor(color.value)}
            className={cn(
              "h-5 w-5 rounded-full transition-all",
              accentColor === color.value && "ring-2 ring-offset-2"
            )}
            style={{ backgroundColor: color.value }}
            aria-label={`Set ${color.name} theme`}
          />
        ))}
      </div>
    </div>
  );
}