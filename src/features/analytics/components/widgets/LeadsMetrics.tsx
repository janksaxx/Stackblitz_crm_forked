import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const metrics = [
  {
    name: 'New Leads',
    value: '245',
    change: '+12.5%',
    trend: 'up',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    trend: 'down',
  },
  {
    name: 'Qualified Leads',
    value: '128',
    change: '+8.2%',
    trend: 'up',
  },
];

export function LeadsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white p-4 rounded-lg">
          <p className="text-sm text-gray-500">{metric.name}</p>
          <p className="text-2xl font-semibold mt-1">{metric.value}</p>
          <div className={`flex items-center mt-1 ${
            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="text-sm ml-1">{metric.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}