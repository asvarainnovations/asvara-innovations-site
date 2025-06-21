"use client";

import { motion } from "framer-motion";
import { Briefcase, Code, Brain, Palette, TrendingUp, Users } from "lucide-react";
import Link from 'next/link';

const jobOpenings = [
  {
    title: "AI/ML Engineer",
    location: "Remote",
    description: "Develop and implement advanced machine learning models to power our legal AI suite.",
    icon: Brain,
    applyLink: "mailto:careers@asvara.co?subject=Application for AI/ML Engineer"
  },
  {
    title: "Full-Stack Developer",
    location: "Remote",
    description: "Build, test, and deploy new features across our entire platform, from database to UI.",
    icon: Code,
    applyLink: "mailto:careers@asvara.co?subject=Application for Full-Stack Developer"
  },
  {
    title: "UX/UI Designer",
    location: "Remote",
    description: "Design intuitive, user-centric interfaces and experiences for our cutting-edge legal tools.",
    icon: Palette,
    applyLink: "mailto:careers@asvara.co?subject=Application for UX/UI Designer"
  },
];

const perks = [
    {
        title: "Innovation Driven",
        description: "Work on cutting-edge problems at the intersection of AI and law.",
        icon: TrendingUp,
    },
    {
        title: "Collaborative Team",
        description: "Join a passionate and supportive team dedicated to a shared mission.",
        icon: Users,
    },
    {
        title: "Remote First",
        description: "We trust you to do your best work, wherever you are.",
        icon: Briefcase,
    }
]

const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
);

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0E0E10] text-[#F5F5F5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/gavel.svg')] bg-repeat bg-center"></div>
      
      <div className="relative z-10">
        {/* 1. Hero Section */}
        <SectionWrapper className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join Our Mission
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mt-4 max-w-2xl text-[#A6A6A6]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We're building the future of legal technology, one line of code at a time. If you're passionate about innovation and ready to make an impact, you're in the right place.
          </motion.p>
        </SectionWrapper>

        {/* 2. Open Positions */}
        <SectionWrapper className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-[2rem] font-semibold text-[#F5F5F5] text-center mb-12">Open Positions</h2>
                <div className="space-y-6">
                    {jobOpenings.map((job, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-white/10 hover:border-blue-500"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                           <div className="flex items-start gap-4">
                                <job.icon className="w-8 h-8 text-blue-400 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold text-[#F5F5F5]">{job.title}</h3>
                                    <p className="text-[#A6A6A6]">{job.location}</p>
                                    <p className="text-[#A6A6A6] mt-2 max-w-lg">{job.description}</p>
                                </div>
                           </div>
                           <Link href={job.applyLink} passHref>
                             <motion.button 
                                className="bg-blue-500 text-white font-bold text-sm py-2 px-6 rounded-full whitespace-nowrap transition-colors hover:bg-blue-600 self-end md:self-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Apply Now
                              </motion.button>
                           </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>

        {/* 3. Why Work With Us */}
        <SectionWrapper className="py-20 md:py-28 bg-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-[2rem] font-semibold text-[#F5F5F5] text-center mb-12">Why Join Asvara?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {perks.map((perk, index) => (
                <div key={index} className="flex flex-col items-center p-6">
                  <perk.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{perk.title}</h3>
                  <p className="text-[#A6A6A6]">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

      </div>
    </main>
  );
} 