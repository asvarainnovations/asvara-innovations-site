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

interface BusinessPlanProps {
  plan: Plan;
}

export default function BusinessPlan({ plan }: BusinessPlanProps) {
  return (
    <section className="mt-24">
      <h2 className="text-2xl font-bold text-white text-center mb-12 tracking-wide">For Business</h2>
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl">
          <PlanCard plan={plan} index={0} minHeight={420} onSubscribe={() => {}} />
        </div>
      </div>
    </section>
  );
} 