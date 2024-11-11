import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PipelineStage {
  id: string;
  name: string;
}

interface PipelineState {
  stages: PipelineStage[];
  updateStages: (stages: PipelineStage[]) => void;
  addStage: (stage: PipelineStage) => void;
  removeStage: (id: string) => void;
  updateStage: (id: string, name: string) => void;
}

const defaultStages: PipelineStage[] = [
  { id: '1', name: 'Lead' },
  { id: '2', name: 'Meeting' },
  { id: '3', name: 'Proposal' },
  { id: '4', name: 'Negotiation' },
  { id: '5', name: 'Closed' },
];

export const usePipelineStore = create<PipelineState>()(
  persist(
    (set) => ({
      stages: defaultStages,
      updateStages: (stages) => set({ stages }),
      addStage: (stage) => set((state) => ({
        stages: [...state.stages, stage],
      })),
      removeStage: (id) => set((state) => ({
        stages: state.stages.filter((stage) => stage.id !== id),
      })),
      updateStage: (id, name) => set((state) => ({
        stages: state.stages.map((stage) =>
          stage.id === id ? { ...stage, name } : stage
        ),
      })),
    }),
    {
      name: 'pipeline-storage',
    }
  )
);