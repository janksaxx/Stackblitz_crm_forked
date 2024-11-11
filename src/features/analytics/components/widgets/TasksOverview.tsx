import { CheckCircle2, Clock } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Follow up with clients', status: 'completed' },
  { id: 2, title: 'Prepare presentation', status: 'in_progress' },
  { id: 3, title: 'Review proposals', status: 'pending' },
];

export function TasksOverview() {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3">
          {task.status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
          <span className={`text-sm ${
            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </span>
        </div>
      ))}
    </div>
  );
}