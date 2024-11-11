import { useState } from 'react';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { OpportunityPipeline } from '../components/OpportunityPipeline';
import { Plus } from 'lucide-react';

export function OpportunitiesPage() {
  const [isAddingOpportunity, setIsAddingOpportunity] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Opportunities
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track your sales opportunities
            </p>
          </div>
          <button
            onClick={() => setIsAddingOpportunity(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Opportunity
          </button>
        </div>

        <OpportunityPipeline />
      </div>
    </DashboardLayout>
  );
}