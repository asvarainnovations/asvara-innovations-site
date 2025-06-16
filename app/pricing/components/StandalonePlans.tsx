"use client";
import PlanCard from "./PlanCard";

type Plan = {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlight?: boolean;
  contact?: boolean;
  popular?: boolean;
  business?: boolean;
};

interface StandalonePlansProps {
  plans: Plan[];
}

export default function StandalonePlans({ plans }: StandalonePlansProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">Standalone AI Services</h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-24">
        {plans.map((plan, index) => (
          <PlanCard key={plan.name} plan={plan} index={index} onSubscribe={() => {}} />
        ))}
      </div>
    </section>
  );
} 