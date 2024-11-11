import { Contact } from '../types';
import { Mail, Phone, Building2 } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {contact.position} {contact.company ? `at ${contact.company}` : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
            {contact.email}
          </a>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Phone className="h-4 w-4" />
            <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
              {contact.phone}
            </a>
          </div>
        )}
        {contact.company && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Building2 className="h-4 w-4" />
            <span>{contact.company}</span>
          </div>
        )}
      </div>
    </div>
  );
}