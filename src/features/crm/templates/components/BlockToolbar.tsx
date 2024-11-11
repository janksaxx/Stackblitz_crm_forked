import { useState } from 'react';
import { Type, Image, Square, Minus, MoveVertical, Grid } from 'lucide-react';
import { useDrag } from 'react-dnd';

const BLOCKS = [
  {
    type: 'text',
    name: 'Text',
    icon: Type,
    description: 'Add a text block',
    defaultContent: { text: 'Enter your text here' }
  },
  {
    type: 'image',
    name: 'Image',
    icon: Image,
    description: 'Add an image',
    defaultContent: { url: '', alt: '' }
  },
  {
    type: 'button',
    name: 'Button',
    icon: Square,
    description: 'Add a button',
    defaultContent: { text: 'Click me', url: '#' }
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: Minus,
    description: 'Add a divider',
    defaultContent: {}
  },
  {
    type: 'columns',
    name: '2 Columns',
    icon: Grid,
    description: 'Add two columns',
    defaultContent: {
      columns: [
        { content: 'Column 1' },
        { content: 'Column 2' }
      ]
    }
  },
  {
    type: 'spacer',
    name: 'Spacer',
    icon: MoveVertical,
    description: 'Add vertical space',
    defaultContent: { height: '32px' }
  }
];

function DraggableBlock({ type, name, icon: Icon, description, defaultContent }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { type, defaultContent },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="h-6 w-6 text-gray-400 mb-2" />
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {name}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        {description}
      </span>
    </div>
  );
}

export function BlockToolbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlocks = BLOCKS.filter(block =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="search"
          placeholder="Search blocks..."
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredBlocks.map((block) => (
            <DraggableBlock key={block.type} {...block} />
          ))}
        </div>
      </div>
    </div>
  );
}