"use client";
import { motion } from "framer-motion";

export type ContactInfo = {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  link: string;
};

interface ContactInfoGridProps {
  contactInfo: ContactInfo[];
}

export default function ContactInfoGrid({ contactInfo }: ContactInfoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contactInfo.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * index }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent">
            <info.icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">{info.title}</h3>
          <p className="mb-2 text-sm text-gray-400">{info.description}</p>
          <a href={info.link} className="text-accent font-medium">
            {info.detail}
          </a>
        </motion.div>
      ))}
    </div>
  );
} 