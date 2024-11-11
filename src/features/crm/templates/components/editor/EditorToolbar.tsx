import { Save, Eye, Undo, Redo, Settings } from 'lucide-react';

export function EditorToolbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Undo className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Redo className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Eye className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );
}