import { Card } from '../ui/Card';
import { Users, Building2, Target, DollarSign } from 'lucide-react';

const stats = [
  {
    name: 'Total Contacts',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
    trend: 'up',
  },
  {
    name: 'Active Deals',
    value: '45',
    change: '+8.2%',
    icon: Target,
    trend: 'up',
  },
  {
    name: 'Revenue',
    value: '$54,234',
    change: '+23.1%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    name: 'Companies',
    value: '182',
    change: '+4.5%',
    icon: Building2,
    trend: 'up',
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="flex items-center">
          <div className="p-3 rounded-lg bg-indigo-50">
            <stat.icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}