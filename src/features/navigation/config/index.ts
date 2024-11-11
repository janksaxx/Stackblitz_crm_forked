import { NavigationGroup } from './navigationGroups';
import { overviewNavigation } from './overviewNavigation';
import { crmNavigation } from './crmNavigation';
import { settingsNavigation } from './settingsNavigation';

export const navigationConfig: NavigationGroup[] = [
  overviewNavigation,
  crmNavigation,
  settingsNavigation,
];