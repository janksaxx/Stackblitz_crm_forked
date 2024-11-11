import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@dnd-kit/core';
import { Type, Image, Square, Columns, Rows, Link, Mail } from 'lucide-react';

const elements = [
  {
    id: 'text',
    name: 'Text',
    icon: Type,
    description: 'Add text content'
  },
  {
    id: 'image',
    name: 'Image',
    icon: Image,
    description: 'Add an image'
  },
  {
    id: 'button',
    name: 'Button',
    icon: Square,
    description: 'Add a button'
  },
  {
    id: 'columns-2',
    name: '2 Columns',
    icon: Columns,
    description: 'Add 2-column layout'
  },
  {
    id: 'columns-3',
    name: '3 Columns',
    icon: Columns,
    description: 'Add 3-column layout'
  },
  {
    id: 'divider',
    name: 'Divider',
    icon: Rows,
    description: 'Add a divider line'
  },
  {
    id: 'link',
    name: 'Link',
    icon: Link,
    description: 'Add a hyperlink'
  },
  {
    id: 'social',
    name: 'Social',
    icon: Mail,
    description: 'Add social media links'
  }
];

export function ElementsSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <input
          type="search"
          placeholder="Search elements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredElements.map((element) => (
          <div
            key={element.id}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-move"
            draggable
          >
            <element.icon className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">{element.name}</span>
            <span className="text-xs text-gray-500 text-center mt-1">
              {element.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}