import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome to your CRM dashboard
            </p>
          </div>
        </div>
        <DashboardOverview />
      </div>
    </DashboardLayout>
  );
}