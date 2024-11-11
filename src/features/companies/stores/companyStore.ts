import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  createdAt: string;
}

interface CompanyStore {
  companies: Company[];
  addCompany: (company: Company) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companies: [],
      addCompany: (company) => set((state) => ({
        companies: [...state.companies, company]
      })),
      updateCompany: (id, updates) => set((state) => ({
        companies: state.companies.map((company) =>
          company.id === id ? { ...company, ...updates } : company
        )
      })),
      deleteCompany: (id) => set((state) => ({
        companies: state.companies.filter((company) => company.id !== id)
      })),
    }),
    {
      name: 'companies-storage'
    }
  )
);