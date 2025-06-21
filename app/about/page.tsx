"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BrainCircuit, Gavel, ArrowDown } from "lucide-react";
import Link from 'next/link';

const team = [
  {
    name: "Rajat Balyan",
    role: "Co-Founder & CTO",
    bio: "Legal tech visionary with a passion for AI-driven solutions.",
    image: "/images/team-placeholder.png",
    linkedin: "#",
    isFounder: true,
  },
  {
    name: "Sajal Anand",
    role: "Co-Founder & CLO",
    bio: "AI architect and full-stack developer focused on legal innovation.",
    image: "/images/team-placeholder.png",
    linkedin: "#",
    isFounder: true,
  },
];

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0E0E10] text-[#F5F5F5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/gavel.svg')] bg-repeat bg-center"></div>
      
      <div className="relative z-10">
        {/* 1. Hero Section */}
        <SectionWrapper className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-6xl md:text-[4rem] font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            About Asvara
          </motion.h1>
          <motion.p 
            className="text-xl md:text-[1.5rem] mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="pb-1 border-b-2 border-blue-500">
              Empowering Smarter Legal Workflows
            </span>
          </motion.p>
        </SectionWrapper>

        {/* 2. Company Mission & Overview */}
        <SectionWrapper className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-3xl md:text-[2rem] font-semibold text-[#F5F5F5] mb-6">Who We Are</h2>
              <p className="text-[1rem] text-[#A6A6A6] leading-[1.6] mb-4">
                Asvara is a legal AI company building cutting-edge tools for faster, smarter legal research and document intelligence.
              </p>
              <p className="text-[1rem] text-[#A6A6A6] leading-[1.6]">
                Our mission is to empower law firms, legal professionals, and enterprises with AI systems that drastically reduce the time spent on case analysis, precedent discovery, and compliance review.
              </p>
              <div className="mt-12 text-center md:text-left">
                  <ArrowDown className="w-8 h-8 text-gray-600 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-center h-80">
              <motion.div className="relative w-64 h-64">
                <motion.div 
                  className="absolute top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BrainCircuit className="w-24 h-24 text-blue-400" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gavel className="w-12 h-12 text-gray-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* 3. Our Motto */}
        <SectionWrapper>
          <motion.div 
            className="bg-blue-500 py-8 text-center"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h2 className="text-xl md:text-[1.25rem] font-semibold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Legal Eagle On Board — A Good Lawyer in Your Team
            </h2>
          </motion.div>
        </SectionWrapper>

        {/* 5. Team Members Section */}
        <SectionWrapper className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-[2rem] font-semibold text-[#F5F5F5] text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {team.map((member) => (
                <motion.div 
                  key={member.name}
                  className="flex flex-col items-center text-center group"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative w-32 h-32">
                    {member.isFounder && (
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-700/50 rounded-t-full blur-md group-hover:opacity-80 transition-opacity"></div>
                    )}
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={128} 
                      height={128} 
                      className="rounded-full object-cover w-32 h-32 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 shadow-lg"
                      aria-label={`Portrait of ${member.name}`}
                    />
                  </div>
                  <h3 className="text-lg md:text-[1.25rem] font-bold text-[#F5F5F5] mt-6 mb-1">{member.name}</h3>
                  <p className="text-sm md:text-[0.9rem] text-[#A6A6A6] font-medium mb-2">{member.role}</p>
                  <p className="text-xs md:text-[0.875rem] text-[#A6A6A6] max-w-xs">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 6. Footer CTA */}
        <SectionWrapper className="pb-20 pt-10 text-center">
          <h2 className="text-xl md:text-[1.25rem] font-semibold text-[#F5F5F5] mb-6">Want to Join Our Team?</h2>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link href="/careers" passHref>
              <motion.button 
                className="bg-blue-500 text-white font-bold uppercase text-[0.875rem] py-3 px-8 rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View career opportunities"
              >
                View Careers
              </motion.button>
            </Link>
          </motion.div>
        </SectionWrapper>
      </div>
    </main>
  );
} 