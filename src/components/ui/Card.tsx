import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
  isHoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', isHoverable = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white dark:bg-gray-800 shadow-lg",
      glass: "glass-card",
      outline: "border-2 border-gray-200 dark:border-gray-700"
    };

    const baseStyles = "rounded-xl transition-all duration-300";
    const hoverStyles = isHoverable ? "hover:shadow-xl transform hover:-translate-y-1" : "";

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);