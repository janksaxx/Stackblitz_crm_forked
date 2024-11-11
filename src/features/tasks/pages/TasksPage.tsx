import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { TaskList } from '../components/TaskList';
import { BackButton } from '../../../components/ui/BackButton';

export function TasksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your team's tasks
            </p>
          </div>
        </div>

        <TaskList />
      </div>
    </DashboardLayout>
  );
}