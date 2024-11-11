import { Target, Briefcase } from 'lucide-react';
import { NavigationGroup } from './navigationGroups';

export const salesNavigation: NavigationGroup = {
  label: 'Sales',
  items: [
    { name: 'Opportunities', href: '/dashboard/opportunities', icon: Target },
    { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  ],
};