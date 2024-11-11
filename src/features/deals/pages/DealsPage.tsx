import { useState } from 'react';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { DealsPipeline } from '../components/DealsPipeline';
import { AddDealDialog } from '../components/AddDealDialog';
import { Plus } from 'lucide-react';
import { BackButton } from '../../../components/ui/BackButton';

export function DealsPage() {
  const [isAddingDeal, setIsAddingDeal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Deals & Opportunities
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your sales pipeline and track opportunities
            </p>
          </div>
          <button
            onClick={() => setIsAddingDeal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Deal
          </button>
        </div>

        <DealsPipeline />

        <AddDealDialog 
          isOpen={isAddingDeal} 
          onClose={() => setIsAddingDeal(false)} 
        />
      </div>
    </DashboardLayout>
  );
}