"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineLightBulb, HiOutlineScale, HiOutlineChip } from "react-icons/hi";
import { SectionDivider } from "./ui/SectionDivider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Smart Legal Research",
    description: "AI-powered research assistant that understands context and finds relevant cases instantly.",
    icon: HiOutlineLightBulb,
  },
  {
    title: "Automated Document Analysis",
    description: "Advanced algorithms that review and analyze legal documents with high accuracy.",
    icon: HiOutlineScale,
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights to help make informed decisions and predict case outcomes.",
    icon: HiOutlineChip,
  },
];

export default function About() {
  const router = useRouter();

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background with consistent gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
      </div>

      {/* Translucent overlay */}
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Transforming Legal Practice Through Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We&apos;re revolutionizing the legal industry by combining cutting-edge AI technology 
              with deep legal expertise. Our solutions streamline workflows, enhance decision-making, 
              and deliver superior results for legal professionals.
            </p>

            <div className="grid gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="shadow-lg shadow-accent/25 hover:shadow-accent/30 transition-all"
                onClick={() => router.push('/innovations')}
              >
                Explore
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/about-image.jpg"
                alt="AI-powered legal research"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-20" />
    </section>
  );
} 