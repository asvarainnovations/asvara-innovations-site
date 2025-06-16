"use client";
import { Database, Search, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Database,
    title: "Data Ingestion & Indexing",
    text: "Easily upload your legal documents, statutes, and judgments in one place."
  },
  {
    icon: Search,
    title: "Intelligent Retrieval",
    text: "Ask any legal question and instantly find the most relevant laws or cases."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Drafting",
    text: "Get first-draft contracts, opinions, or summaries created for you in seconds."
  },
  {
    icon: Users,
    title: "Review & Collaborate",
    text: "Work together with your team to edit, comment, and finalize your documents."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="relative w-full py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.7}} viewport={{once:true}} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">How It Works</motion.h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              transition={{duration:0.7, delay:0.1*idx}}
              viewport={{once:true}}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <div className="flex flex-col items-center mb-6">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#007BFF22] drop-shadow-[0_0_16px_#007BFF55] mb-4 transition-transform duration-300 hover:scale-110">
                  <step.icon className="w-9 h-9 text-[#007BFF]" />
                </span>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-base">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 