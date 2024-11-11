import { useTemplateStore } from '../../stores/templateStore';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from './blocks';
import { motion, AnimatePresence } from 'framer-motion';

function DropZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone'
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
        isOver
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
          : 'border-gray-300 dark:border-gray-700'
      }`}
    >
      <div className="text-center px-6 py-8">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Drag and drop blocks here
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Choose blocks from the sidebar to start building your template
        </p>
      </div>
    </div>
  );
}

export function Canvas() {
  const { activeTemplate } = useTemplateStore();

  if (!activeTemplate) return null;

  return (
    <div className="min-h-full w-full py-8 px-4 bg-gray-100 dark:bg-gray-900">
      <div 
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-visible"
        style={{
          minHeight: '100%',
          ...activeTemplate.styles,
          fontFamily: activeTemplate.styles.fontFamily || 'Arial, sans-serif',
          color: activeTemplate.styles.textColor || '#000000',
        }}
      >
        <div className="p-8">
          {activeTemplate.blocks.length > 0 ? (
            <SortableContext
              items={activeTemplate.blocks.map(block => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {activeTemplate.blocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Block
                      block={block}
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </SortableContext>
          ) : (
            <DropZone />
          )}
        </div>
      </div>
    </div>
  );
}