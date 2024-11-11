import { useState } from 'react';
import { DashboardLayout } from '../../../dashboard/layouts/DashboardLayout';
import { useTemplateStore } from '../stores/templateStore';
import { TemplateEditor } from '../components/TemplateEditor';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '../../../../components/ui/BackButton';

export function TemplatesPage() {
  const [isCreating, setIsCreating] = useState(false);
  const { templates, addTemplate, setActiveTemplate } = useTemplateStore();

  const handleCreateTemplate = () => {
    const newTemplate = {
      name: 'New Template',
      description: 'Add a description for your template',
      blocks: [],
      styles: {
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        textColor: '#000000',
      },
    };

    addTemplate(newTemplate);
    setIsCreating(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Email Templates
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create and manage your email templates
            </p>
          </div>
          <button
            onClick={handleCreateTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </button>
        </div>

        <AnimatePresence mode="wait">
          {templates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No templates yet
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating your first email template
              </p>
              <button
                onClick={handleCreateTemplate}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Template
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTemplate(template)}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {template.description || 'No description'}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{template.blocks.length} blocks</span>
                    <span>
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <TemplateEditor />
      </div>
    </DashboardLayout>
  );
}