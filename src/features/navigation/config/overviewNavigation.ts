import { LayoutDashboard, BarChart3 } from 'lucide-react';
import { NavigationGroup } from './navigationGroups';

export const overviewNavigation: NavigationGroup = {
  label: 'Overview',
  items: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ],
};