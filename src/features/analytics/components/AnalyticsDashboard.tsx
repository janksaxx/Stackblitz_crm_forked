import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAnalyticsStore } from '../stores/analyticsStore';
import { WidgetRenderer } from './widgets/WidgetRenderer';
import { motion } from 'framer-motion';

interface DraggableWidgetProps {
  widget: any;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableWidget({ widget, index, moveWidget }: DraggableWidgetProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WIDGET',
    item: { id: widget.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'WIDGET',
    hover: (item: { id: string; index: number }) => {
      if (item.index === index) return;
      moveWidget(item.index, index);
      item.index = index;
    },
  }));

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
        isDragging ? 'opacity-50' : ''
      }`}
      layout
    >
      <WidgetRenderer widget={widget} />
    </motion.div>
  );
}

export function AnalyticsDashboard() {
  const { layout, widgets, updateLayout } = useAnalyticsStore();

  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    const newLayout = [...layout];
    const [removed] = newLayout.splice(dragIndex, 1);
    newLayout.splice(hoverIndex, 0, removed);
    updateLayout(newLayout);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget, index) => (
          <DraggableWidget
            key={widget.id}
            widget={widget}
            index={index}
            moveWidget={moveWidget}
          />
        ))}
      </div>
    </div>
  );
}