import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with potential clients',
    description: 'Send follow-up emails to leads from the tech conference',
    dueDate: '2024-03-20',
    priority: 'high',
    status: 'todo',
    assignedTo: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    relatedTo: {
      type: 'deal',
      id: '1',
      name: 'Enterprise Deal'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    attachments: [],
    comments: [],
    tags: ['sales', 'follow-up'],
    createdBy: {
      id: '1',
      name: 'Current User'
    }
  }
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,
  addTask: (taskData) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    )
  }))
}));