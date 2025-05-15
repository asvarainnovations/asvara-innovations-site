"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineSearch, HiOutlineDocumentText } from "react-icons/hi";
import { LinkPreview } from "./ui/link-preview";
import { SectionDivider } from "./ui/SectionDivider";
import axiosInstance from '@/lib/axios';

const innovations = [
  {
    title: "PleadSmart (AI Legal Research)",
    description: "AI-powered case research, citation mapping, and legal analytics for professionals.",
    icon: HiOutlineSearch,
    color: "text-blue-500",
    url: "https://pleadsmart.vercel.app/",
    previewImage: "/images/legal-research-preview.png"
  },
  {
    title: "DocBare (Document Analysis)",
    description: "Automated document review, clause comparison, and risk assessment with AI.",
    icon: HiOutlineDocumentText,
    color: "text-green-500",
    url: "https://docbare.vercel.app/",
    previewImage: "/images/document-review-preview.jpg"
  },
  {
    title: "AI Court Room (Simulation)",
    description: "Simulate court arguments and hearings with AI-driven conversation for both parties.",
    icon: HiOutlineSearch,
    color: "text-purple-500",
    url: "https://aicourtroom.vercel.app/",
    previewImage: "/images/ai-courtroom-preview.png"
  },
];

export default function Innovations() {
  const handleClick = async (url: string) => {
    try {
      await axiosInstance.post('/api/log-innovation-click', { url });
    } catch (err) {
      // Optionally handle/log error, but still open the link
      console.error('Failed to log click', err);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="innovations" className="relative py-32 overflow-hidden">
      {/* Section Dividers */}
      <SectionDivider type="top" from="from-primary" to="to-gray-900" className="z-10" />
      <SectionDivider from="from-gray-900" to="to-[#0A0F1C]" className="z-10" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="absolute right-0 top-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
              Innovations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our cutting-edge AI solutions designed to revolutionize legal work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group h-full"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all cursor-pointer h-full flex flex-col"
                onClick={() => handleClick(innovation.url)}
              >
                <div className="h-48 w-full mb-6 rounded-xl overflow-hidden flex items-center justify-center bg-black/10">
                  <img src={innovation.previewImage} alt={innovation.title} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col items-start h-full flex-1">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors mb-6">
                    <innovation.icon className={`h-6 w-6 text-accent`} />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-white mb-4">
                    {innovation.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {innovation.description}
                  </p>
                  <div className="mt-auto">
                    <Button variant="ghost" className="text-accent hover:text-white hover:bg-accent/20">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 