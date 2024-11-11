import { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { SignupForm } from '../components/SignupForm';
import { PricingPlans } from '../components/PricingPlans';

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<any>(null);

  const handleSignupSubmit = (data: any) => {
    setSignupData(data);
    setStep(2);
  };

  const handlePlanSelect = async (plan: any, isYearly: boolean) => {
    // Combine signup data with plan selection
    const fullSignupData = {
      ...signupData,
      subscription: {
        planId: plan.id,
        isYearly,
        price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
      },
    };

    // TODO: Implement Stripe checkout
    console.log('Processing signup with:', fullSignupData);
  };

  return (
    <AuthLayout>
      {step === 1 ? (
        <SignupForm onSubmit={handleSignupSubmit} />
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Choose your plan</h2>
            <p className="mt-2 text-gray-600">Start with a 3-day free trial</p>
          </div>
          <PricingPlans onSelectPlan={handlePlanSelect} />
        </div>
      )}
    </AuthLayout>
  );
}