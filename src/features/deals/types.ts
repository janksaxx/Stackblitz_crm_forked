export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
  contactName: string;
  contactEmail: string;
  closeDate: string;
  probability: number;
  description?: string;
  source: 'Website' | 'Referral' | 'Outbound' | 'Event' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}