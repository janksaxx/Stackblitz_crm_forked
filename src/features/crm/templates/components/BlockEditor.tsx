import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTemplateStore } from '../stores/templateStore';
import { Grip } from 'lucide-react';

export function BlockEditor() {
  const { activeTemplate, reorderBlocks, removeBlock } = useTemplateStore();

  if (!activeTemplate) return null;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    reorderBlocks(
      activeTemplate.id,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="blocks">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 p-4"
          >
            {activeTemplate.blocks.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div {...provided.dragHandleProps}>
                        <Grip className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {block.type}
                        </span>
                      </div>
                      <button
                        onClick={() => removeBlock(activeTemplate.id, block.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}