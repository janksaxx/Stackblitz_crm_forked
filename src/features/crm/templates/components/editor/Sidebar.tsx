import { useState } from 'react';
import { BlockEditor } from '../BlockEditor';
import { BlockPicker } from '../BlockPicker';
import { StylesPanel } from './StylesPanel';

export function Sidebar() {
  const [showBlockPicker, setShowBlockPicker] = useState(false);

  return (
    <div className="w-80 border-r flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b">
        <button
          onClick={() => setShowBlockPicker(true)}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Block
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <BlockEditor />
      </div>
      <StylesPanel />
      
      {showBlockPicker && (
        <BlockPicker onClose={() => setShowBlockPicker(false)} />
      )}
    </div>
  );
}