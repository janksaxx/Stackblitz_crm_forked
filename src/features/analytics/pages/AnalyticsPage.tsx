import { useState } from 'react';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { WidgetPicker } from '../components/WidgetPicker';
import { Plus } from 'lucide-react';
import { BackButton } from '../../../components/ui/BackButton';

export function AnalyticsPage() {
  const [isWidgetPickerOpen, setIsWidgetPickerOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Customize your analytics view with drag and drop widgets
            </p>
          </div>
          <button
            onClick={() => setIsWidgetPickerOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Widget
          </button>
        </div>

        <AnalyticsDashboard />

        <WidgetPicker
          isOpen={isWidgetPickerOpen}
          onClose={() => setIsWidgetPickerOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}