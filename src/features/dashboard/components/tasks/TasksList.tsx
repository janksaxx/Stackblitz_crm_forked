import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const initialTasks = [
  {
    id: 1,
    title: 'Follow up with potential clients',
    completed: false,
    priority: 'high',
    dueDate: '2024-03-20',
  },
  {
    id: 2,
    title: 'Prepare presentation for meeting',
    completed: false,
    priority: 'medium',
    dueDate: '2024-03-21',
  },
  {
    id: 3,
    title: 'Review proposal documents',
    completed: true,
    priority: 'low',
    dueDate: '2024-03-19',
  },
];

export function TasksList() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
  };

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="py-3 flex items-center justify-between group"
        >
          <div className="flex items-center">
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 mr-3"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              )}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Due: {task.dueDate}
              </p>
            </div>
          </div>
          <span className={`text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  );
}