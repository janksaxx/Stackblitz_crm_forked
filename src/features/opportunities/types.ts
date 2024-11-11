export type OpportunityStage = 'new' | 'qualifying' | 'meeting' | 'proposal' | 'negotiating' | 'closed_won' | 'closed_lost';
export type OpportunitySource = 'website' | 'referral' | 'outbound' | 'event' | 'other';
export type OpportunityPriority = 'low' | 'medium' | 'high';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: OpportunityStage;
  priority: OpportunityPriority;
  source: OpportunitySource;
  owner: string;
  contactName: string;
  contactEmail: string;
  nextFollowUp: string;
  probability: number;
  expectedCloseDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}