import { create } from 'zustand';
import { useDB } from '../../../lib/db';

interface ContactState {
  isLoading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
  addContact: (contact: any) => Promise<void>;
  updateContact: (id: string, updates: any) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useContactStore = create<ContactState>()((set) => ({
  isLoading: false,
  error: null,

  fetchContacts: async () => {
    try {
      set({ isLoading: true, error: null });
      // No need to fetch - data is already in the DB store
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addContact: async (contactData) => {
    try {
      set({ isLoading: true, error: null });
      useDB.getState().addContact(contactData);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateContact: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      useDB.getState().updateContact(id, updates);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteContact: async (id) => {
    try {
      set({ isLoading: true, error: null });
      useDB.getState().deleteContact(id);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));