"use client";
import { motion } from "framer-motion";

export default function CallToActionBanner() {
  return (
    <section className="relative w-full py-16 px-4 bg-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.h2 initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.7}} viewport={{once:true}} className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Revolutionize Your Legal Workflow?</motion.h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-[#007BFF] text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#339CFF] transition-colors duration-200">
            Start Your 14-Day Free Trial
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#007BFF] hover:text-white transition-colors duration-200">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
} 