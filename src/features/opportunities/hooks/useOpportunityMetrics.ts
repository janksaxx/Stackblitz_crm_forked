import { useMemo } from 'react';
import { useOpportunityStore } from '../stores/opportunityStore';

export function useOpportunityMetrics() {
  const { opportunities } = useOpportunityStore();

  return useMemo(() => {
    const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
    const avgProbability = opportunities.reduce((sum, opp) => sum + opp.probability, 0) / opportunities.length;
    const openOpportunities = opportunities.filter(opp => !['closed_won', 'closed_lost'].includes(opp.stage));
    const wonOpportunities = opportunities.filter(opp => opp.stage === 'closed_won');
    
    const winRate = wonOpportunities.length / opportunities.length * 100;

    return {
      totalValue,
      avgProbability,
      openOpportunities: openOpportunities.length,
      wonOpportunities: wonOpportunities.length,
      winRate
    };
  }, [opportunities]);
}