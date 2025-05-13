"use client";

import Image from "next/image";
import { BeakerIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface TransformingProps {
  startAnimation?: boolean;
}

export default function Transforming({ startAnimation = false }: TransformingProps) {
  const features = [
    {
      title: "Smart Legal Research",
      description: "AI-powered research assistant that understands context and finds relevant cases instantly.",
      icon: BeakerIcon,
    },
    {
      title: "Automated Document Analysis",
      description: "Advanced algorithms that review and analyze legal documents with high accuracy.",
      icon: DocumentTextIcon,
    },
    {
      title: "Predictive Analytics",
      description: "Data-driven insights to help make informed decisions and predict case outcomes.",
      icon: ChartBarIcon,
    },
  ];

  return (
    <AnimatePresence>
      {startAnimation && (
        <motion.section 
          className="relative bg-black py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Dot pattern background */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          
          {/* Creative floating element */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 -top-12 w-24 h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff08] to-[#ffffff03] rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-b from-[#ffffff05] to-transparent rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-4 border border-[#ffffff10] rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:4px_4px] opacity-30 rounded-full" />
          </motion.div>

          {/* Gradient connector */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
              {/* Left Content - Takes 3 columns */}
              <motion.div 
                className="lg:col-span-3 space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <h2 className="text-5xl font-bold text-white">
                    Transforming
                  </h2>
                  <p className="text-2xl text-gray-300">
                    Practice Through Innovation
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-gray-400 leading-relaxed max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  Cutting-edge. We're revolutionizing the legal industry by combining cutting-edge AI technology with deep legal expertise. Our solutions streamline workflows, enhance decision-making, and deliver superior results for legal professionals! solutions empowering legal professionals, law firms, and enterprises to work smarter and achieve more
                </motion.p>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="bg-gray-800/50 p-2 rounded-lg">
                        <feature.icon className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-white font-semibold">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  className="mt-6 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  Explore
                </motion.button>
              </motion.div>

              {/* Right Image - Takes 1 column */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/ai-justice.svg"
                    alt="AI Justice"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
