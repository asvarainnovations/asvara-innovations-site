"use client";
import { Brain, FileX2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemSolutionSection() {
  return (
    <section className="relative w-full pt-0 pb-20 px-4 bg-black/90">
      <div className="max-w-5xl mx-auto rounded-3xl border border-[#222c3c] bg-[#181c24]/80 backdrop-blur-xl shadow-xl px-16 py-12 md:py-16 flex flex-col md:flex-row gap-3 items-stretch">
        {/* Problem Column */}
        <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} transition={{duration:0.7}} viewport={{once:true}} className="flex-1 flex flex-col items-start gap-4 z-20 pr-0 md:pr-10 justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#007BFF22] drop-shadow-[0_0_16px_#007BFF55]">
              <AlertTriangle className="w-9 h-9 text-[#007BFF] drop-shadow-[0_0_8px_#007BFF88]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">The Problem</h2>
          </div>
          <p className="text-white text-lg md:text-xl max-w-md font-medium">
            Legal teams struggle with outdated research tools, scattered case law, and manual drafting. This leads to inefficiency, missed precedents, and increased workload.
          </p>
        </motion.div>
        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-600/30 to-transparent my-6" />
        {/* Solution Column */}
        <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} transition={{duration:0.7, delay:0.2}} viewport={{once:true}} className="flex-1 flex flex-col items-start gap-4 z-20 pl-0 md:pl-10 justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#007BFF22] drop-shadow-[0_0_16px_#007BFF55]">
              <Brain className="w-9 h-9 text-[#007BFF]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#007BFF]">Our Solution</h2>
          </div>
          <p className="text-gray-200 text-lg md:text-xl max-w-md font-medium">
            Asvara's AI platform ingests statutes and judgments, delivers instant semantic search, and auto-generates draft documents with citations—empowering legal teams to work smarter and faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 