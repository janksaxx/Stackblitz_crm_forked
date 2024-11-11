import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { PipelineStagesSettings } from '../components/PipelineStagesSettings';
import { ThemeToggle } from '../../theme/components/ThemeToggle';
import { BackButton } from '../../../components/ui/BackButton';

export function PreferencesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <BackButton className="mb-2" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Preferences</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Customize your CRM experience
          </p>
        </div>

        <div className="grid gap-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme Settings</h2>
            <ThemeToggle />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pipeline Stages</h2>
            <PipelineStagesSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}