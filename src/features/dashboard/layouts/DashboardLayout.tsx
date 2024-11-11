import { ReactNode, useState } from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopBar } from '../components/navigation/TopBar';
import { MobileNav } from '../components/navigation/MobileNav';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Navigation */}
      <MobileNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block" />

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
              <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  {children}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}