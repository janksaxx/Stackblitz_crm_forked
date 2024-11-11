import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  template: any;
  onClose: () => void;
}

export function PreviewModal({ template, onClose }: PreviewModalProps) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all">
                <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                    Preview: {template.name}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    {/* Header */}
                    <div dangerouslySetInnerHTML={{ __html: template.content?.header || '' }} />
                    
                    {/* Body */}
                    <div dangerouslySetInnerHTML={{ __html: template.content?.body || '' }} />
                    
                    {/* Signature */}
                    <div dangerouslySetInnerHTML={{ __html: template.content?.signature || '' }} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}