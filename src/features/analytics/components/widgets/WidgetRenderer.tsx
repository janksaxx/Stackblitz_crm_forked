import { Widget } from '../../types';
import { RevenueChart } from './RevenueChart';
import { DealsPipeline } from './DealsPipeline';
import { CustomerDistribution } from './CustomerDistribution';
import { ActivityFeed } from './ActivityFeed';
import { LeadsMetrics } from './LeadsMetrics';
import { SalesForecast } from './SalesForecast';
import { TasksOverview } from './TasksOverview';
import { MeetingsSchedule } from './MeetingsSchedule';
import { WidgetHeader } from './WidgetHeader';

interface WidgetRendererProps {
  widget: Widget;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const renderWidget = () => {
    switch (widget.type) {
      case 'revenue-chart':
        return <RevenueChart />;
      case 'deals-pipeline':
        return <DealsPipeline />;
      case 'customer-distribution':
        return <CustomerDistribution />;
      case 'activity-feed':
        return <ActivityFeed />;
      case 'leads-metrics':
        return <LeadsMetrics />;
      case 'sales-forecast':
        return <SalesForecast />;
      case 'tasks-overview':
        return <TasksOverview />;
      case 'meetings-schedule':
        return <MeetingsSchedule />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <WidgetHeader widget={widget} />
      <div className="flex-1 p-4 overflow-hidden">
        {renderWidget()}
      </div>
    </div>
  );
}