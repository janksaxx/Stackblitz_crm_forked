import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Template {
  id: string;
  name: string;
  description?: string;
  blocks: Array<{
    id: string;
    type: string;
    content: any;
    styles?: Record<string, any>;
  }>;
  styles: {
    fontFamily?: string;
    fontSize?: string;
    backgroundColor?: string;
    textColor?: string;
    maxWidth?: string;
    padding?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TemplateState {
  templates: Template[];
  activeTemplate: Template | null;
  addTemplate: (template: Partial<Template>) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  setActiveTemplate: (template: Template | null) => void;
}

const defaultTemplate: Template = {
  id: '1',
  name: 'Default Template',
  description: 'A starter template',
  blocks: [],
  styles: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    maxWidth: '600px',
    padding: '32px'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      templates: [defaultTemplate],
      activeTemplate: null,

      addTemplate: (template) => set((state) => ({
        templates: [
          ...state.templates,
          {
            ...defaultTemplate,
            id: crypto.randomUUID(),
            name: template.name || 'Untitled Template',
            description: template.description,
            blocks: template.blocks || [],
            styles: { ...defaultTemplate.styles, ...template.styles },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),

      updateTemplate: (id, updates) => set((state) => ({
        templates: state.templates.map((template) =>
          template.id === id
            ? { 
                ...template, 
                ...updates, 
                updatedAt: new Date().toISOString(),
                styles: { ...template.styles, ...(updates.styles || {}) }
              }
            : template
        ),
        activeTemplate:
          state.activeTemplate?.id === id
            ? { 
                ...state.activeTemplate, 
                ...updates, 
                updatedAt: new Date().toISOString(),
                styles: { ...state.activeTemplate.styles, ...(updates.styles || {}) }
              }
            : state.activeTemplate,
      })),

      deleteTemplate: (id) => set((state) => ({
        templates: state.templates.filter((template) => template.id !== id),
        activeTemplate: state.activeTemplate?.id === id ? null : state.activeTemplate,
      })),

      setActiveTemplate: (template) => set({ activeTemplate: template }),
    }),
    {
      name: 'email-templates',
    }
  )
);