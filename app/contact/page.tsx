"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./components/ContactForm";
import ContactInfoGrid from "./components/ContactInfoGrid";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our friendly team is here to help.",
    detail: "support@asvara.co",
    link: "mailto:support@asvara.co",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 10am to 6pm IST.",
    detail: "+91 (800) 123-4567",
    link: "tel:+918001234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office.",
    detail: "Mumbai, Maharashtra 400001",
    link: "https://maps.google.com/?q=Mumbai,Maharashtra,400001",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Indian Standard Time (IST)",
    detail: "10:00 AM - 6:00 PM",
    link: "#",
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


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0E0E10] text-[#F5F5F5] overflow-x-hidden">
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
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mt-4 max-w-2xl text-[#A6A6A6]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Have questions about our AI solutions, pricing, or anything else? We'd love to hear from you.
          </motion.p>
        </SectionWrapper>

        {/* Contact Info Section */}
        {/* <SectionWrapper className="py-10 md:py-20">
            <div className="max-w-6xl mx-auto px-6">
                <ContactInfoGrid contactInfo={contactInfo} />
            </div>
        </SectionWrapper> */}

        {/* Contact Form Section */}
        <SectionWrapper className="pb-20 md:pb-28">
            <div className="max-w-3xl mx-auto px-6">
                <ContactForm />
            </div>
        </SectionWrapper>
      </div>
    </main>
  );
} 