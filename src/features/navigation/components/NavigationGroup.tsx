import { NavLink } from 'react-router-dom';
import { NavigationGroup as NavGroup } from '../config/navigationGroups';

interface NavigationGroupProps {
  group: NavGroup;
}

export function NavigationGroup({ group }: NavigationGroupProps) {
  return (
    <div className="py-2">
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {group.label}
      </h3>
      <div className="space-y-1">
        {group.items.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}