import { useTemplateStore } from '../../stores/templateStore';
import { X } from 'lucide-react';

export function EditorHeader() {
  const { activeTemplate, updateTemplate, setActiveTemplate } = useTemplateStore();

  if (!activeTemplate) return null;

  const handleUpdateTemplate = (updates: Partial<typeof activeTemplate>) => {
    updateTemplate(activeTemplate.id, updates);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 z-10">
      <div>
        <input
          type="text"
          value={activeTemplate.name}
          onChange={(e) => handleUpdateTemplate({ name: e.target.value })}
          className="text-xl font-semibold bg-transparent border-none focus:outline-none dark:text-white"
          placeholder="Template Name"
        />
        <input
          type="text"
          value={activeTemplate.description || ''}
          onChange={(e) => handleUpdateTemplate({ description: e.target.value })}
          className="text-sm text-gray-500 bg-transparent border-none focus:outline-none mt-1"
          placeholder="Add a description..."
        />
      </div>
      <button
        onClick={() => setActiveTemplate(null)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}