import { useState } from 'react';
import { format, isValid } from 'date-fns';
import { CheckCircle2, Circle, AlertCircle, Clock, User, Paperclip, MessageSquare } from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { Task, TaskPriority } from '../types';

interface TaskItemProps {
  task: Task;
}

const priorityConfig: Record<TaskPriority, { color: string; icon: typeof AlertCircle }> = {
  high: { color: 'text-red-500', icon: AlertCircle },
  medium: { color: 'text-yellow-500', icon: AlertCircle },
  low: { color: 'text-green-500', icon: AlertCircle },
};

export function TaskItem({ task }: TaskItemProps) {
  const { updateTaskStatus } = useTaskStore();
  const [isHovered, setIsHovered] = useState(false);

  const PriorityIcon = priorityConfig[task.priority].icon;
  const priorityColor = priorityConfig[task.priority].color;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
  };

  return (
    <div
      className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
          className="mt-1 flex-shrink-0"
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`text-sm font-medium ${
              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <PriorityIcon className={`h-4 w-4 ${priorityColor}`} />
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(task.dueDate)}</span>
            </div>

            {task.assignedTo && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{task.assignedTo.name}</span>
              </div>
            )}

            {task.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-4 w-4" />
                <span>{task.attachments.length}</span>
              </div>
            )}

            {task.comments.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{task.comments.length}</span>
              </div>
            )}
          </div>

          {task.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {isHovered && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={() => {/* Implement edit */}}
              className="text-gray-400 hover:text-gray-500"
            >
              Edit
            </button>
            <button
              onClick={() => {/* Implement delete */}}
              className="text-red-400 hover:text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}