import { useDrop } from 'react-dnd';
import { Block } from './blocks';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateStore } from '../../stores/templateStore';

export function DroppableCanvas() {
  const { activeTemplate, addBlock } = useTemplateStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item: any) => {
      if (!activeTemplate) return;
      addBlock(activeTemplate.id, {
        type: item.type,
        content: item.defaultContent,
        styles: {}
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  if (!activeTemplate) return null;

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="min-h-full p-8">
        <div
          ref={drop}
          className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm ${
            isOver ? 'ring-2 ring-indigo-500' : ''
          }`}
          style={{
            minHeight: '100%',
            ...activeTemplate.styles,
            fontFamily: activeTemplate.styles.fontFamily || 'Arial, sans-serif',
            color: activeTemplate.styles.textColor || '#000000',
          }}
        >
          <div className="p-8">
            {activeTemplate.blocks.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {activeTemplate.blocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4 last:mb-0"
                  >
                    <Block block={block} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="text-center px-6 py-8">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Drag and drop blocks here
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Choose blocks from the sidebar to start building your template
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}