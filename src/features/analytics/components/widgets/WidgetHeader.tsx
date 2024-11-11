import { MoreVertical, GripHorizontal } from 'lucide-react';
import { Widget } from '../../types';
import { useAnalyticsStore } from '../../stores/analyticsStore';

interface WidgetHeaderProps {
  widget: Widget;
}

export function WidgetHeader({ widget }: WidgetHeaderProps) {
  const { removeWidget } = useAnalyticsStore();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <div className="widget-drag-handle cursor-move">
          <GripHorizontal className="h-5 w-5 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900">{widget.title}</h3>
      </div>
      <div className="relative">
        <button
          onClick={() => removeWidget(widget.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}