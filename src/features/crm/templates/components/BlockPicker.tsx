import { useTemplateStore } from '../stores/templateStore';
import { X, Type, Image, Columns, Layout } from 'lucide-react';

interface BlockPickerProps {
  onClose: () => void;
}

const BLOCK_TYPES = [
  {
    type: 'text',
    name: 'Text Block',
    icon: Type,
    description: 'Add a paragraph of text',
    defaultContent: {
      text: 'Enter your text here',
    },
  },
  {
    type: 'image',
    name: 'Image Block',
    icon: Image,
    description: 'Add an image',
    defaultContent: {
      url: '',
      alt: '',
    },
  },
  {
    type: 'columns',
    name: 'Columns',
    icon: Columns,
    description: 'Add a multi-column layout',
    defaultContent: {
      columns: [
        { content: 'Column 1' },
        { content: 'Column 2' },
      ],
    },
  },
  {
    type: 'spacer',
    name: 'Spacer',
    icon: Layout,
    description: 'Add vertical spacing',
    defaultContent: {
      height: '20px',
    },
  },
];

export function BlockPicker({ onClose }: BlockPickerProps) {
  const { activeTemplate, addBlock } = useTemplateStore();

  const handleAddBlock = (blockType: typeof BLOCK_TYPES[0]) => {
    if (!activeTemplate) return;

    addBlock(activeTemplate.id, {
      type: blockType.type,
      content: blockType.defaultContent,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full m-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Add Content Block</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {BLOCK_TYPES.map((blockType) => (
              <button
                key={blockType.type}
                onClick={() => handleAddBlock(blockType)}
                className="flex items-start p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <blockType.icon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium">{blockType.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {blockType.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}