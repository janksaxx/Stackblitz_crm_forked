import { useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { TaskItem } from './TaskItem';
import { TaskFilter } from './TaskFilter';
import { Task, TaskStatus, TaskPriority } from '../types';
import { TaskForm } from './TaskForm';
import { Dialog } from '@headlessui/react';

export function TaskList() {
  const { tasks, addTask } = useTaskStore();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignedTo?.id === assigneeFilter;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange = !dateRange || (
      new Date(task.dueDate) >= new Date(dateRange.start) &&
      new Date(task.dueDate) <= new Date(dateRange.end)
    );

    return matchesStatus && matchesPriority && matchesAssignee && matchesSearch && matchesDateRange;
  });

  const handleCreateTask = (data: any) => {
    addTask({
      ...data,
      createdBy: {
        id: '1', // In a real app, this would come from the authenticated user
        name: 'Current User',
      },
      attachments: [],
      comments: [],
      tags: data.tags || [],
    });
    setIsAddingTask(false);
  };

  return (
    <div className="space-y-4">
      <TaskFilter
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        assigneeFilter={assigneeFilter}
        dateRange={dateRange}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onAssigneeChange={setAssigneeFilter}
        onDateRangeChange={setDateRange}
        onSearchChange={setSearchQuery}
        onAddTask={() => setIsAddingTask(true)}
      />

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No tasks found matching your filters
          </div>
        )}
      </div>

      <Dialog
        open={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              Create New Task
            </Dialog.Title>
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setIsAddingTask(false)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}