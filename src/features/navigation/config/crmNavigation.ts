import { Users, Building2, FileText, DollarSign, FileEdit } from 'lucide-react';
import { NavigationGroup } from './navigationGroups';

export const crmNavigation: NavigationGroup = {
  label: 'CRM',
  items: [
    { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
    { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
    { name: 'Deals', href: '/dashboard/deals', icon: DollarSign },
    { name: 'Tasks', href: '/dashboard/tasks', icon: FileText },
    { name: 'Email Templates', href: '/dashboard/templates', icon: FileEdit },
  ],
};