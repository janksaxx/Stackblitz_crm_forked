import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { Block, useTemplateStore } from '../stores/templateStore';

interface SortableBlockProps {
  block: Block;
  onEdit: () => void;
}

export function SortableBlock({ block, onEdit }: SortableBlockProps) {
  const { activeTemplate, deleteBlock } = useTemplateStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    if (!activeTemplate) return;
    deleteBlock(activeTemplate.id, block.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <div className="font-medium">{block.type}</div>
        <div className="text-sm text-gray-500">
          {block.type === 'text' && block.content.text}
          {block.type === 'button' && block.content.text}
          {block.type === 'image' && 'Image: ' + (block.content.alt || 'No alt text')}
          {block.type === 'divider' && 'Divider'}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-600"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}