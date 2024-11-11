import { useAuthStore } from '../../../../stores/authStore';
import { Navigation } from '../../../navigation/components/Navigation';
import { ThemeToggle } from '../../../theme/components/ThemeToggle';
import { motion } from 'framer-motion';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { user } = useAuthStore();

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-16 items-center gap-2 px-4 border-b border-gray-200 dark:border-gray-700"
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-accent-color to-accent-color-light bg-clip-text text-transparent">
          CRM
        </span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">SaaS</span>
      </motion.div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent-color to-accent-color-light flex items-center justify-center">
            <span className="text-lg font-semibold text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.companyName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Theme Toggle */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <ThemeToggle />
      </div>
    </div>
  );
}