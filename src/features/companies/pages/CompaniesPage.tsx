import { useState } from 'react';
import { CompaniesList } from '../components/CompaniesList';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { BackButton } from '../../../components/ui/BackButton';
import { AddCompanyDialog } from '../components/AddCompanyDialog';

export function CompaniesPage() {
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          </div>
          <button 
            onClick={() => setIsAddingCompany(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Company
          </button>
        </div>
        <CompaniesList />

        <AddCompanyDialog
          isOpen={isAddingCompany}
          onClose={() => setIsAddingCompany(false)}
        />
      </div>
    </DashboardLayout>
  );
}