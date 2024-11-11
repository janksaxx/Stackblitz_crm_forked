import { useDrag, useDrop } from 'react-dnd';
import { DealCard } from './DealCard';
import { useDealStore } from '../stores/dealStore';
import { usePipelineStore } from '../../settings/stores/pipelineStore';
import { Deal } from '../types';
import { motion } from 'framer-motion';

interface DraggableDealProps {
  deal: Deal;
  onDrop: (dealId: string, targetStage: string) => void;
}

function DraggableDeal({ deal, onDrop }: DraggableDealProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DEAL',
    item: { id: deal.id, currentStage: deal.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={isDragging ? 'opacity-50' : ''}
      style={{ cursor: 'grab' }}
    >
      <DealCard deal={deal} />
    </motion.div>
  );
}

interface DroppableColumnProps {
  stage: string;
  deals: Deal[];
  onDrop: (dealId: string, targetStage: string) => void;
}

function DroppableColumn({ stage, deals, onDrop }: DroppableColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DEAL',
    drop: (item: { id: string }) => {
      onDrop(item.id, stage);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[320px] ${isOver ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
    >
      <div className="p-4 rounded-t-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="font-semibold text-gray-900 dark:text-white">{stage}</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {deals.length} deals
        </div>
      </div>
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-b-lg min-h-[200px]">
        {deals.map((deal) => (
          <div key={deal.id} className="mb-2">
            <DraggableDeal deal={deal} onDrop={onDrop} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DealsPipeline() {
  const { deals, moveCard } = useDealStore();
  const { stages } = usePipelineStore();

  const handleDrop = (dealId: string, targetStage: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.stage !== targetStage) {
      moveCard(dealId, deal.stage, targetStage);
    }
  };

  const getDealsForStage = (stageName: string): Deal[] => {
    return deals.filter((deal) => deal.stage === stageName);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-12rem)]">
      {stages.map((stage) => (
        <DroppableColumn
          key={stage.id}
          stage={stage.name}
          deals={getDealsForStage(stage.name)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}