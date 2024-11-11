import api from '../../../lib/api';
import { Contact } from '../types';

export const contactsApi = {
  getAll: () => 
    api.get<Contact[]>('/contacts'),
  
  create: (data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<Contact>('/contacts', data),
  
  update: (id: string, data: Partial<Contact>) =>
    api.put<Contact>(`/contacts/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/contacts/${id}`)
};