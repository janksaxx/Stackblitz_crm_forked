import { useState } from 'react';
import { motion } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  users: number;
  features: Array<{
    name: string;
    included: boolean;
  }>;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 313,
    users: 5,
    features: [
      { name: '5GB Storage', included: true },
      { name: 'Basic CRM Features', included: true },
      { name: 'Email Integration', included: true },
      { name: 'Task Management', included: true },
      { name: 'Basic Reports', included: true }
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 59,
    yearlyPrice: 637,
    users: 10,
    features: [
      { name: '15GB Storage', included: true },
      { name: 'Advanced CRM Features', included: true },
      { name: 'Email & Calendar Sync', included: true },
      { name: 'Custom Workflows', included: true },
      { name: 'Advanced Analytics', included: true }
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 99,
    yearlyPrice: 1069,
    users: 25,
    features: [
      { name: '50GB Storage', included: true },
      { name: 'Full CRM Suite', included: true },
      { name: 'API Access', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Priority Support', included: true }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 199,
    yearlyPrice: 2149,
    users: 50,
    features: [
      { name: 'Unlimited Storage', included: true },
      { name: 'Enterprise Features', included: true },
      { name: 'Dedicated Support', included: true },
      { name: 'Custom Development', included: true },
      { name: 'SLA Guarantee', included: true }
    ]
  }
];

interface PricingPlansProps {
  onSelectPlan: (plan: PricingPlan, isYearly: boolean) => void;
}

export function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Pricing Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Choose your plan
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Start with a 3-day free trial. No credit card required.
        </p>

        {/* Billing Toggle */}
        <div className="relative inline-flex p-1 rounded-full bg-gray-800">
          <button
            onClick={() => setIsYearly(false)}
            className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              !isYearly ? 'text-white bg-indigo-600' : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              isYearly ? 'text-white bg-indigo-600' : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
              Save 10%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl bg-gray-800 border-2 ${
              plan.id === 'professional' 
                ? 'border-indigo-500 shadow-xl shadow-indigo-500/20' 
                : 'border-gray-700'
            }`}
          >
            {plan.id === 'professional' && (
              <div className="absolute -top-5 left-0 right-0 flex justify-center">
                <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-indigo-500 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="ml-2 text-gray-400">/{isYearly ? 'year' : 'month'}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.name}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan, isYearly)}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  plan.id === 'professional'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}