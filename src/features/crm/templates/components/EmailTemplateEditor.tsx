import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RichTextEditor } from './RichTextEditor';
import { Eye, X } from 'lucide-react';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  header: z.string(),
  body: z.string().min(1, 'Email body is required'),
  signature: z.string()
});

type TemplateFormData = z.infer<typeof templateSchema>;

export function EmailTemplateEditor() {
  const [showPreview, setShowPreview] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      header: '',
      body: '',
      signature: ''
    }
  });

  const onSubmit = (data: TemplateFormData) => {
    console.log('Template data:', data);
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
        <div className="flex-1">
          <input
            {...register('name')}
            className="text-xl font-medium bg-transparent border-none focus:outline-none dark:text-white w-full"
            placeholder="Untitled Template"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Subject Line */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Line
            </label>
            <input
              {...register('subject')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter email subject"
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Header */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Header
            </label>
            <RichTextEditor
              content={watch('header')}
              onChange={(content) => setValue('header', content)}
              placeholder="Add email header (optional)"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Body
            </label>
            <RichTextEditor
              content={watch('body')}
              onChange={(content) => setValue('body', content)}
              placeholder="Write your email content here..."
            />
            {errors.body && (
              <p className="text-sm text-red-500 mt-1">{errors.body.message}</p>
            )}
          </div>

          {/* Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Signature
            </label>
            <RichTextEditor
              content={watch('signature')}
              onChange={(content) => setValue('signature', content)}
              placeholder="Add your signature here..."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t dark:border-gray-700">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}