import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { OpportunityCard } from './OpportunityCard';
import { useOpportunityStore } from '../stores/opportunityStore';
import { OpportunityStage } from '../types';

const stages: OpportunityStage[] = [
  'new',
  'qualifying',
  'meeting',
  'proposal',
  'negotiating',
  'closed_won',
  'closed_lost'
];

const stageNames: Record<OpportunityStage, string> = {
  new: 'New',
  qualifying: 'Qualifying',
  meeting: 'Meeting',
  proposal: 'Proposal',
  negotiating: 'Negotiating',
  closed_won: 'Won',
  closed_lost: 'Lost'
};

export function OpportunityPipeline() {
  const { opportunities, updateStage } = useOpportunityStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceStage = result.source.droppableId as OpportunityStage;
    const destinationStage = result.destination.droppableId as OpportunityStage;
    const opportunityId = result.draggableId;

    updateStage(opportunityId, destinationStage);
  };

  const getOpportunitiesByStage = (stage: OpportunityStage) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-12rem)]">
        {stages.map((stage) => (
          <div key={stage} className="flex-1 min-w-[320px]">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-t-lg">
              <h3 className="font-medium text-gray-900 dark:text-white">{stageNames[stage]}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getOpportunitiesByStage(stage).length} opportunities
              </p>
            </div>

            <Droppable droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 bg-gray-50 dark:bg-gray-800 rounded-b-lg min-h-[200px]"
                >
                  {getOpportunitiesByStage(stage).map((opportunity, index) => (
                    <Draggable
                      key={opportunity.id}
                      draggableId={opportunity.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <OpportunityCard opportunity={opportunity} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}