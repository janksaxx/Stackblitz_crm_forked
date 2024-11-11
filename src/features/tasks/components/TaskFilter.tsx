import { Search, Filter, Calendar, Plus } from 'lucide-react';
import { TaskStatus, TaskPriority } from '../types';
import { useState } from 'react';

interface TaskFilterProps {
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
  assigneeFilter: string;
  dateRange: { start: string; end: string } | null;
  searchQuery: string;
  onStatusChange: (status: TaskStatus | 'all') => void;
  onPriorityChange: (priority: TaskPriority | 'all') => void;
  onAssigneeChange: (assigneeId: string) => void;
  onDateRangeChange: (range: { start: string; end: string } | null) => void;
  onSearchChange: (query: string) => void;
  onAddTask: () => void;
}

const teamMembers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  // Add more team members
];

export function TaskFilter({
  statusFilter,
  priorityFilter,
  assigneeFilter,
  dateRange,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onDateRangeChange,
  onSearchChange,
  onAddTask,
}: TaskFilterProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        <button
          onClick={onAddTask}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value as TaskPriority | 'all')}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={assigneeFilter}
            onChange={(e) => onAssigneeChange(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Assignees</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Date Range
            </button>

            {isDatePickerOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg p-4 z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange?.start || ''}
                      onChange={(e) => onDateRangeChange({
                        start: e.target.value,
                        end: dateRange?.end || e.target.value,
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange?.end || ''}
                      onChange={(e) => onDateRangeChange({
                        start: dateRange?.start || e.target.value,
                        end: e.target.value,
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        onDateRangeChange(null);
                        setIsDatePickerOpen(false);
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setIsDatePickerOpen(false)}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}