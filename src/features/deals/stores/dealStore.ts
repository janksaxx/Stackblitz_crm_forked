import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Deal } from '../types';

interface DealStore {
  deals: Deal[];
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  moveCard: (dealId: string, fromStage: string, toStage: string) => void;
}

export const useDealStore = create<DealStore>()(
  persist(
    (set) => ({
      deals: [],
      addDeal: (deal) => set((state) => ({ 
        deals: [...state.deals, deal] 
      })),
      updateDeal: (id, updates) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === id ? { ...deal, ...updates } : deal
        ),
      })),
      deleteDeal: (id) => set((state) => ({
        deals: state.deals.filter((deal) => deal.id !== id),
      })),
      moveCard: (dealId, fromStage, toStage) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === dealId ? { ...deal, stage: toStage } : deal
        ),
      })),
    }),
    {
      name: 'deals-storage',
    }
  )
);