import { useState, useEffect } from 'react';
import { Palette, Type, Layout, Image } from 'lucide-react';
import { ChromePicker } from 'react-color';
import { useTemplateStore } from '../../stores/templateStore';
import { motion, AnimatePresence } from 'framer-motion';

const fontFamilies = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
];

const fontSizes = [
  { value: '12px', label: 'Small (12px)' },
  { value: '14px', label: 'Medium (14px)' },
  { value: '16px', label: 'Large (16px)' },
  { value: '18px', label: 'Extra Large (18px)' },
  { value: '24px', label: 'Huge (24px)' },
];

export function StylesSidebar() {
  const { activeTemplate, updateTemplate } = useTemplateStore();
  const [activeTab, setActiveTab] = useState('typography');
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const tabs = [
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'background', name: 'Background', icon: Image },
  ];

  const handleStyleUpdate = (updates: Partial<typeof activeTemplate.styles>) => {
    if (!activeTemplate) return;
    updateTemplate(activeTemplate.id, {
      styles: { ...activeTemplate.styles, ...updates }
    });
  };

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showColorPicker && !(e.target as Element).closest('.color-picker')) {
        setShowColorPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  if (!activeTemplate) return null;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mx-auto mb-1" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'typography' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Family
                  </label>
                  <select
                    value={activeTemplate.styles.fontFamily || 'Arial, sans-serif'}
                    onChange={(e) => handleStyleUpdate({ fontFamily: e.target.value })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size
                  </label>
                  <select
                    value={activeTemplate.styles.fontSize || '16px'}
                    onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {fontSizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {activeTab === 'colors' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Color
                  </label>
                  <div className="relative color-picker">
                    <button
                      onClick={() => setShowColorPicker('text')}
                      className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-between px-3 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="flex items-center">
                        <span
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: activeTemplate.styles.textColor }}
                        />
                        {activeTemplate.styles.textColor || '#000000'}
                      </span>
                    </button>
                    {showColorPicker === 'text' && (
                      <div className="absolute z-10 mt-2">
                        <ChromePicker
                          color={activeTemplate.styles.textColor || '#000000'}
                          onChange={(color) => handleStyleUpdate({ textColor: color.hex })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="relative color-picker">
                    <button
                      onClick={() => setShowColorPicker('background')}
                      className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-between px-3 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="flex items-center">
                        <span
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: activeTemplate.styles.backgroundColor }}
                        />
                        {activeTemplate.styles.backgroundColor || '#ffffff'}
                      </span>
                    </button>
                    {showColorPicker === 'background' && (
                      <div className="absolute z-10 mt-2">
                        <ChromePicker
                          color={activeTemplate.styles.backgroundColor || '#ffffff'}
                          onChange={(color) => handleStyleUpdate({ backgroundColor: color.hex })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'layout' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Width
                  </label>
                  <input
                    type="range"
                    min="400"
                    max="800"
                    step="10"
                    value={parseInt(activeTemplate.styles.maxWidth as string || '600')}
                    onChange={(e) => handleStyleUpdate({ maxWidth: `${e.target.value}px` })}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {activeTemplate.styles.maxWidth || '600px'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Padding
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="4"
                    value={parseInt(activeTemplate.styles.padding as string || '32')}
                    onChange={(e) => handleStyleUpdate({ padding: `${e.target.value}px` })}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {activeTemplate.styles.padding || '32px'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}