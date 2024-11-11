import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Opportunity, OpportunityStage } from '../types';

interface OpportunityState {
  opportunities: Opportunity[];
  addOpportunity: (opportunity: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  updateStage: (id: string, stage: OpportunityStage) => void;
  getOpportunitiesByStage: (stage: OpportunityStage) => Opportunity[];
}

const initialOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Enterprise Software Solution',
    company: 'Tech Corp',
    value: 100000,
    stage: 'qualifying',
    priority: 'high',
    source: 'website',
    owner: 'John Doe',
    contactName: 'Sarah Smith',
    contactEmail: 'sarah@techcorp.com',
    nextFollowUp: '2024-03-25',
    probability: 60,
    expectedCloseDate: '2024-05-15',
    notes: 'Initial discussion about ERP implementation',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    tags: ['enterprise', 'software']
  },
  {
    id: '2',
    title: 'Cloud Migration Project',
    company: 'Digital Solutions Inc',
    value: 75000,
    stage: 'proposal',
    priority: 'medium',
    source: 'referral',
    owner: 'Jane Smith',
    contactName: 'Mike Johnson',
    contactEmail: 'mike@digitalsolutions.com',
    nextFollowUp: '2024-03-28',
    probability: 75,
    expectedCloseDate: '2024-06-01',
    notes: 'Proposal for cloud infrastructure migration',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16',
    tags: ['cloud', 'migration']
  }
];

export const useOpportunityStore = create<OpportunityState>()(
  persist(
    (set, get) => ({
      opportunities: initialOpportunities,
      
      addOpportunity: (opportunity) => set((state) => ({
        opportunities: [
          ...state.opportunities,
          {
            ...opportunity,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      })),

      updateOpportunity: (id, updates) => set((state) => ({
        opportunities: state.opportunities.map((opp) =>
          opp.id === id
            ? { ...opp, ...updates, updatedAt: new Date().toISOString() }
            : opp
        )
      })),

      deleteOpportunity: (id) => set((state) => ({
        opportunities: state.opportunities.filter((opp) => opp.id !== id)
      })),

      updateStage: (id, stage) => set((state) => ({
        opportunities: state.opportunities.map((opp) =>
          opp.id === id
            ? { ...opp, stage, updatedAt: new Date().toISOString() }
            : opp
        )
      })),

      getOpportunitiesByStage: (stage) => {
        return get().opportunities.filter((opp) => opp.stage === stage);
      }
    }),
    {
      name: 'opportunities-storage'
    }
  )
);