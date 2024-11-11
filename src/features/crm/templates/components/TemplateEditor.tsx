import { useState } from 'react';
import { useTemplateStore } from '../stores/templateStore';
import { motion } from 'framer-motion';
import { X, Eye } from 'lucide-react';
import { PreviewModal } from './preview/PreviewModal';
import { RichTextEditor } from './RichTextEditor';

export function TemplateEditor() {
  const { activeTemplate, setActiveTemplate, updateTemplate } = useTemplateStore();
  const [showPreview, setShowPreview] = useState(false);

  if (!activeTemplate) return null;

  const handleUpdate = (section: 'header' | 'body' | 'signature', content: string) => {
    updateTemplate(activeTemplate.id, {
      content: {
        ...activeTemplate.content,
        [section]: content
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 flex flex-col bg-gray-100 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <input
              type="text"
              value={activeTemplate.name}
              onChange={(e) => updateTemplate(activeTemplate.id, { name: e.target.value })}
              className="text-xl font-medium bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white w-full"
              placeholder="Untitled Template"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTemplate(null)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Email Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Header</h3>
              </div>
              <div className="p-4">
                <RichTextEditor
                  content={activeTemplate.content?.header || ''}
                  onChange={(content) => handleUpdate('header', content)}
                  placeholder="Enter email header..."
                />
              </div>
            </div>

            {/* Email Body */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Body</h3>
              </div>
              <div className="p-4">
                <RichTextEditor
                  content={activeTemplate.content?.body || ''}
                  onChange={(content) => handleUpdate('body', content)}
                  placeholder="Enter email body..."
                />
              </div>
            </div>

            {/* Email Signature */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Signature</h3>
              </div>
              <div className="p-4">
                <RichTextEditor
                  content={activeTemplate.content?.signature || ''}
                  onChange={(content) => handleUpdate('signature', content)}
                  placeholder="Enter email signature..."
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          template={activeTemplate}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}