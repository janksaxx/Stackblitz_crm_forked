import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  size?: string;
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability?: number;
  closeDate?: string;
  companyId?: string;
  contactId?: string;
  ownerId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface DBState {
  users: User[];
  contacts: Contact[];
  companies: Company[];
  deals: Deal[];
  tasks: Task[];
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  updateContact: (id: string, data: Partial<Contact>) => void;
  updateCompany: (id: string, data: Partial<Company>) => void;
  updateDeal: (id: string, data: Partial<Deal>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteUser: (id: string) => void;
  deleteContact: (id: string) => void;
  deleteCompany: (id: string) => void;
  deleteDeal: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const useDB = create<DBState>()(
  persist(
    (set) => ({
      users: [],
      contacts: [],
      companies: [],
      deals: [],
      tasks: [],

      addUser: (userData) => set((state) => ({
        users: [...state.users, {
          ...userData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      addContact: (contactData) => set((state) => ({
        contacts: [...state.contacts, {
          ...contactData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      addCompany: (companyData) => set((state) => ({
        companies: [...state.companies, {
          ...companyData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      addDeal: (dealData) => set((state) => ({
        deals: [...state.deals, {
          ...dealData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      addTask: (taskData) => set((state) => ({
        tasks: [...state.tasks, {
          ...taskData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),

      updateUser: (id, data) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, ...data, updatedAt: new Date().toISOString() }
            : user
        ),
      })),

      updateContact: (id, data) => set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact.id === id
            ? { ...contact, ...data, updatedAt: new Date().toISOString() }
            : contact
        ),
      })),

      updateCompany: (id, data) => set((state) => ({
        companies: state.companies.map((company) =>
          company.id === id
            ? { ...company, ...data, updatedAt: new Date().toISOString() }
            : company
        ),
      })),

      updateDeal: (id, data) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === id
            ? { ...deal, ...data, updatedAt: new Date().toISOString() }
            : deal
        ),
      })),

      updateTask: (id, data) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, ...data, updatedAt: new Date().toISOString() }
            : task
        ),
      })),

      deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      })),

      deleteContact: (id) => set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== id),
      })),

      deleteCompany: (id) => set((state) => ({
        companies: state.companies.filter((company) => company.id !== id),
      })),

      deleteDeal: (id) => set((state) => ({
        deals: state.deals.filter((deal) => deal.id !== id),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
    }),
    {
      name: 'crm-storage',
    }
  )
);