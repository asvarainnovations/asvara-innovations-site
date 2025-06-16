"use client";
import { CheckCircle, Search, FileText, Bell } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Semantic Legal Search",
    bullets: [
      "Retrieve statutes & judgments in <2 sec",
      "Contextual understanding of legal queries."
    ]
  },
  {
    icon: FileText,
    title: "Automated Draft Generation",
    bullets: [
      "Generate contract drafts & notices instantly",
      "Customize from our clause library."
    ]
  },
  {
    icon: Bell,
    title: "AI Court Simulation",
    bullets: [
      "Simulate court arguments and hearings with AI-driven conversation.",
      "Practice and prepare for real-world legal proceedings."
    ]
  }
];

export default function FeaturesGrid() {
  return (
    <section className="relative w-full py-20 px-4 bg-gradient-to-b from-black via-[#101522] to-black/95">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.7}} viewport={{once:true}} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Key Features & Benefits</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              transition={{duration:0.7, delay:0.1*idx}}
              viewport={{once:true}}
              className="bg-[#181c24]/80 border border-[#222c3c] rounded-2xl p-8 flex flex-col items-center shadow-lg hover:bg-[#232b3a]/90 hover:border-[#007BFF] transition-colors duration-300 group"
            >
              <feature.icon className="w-10 h-10 text-[#007BFF] mb-4 group-hover:animate-pulse" />
              <h3 className="text-white text-xl font-semibold mb-4 text-center">{feature.title}</h3>
              <ul className="space-y-3 w-full">
                {feature.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{opacity:0, x:-10}}
                    whileInView={{opacity:1, x:0}}
                    transition={{duration:0.5, delay:0.2 + i*0.1}}
                    viewport={{once:true}}
                    className="flex items-start gap-2 text-[1.08rem] text-gray-200"
                  >
                    <CheckCircle className="w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 