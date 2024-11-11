import { useTemplateStore } from '../../../stores/templateStore';
import { Block as BlockType } from '../../../stores/templateStore';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, Trash, Settings, Edit } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface BlockProps {
  block: BlockType;
  index: number;
}

export function Block({ block, index }: BlockProps) {
  const { activeTemplate, removeBlock, updateBlock, moveBlock } = useTemplateStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TEMPLATE_BLOCK',
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TEMPLATE_BLOCK',
    hover: (item: { id: string; index: number }) => {
      if (!activeTemplate) return;
      if (item.index === index) return;
      moveBlock(activeTemplate.id, item.index, index);
      item.index = index;
    },
  }));

  const handleDelete = () => {
    if (!activeTemplate) return;
    removeBlock(activeTemplate.id, block.id);
  };

  const handleUpdate = (updates: Partial<BlockType>) => {
    if (!activeTemplate) return;
    updateBlock(activeTemplate.id, block.id, updates);
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'text':
        return isEditing ? (
          <textarea
            value={block.content.text}
            onChange={(e) => handleUpdate({ content: { text: e.target.value } })}
            className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: block.content.text }}
            onClick={() => setIsEditing(true)}
          />
        );

      case 'image':
        return (
          <div className="relative">
            <img
              src={block.content.url || 'https://via.placeholder.com/800x400'}
              alt={block.content.alt}
              className="max-w-full h-auto rounded"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <input
                  type="text"
                  value={block.content.url || ''}
                  onChange={(e) => handleUpdate({ content: { ...block.content, url: e.target.value } })}
                  className="w-full max-w-md p-2 rounded-md"
                  placeholder="Enter image URL"
                />
              </div>
            )}
          </div>
        );

      case 'button':
        return isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.text}
              onChange={(e) => handleUpdate({ content: { ...block.content, text: e.target.value } })}
              className="w-full p-2 border rounded-md"
              placeholder="Button text"
            />
            <input
              type="text"
              value={block.content.url || ''}
              onChange={(e) => handleUpdate({ content: { ...block.content, url: e.target.value } })}
              className="w-full p-2 border rounded-md"
              placeholder="Button URL"
            />
          </div>
        ) : (
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            style={block.styles}
            onClick={() => setIsEditing(true)}
          >
            {block.content.text}
          </button>
        );

      case 'divider':
        return <hr className="my-4" style={block.styles} />;

      case 'spacer':
        return (
          <div
            style={{ height: block.content.height }}
            className="bg-gray-100 dark:bg-gray-700 opacity-50"
          />
        );

      case 'columns':
        return (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${block.content.columns.length}, 1fr)`,
              ...block.styles,
            }}
          >
            {block.content.columns.map((column: any, i: number) => (
              <div key={i} className="prose dark:prose-invert">
                {isEditing ? (
                  <textarea
                    value={column.content}
                    onChange={(e) => {
                      const newColumns = [...block.content.columns];
                      newColumns[i] = { content: e.target.value };
                      handleUpdate({ content: { columns: newColumns } });
                    }}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                ) : (
                  <div onClick={() => setIsEditing(true)}>{column.content}</div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4 last:mb-0 ${
        isDragging ? 'opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Drag Handle */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Block Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute top-2 right-2 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-1"
      >
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 text-gray-400 hover:text-indigo-600"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <Settings className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-600"
        >
          <Trash className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Block Content */}
      <div className="pl-8 pr-4 py-4" style={block.styles}>
        {renderBlockContent()}
      </div>
    </motion.div>
  );
}