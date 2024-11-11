import { navigationConfig } from '../config';
import { NavigationGroup } from './NavigationGroup';

export function Navigation() {
  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigationConfig.map((group) => (
        <NavigationGroup key={group.label} group={group} />
      ))}
    </nav>
  );
}