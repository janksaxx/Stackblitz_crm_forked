import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorLayoutProps {
  sidebar: ReactNode;
  canvas: ReactNode;
  stylesPanel?: ReactNode;
  showStyles?: boolean;
}

export function EditorLayout({ sidebar, canvas, stylesPanel, showStyles = true }: EditorLayoutProps) {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 flex-none bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
        {sidebar}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-auto">
          {canvas}
        </div>
      </div>

      {/* Right Styles Panel */}
      <AnimatePresence>
        {showStyles && stylesPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-80 flex-none bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {stylesPanel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}