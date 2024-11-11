import { useTemplateStore } from '../../stores/templateStore';

export function StylesPanel() {
  const { activeTemplate, updateTemplate } = useTemplateStore();

  if (!activeTemplate) return null;

  const handleUpdateStyles = (updates: Partial<typeof activeTemplate.styles>) => {
    updateTemplate(activeTemplate.id, {
      styles: { ...activeTemplate.styles, ...updates }
    });
  };

  return (
    <div className="p-4 border-t bg-white dark:bg-gray-800">
      <h3 className="font-medium mb-2 dark:text-white">Template Styles</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Background Color</label>
          <input
            type="color"
            value={activeTemplate.styles.backgroundColor || '#ffffff'}
            onChange={(e) => handleUpdateStyles({ backgroundColor: e.target.value })}
            className="block w-full mt-1"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Font Family</label>
          <select
            value={activeTemplate.styles.fontFamily || 'Arial, sans-serif'}
            onChange={(e) => handleUpdateStyles({ fontFamily: e.target.value })}
            className="block w-full mt-1 rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Courier New, monospace">Courier New</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Font Size</label>
          <select
            value={activeTemplate.styles.fontSize || '16px'}
            onChange={(e) => handleUpdateStyles({ fontSize: e.target.value })}
            className="block w-full mt-1 rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="14px">Small</option>
            <option value="16px">Medium</option>
            <option value="18px">Large</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">Text Color</label>
          <input
            type="color"
            value={activeTemplate.styles.textColor || '#000000'}
            onChange={(e) => handleUpdateStyles({ textColor: e.target.value })}
            className="block w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
}