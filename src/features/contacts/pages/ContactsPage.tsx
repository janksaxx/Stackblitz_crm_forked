import { useState } from 'react';
import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { ContactsList } from '../components/ContactsList';
import { AddContactDialog } from '../components/AddContactDialog';
import { BackButton } from '../../../components/ui/BackButton';

export function ContactsPage() {
  const [isAddingContact, setIsAddingContact] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Manage your contacts and relationships
            </p>
          </div>
          <button
            onClick={() => setIsAddingContact(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Contact
          </button>
        </div>

        <ContactsList />

        <AddContactDialog
          isOpen={isAddingContact}
          onClose={() => setIsAddingContact(false)}
        />
      </div>
    </DashboardLayout>
  );
}