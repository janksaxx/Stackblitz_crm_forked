import { DollarSign, BarChart2, Target, Trophy } from 'lucide-react';
import { useOpportunityMetrics } from '../hooks/useOpportunityMetrics';
import { formatCurrency } from '../../../lib/utils';

export function OpportunityMetrics() {
  const metrics = useOpportunityMetrics();

  const cards = [
    {
      title: 'Total Pipeline Value',
      value: formatCurrency(metrics.totalValue),
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Average Probability',
      value: `${Math.round(metrics.avgProbability)}%`,
      icon: BarChart2,
      color: 'text-blue-600',
    },
    {
      title: 'Open Opportunities',
      value: metrics.openOpportunities,
      icon: Target,
      color: 'text-purple-600',
    },
    {
      title: 'Win Rate',
      value: `${Math.round(metrics.winRate)}%`,
      icon: Trophy,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${card.color} bg-opacity-10`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}