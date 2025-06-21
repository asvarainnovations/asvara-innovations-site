"use client";

import { Brain, FileX2, AlertTriangle, BrainCircuit, Scale, TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemSolutionSection() {
  return (
    <section className="relative w-full -mt-12 pt-0 pb-20 px-4 bg-black/90">
      <div className="max-w-6xl mx-auto rounded-3xl border border-[#222c3c] bg-[#181c24]/80 backdrop-blur-xl shadow-xl px-6 md:px-16 py-12 md:py-16 flex flex-col md:flex-row gap-3 items-stretch">
        {/* Problem Column */}
        <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} transition={{duration:0.7}} viewport={{once:true}} className="flex-1 flex flex-col items-start gap-4 z-20 pr-0 md:pr-10 justify-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#007BFF22] drop-shadow-[0_0_16px_#007BFF55]">
              <Scale className="w-9 h-9 text-[#007BFF] drop-shadow-[0_0_8px_#007BFF88]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">The Problem</h2>
          </div>
          <p className="text-white text-lg md:text-xl max-w-md font-medium">
            Legal research in India is a bottleneck, plagued by slow, fragmented tools and scattered data. This forces legal professionals to waste valuable time on manual searches instead of building winning strategies.
          </p>
        </motion.div>
        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-600/30 to-transparent my-6" />
        {/* Solution Column */}
        <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} transition={{duration:0.7, delay:0.2}} viewport={{once:true}} className="flex-1 flex flex-col items-start gap-4 z-20 pl-0 md:pl-10 justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#007BFF22] drop-shadow-[0_0_16px_#007BFF55]">
              <BrainCircuit className="w-9 h-9 text-[#007BFF]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#007BFF]">Our Solution</h2>
          </div>
          <p className="text-gray-200 text-lg md:text-xl max-w-md font-medium">
            Asvara's AI tools—PleadSmart, DocBare, and AI Court Room—make legal research, drafting, and analysis fast and effortless. Our platform finds relevant judgments, reviews documents, and simulates court scenarios, so legal teams can focus on strategy, not paperwork.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 