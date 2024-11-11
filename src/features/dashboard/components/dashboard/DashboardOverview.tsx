import { Card } from '../ui/Card';
import { DealsFunnel } from '../deals/DealsFunnel';
import { RecentActivities } from '../activities/RecentActivities';
import { TasksList } from '../tasks/TasksList';
import { QuickStats } from './QuickStats';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Deals Pipeline</h2>
          <DealsFunnel />
        </Card>
        
        <Card>
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <RecentActivities />
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>
        <TasksList />
      </Card>
    </div>
  );
}