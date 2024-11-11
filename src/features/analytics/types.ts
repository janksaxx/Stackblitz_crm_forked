export type WidgetType =
  | 'revenue-chart'
  | 'deals-pipeline'
  | 'customer-distribution'
  | 'activity-feed'
  | 'leads-metrics'
  | 'sales-forecast'
  | 'tasks-overview'
  | 'meetings-schedule';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
}