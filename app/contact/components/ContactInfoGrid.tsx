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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactInfo.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          viewport={{ once: true }}
          className="bg-white/5 rounded-lg p-6 text-center flex flex-col items-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
        >
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <info.icon className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{info.title}</h3>
          <p className="mb-3 text-sm text-gray-400 flex-grow">{info.description}</p>
          <a href={info.link} className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
            {info.detail}
          </a>
        </motion.div>
      ))}
    </div>
  );
} 