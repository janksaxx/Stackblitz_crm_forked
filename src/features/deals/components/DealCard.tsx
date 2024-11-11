import { forwardRef } from 'react';
import { Card } from '../../dashboard/components/ui/Card';
import { Deal } from '../types';
import { formatCurrency } from '../../../lib/utils';

interface DealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deal: Deal;
}

export const DealCard = forwardRef<HTMLDivElement, DealCardProps>(
  ({ deal, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white p-4 rounded-lg shadow-sm mb-2 ${className}`}
        {...props}
      >
        <h3 className="font-medium text-gray-900">{deal.name}</h3>
        <p className="text-sm text-gray-500">{deal.company}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(deal.value)}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(deal.closeDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }
);