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

interface ComboPlansProps {
  plans: Plan[];
}

export default function ComboPlans({ plans }: ComboPlansProps) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">Combo Plans</h2>
      <div className="flex flex-col md:flex-row justify-center items-end gap-24">
        {plans.map((plan, index) => (
          <PlanCard key={plan.name} plan={plan} index={index} minHeight={480} onSubscribe={() => {}} />
        ))}
      </div>
    </section>
  );
} 