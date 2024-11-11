import { forwardRef } from 'react';
import { formatCurrency } from '../../../lib/utils';
import { format } from 'date-fns';
import { Opportunity } from '../types';
import { DollarSign, Calendar, BarChart } from 'lucide-react';

interface OpportunityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  opportunity: Opportunity;
}

export const OpportunityCard = forwardRef<HTMLDivElement, OpportunityCardProps>(
  ({ opportunity, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}
        {...props}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{opportunity.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.company}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(opportunity.value)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(opportunity.expectedCloseDate), 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-gray-400" />
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: `${opportunity.probability}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {opportunity.probability}%
            </span>
          </div>

          <div className="flex gap-2">
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);