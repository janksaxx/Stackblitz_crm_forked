import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';
import { WidgetType } from '../types';
import {
  BarChart2,
  LineChart,
  PieChart,
  Activity,
  Users,
  DollarSign,
  List,
  Calendar,
} from 'lucide-react';

const widgetOptions = [
  {
    type: 'revenue-chart' as WidgetType,
    name: 'Revenue Chart',
    description: 'Track revenue over time',
    icon: LineChart,
  },
  {
    type: 'deals-pipeline' as WidgetType,
    name: 'Deals Pipeline',
    description: 'View deals by stage',
    icon: BarChart2,
  },
  {
    type: 'customer-distribution' as WidgetType,
    name: 'Customer Distribution',
    description: 'Customer segments breakdown',
    icon: PieChart,
  },
  {
    type: 'activity-feed' as WidgetType,
    name: 'Activity Feed',
    description: 'Recent activities and updates',
    icon: Activity,
  },
  {
    type: 'leads-metrics' as WidgetType,
    name: 'Leads Metrics',
    description: 'Lead generation statistics',
    icon: Users,
  },
  {
    type: 'sales-forecast' as WidgetType,
    name: 'Sales Forecast',
    description: 'Predicted sales performance',
    icon: DollarSign,
  },
  {
    type: 'tasks-overview' as WidgetType,
    name: 'Tasks Overview',
    description: 'Team tasks and progress',
    icon: List,
  },
  {
    type: 'meetings-schedule' as WidgetType,
    name: 'Meetings Schedule',
    description: 'Upcoming meetings calendar',
    icon: Calendar,
  },
];

interface WidgetPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetPicker({ isOpen, onClose }: WidgetPickerProps) {
  const { addWidget } = useAnalyticsStore();

  const handleAddWidget = (type: WidgetType) => {
    addWidget(type);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Add Widget
                </Dialog.Title>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {widgetOptions.map((widget) => (
                    <button
                      key={widget.type}
                      className="p-4 text-left border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                      onClick={() => handleAddWidget(widget.type)}
                    >
                      <widget.icon className="h-6 w-6 text-indigo-600 mb-2" />
                      <h4 className="font-medium text-gray-900">{widget.name}</h4>
                      <p className="text-sm text-gray-500">{widget.description}</p>
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}