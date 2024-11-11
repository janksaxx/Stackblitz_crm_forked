export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface TaskComment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface TaskAssignee {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: TaskAssignee;
  relatedTo?: {
    type: 'contact' | 'company' | 'deal';
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  attachments: TaskAttachment[];
  comments: TaskComment[];
  tags: string[];
  createdBy: {
    id: string;
    name: string;
  };
}