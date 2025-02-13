"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineChip, HiOutlineLightBulb, HiOutlineScale } from "react-icons/hi";
import { SectionDivider } from "./ui/SectionDivider";
import Image from "next/image";

const features = [
  {
    title: "AI Technology",
    description: "Powered by cutting-edge artificial intelligence and machine learning algorithms",
    icon: HiOutlineChip,
  },
  {
    title: "Innovation First",
    description: "Continuously evolving our solutions to stay ahead of industry needs",
    icon: HiOutlineLightBulb,
  },
  {
    title: "Legal Expertise",
    description: "Combining technical excellence with deep legal domain knowledge",
    icon: HiOutlineScale,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Section Dividers */}
      <SectionDivider type="top" from="from-[#0A0F1C]" to="to-gray-900" className="z-10" />
      <SectionDivider from="from-gray-900" to="to-primary" className="z-10" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="absolute right-0 top-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
                Transforming Legal Practice Through{" "}
                <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
                  Innovation
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                At Asvara Innovations, we&apos;re pioneering the future of legal technology. Our AI-powered solutions are designed to streamline legal processes, enhance decision-making, and revolutionize how legal professionals work.
              </p>
            </motion.div>

            {/* Features Grid */}
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
              >
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay" />
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
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-white text-lg font-medium">
                  &ldquo;Transforming the future of legal practice with AI-powered innovation&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 