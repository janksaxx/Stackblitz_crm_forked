import api from './index';
import { Contact } from '../../features/contacts/types';

export const contactsApi = {
  getAll: async () => {
    const response = await api.get<Contact[]>('/contacts');
    return response;
  },
  
  getById: async (id: string) => {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response;
  },
  
  create: async (data: Omit<Contact, 'id'>) => {
    const response = await api.post<Contact>('/contacts', data);
    return response;
  },
  
  update: async (id: string, data: Partial<Contact>) => {
    const response = await api.put<Contact>(`/contacts/${id}`, data);
    return response;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/contacts/${id}`);
    return response;
  },
};