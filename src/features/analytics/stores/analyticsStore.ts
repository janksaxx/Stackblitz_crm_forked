import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Widget, WidgetType } from '../types';

interface AnalyticsState {
  widgets: Widget[];
  layout: any[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateLayout: (newLayout: any[]) => void;
}

const widgetTitles: Record<WidgetType, string> = {
  'revenue-chart': 'Revenue Chart',
  'deals-pipeline': 'Deals Pipeline',
  'customer-distribution': 'Customer Distribution',
  'activity-feed': 'Activity Feed',
  'leads-metrics': 'Leads Metrics',
  'sales-forecast': 'Sales Forecast',
  'tasks-overview': 'Tasks Overview',
  'meetings-schedule': 'Meetings Schedule',
};

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      widgets: [],
      layout: [],
      addWidget: (type) => set((state) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newWidget = {
          id,
          type,
          title: widgetTitles[type],
        };
        
        // Default layout for new widget
        const newLayout = [
          ...state.layout,
          {
            i: id,
            x: (state.layout.length * 4) % 12,
            y: Infinity,
            w: 4,
            h: 4,
          },
        ];

        return {
          widgets: [...state.widgets, newWidget],
          layout: newLayout,
        };
      }),
      removeWidget: (id) => set((state) => ({
        widgets: state.widgets.filter((w) => w.id !== id),
        layout: state.layout.filter((l) => l.i !== id),
      })),
      updateLayout: (newLayout) => set({ layout: newLayout }),
    }),
    {
      name: 'analytics-storage',
    }
  )
);