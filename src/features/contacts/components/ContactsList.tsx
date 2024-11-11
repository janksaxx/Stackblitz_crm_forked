import { useEffect } from 'react';
import { useContactStore } from '../stores/contactStore';
import { useDB } from '../../../lib/db';
import { ContactCard } from './ContactCard';

export function ContactsList() {
  const { isLoading, error, fetchContacts } = useContactStore();
  const contacts = useDB((state) => state.contacts);

  useEffect(() => {
    fetchContacts().catch(console.error);
  }, [fetchContacts]);

  if (isLoading) {
    return (
      <div className="grid gap-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No contacts found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={() => {/* Handle edit */}}
          onDelete={() => useContactStore.getState().deleteContact(contact.id)}
        />
      ))}
    </div>
  );
}