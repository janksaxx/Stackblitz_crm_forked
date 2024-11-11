import { Settings } from 'lucide-react';
import { NavigationGroup } from './navigationGroups';

export const settingsNavigation: NavigationGroup = {
  label: 'Settings',
  items: [
    { name: 'Preferences', href: '/dashboard/preferences', icon: Settings },
  ],
};