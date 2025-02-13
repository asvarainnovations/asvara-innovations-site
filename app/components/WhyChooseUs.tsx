"use client";

import { motion } from "framer-motion";
import { HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlinePuzzle, HiOutlineChartBar, HiOutlineClock, HiOutlineCash } from "react-icons/hi";

const features = [
  {
    title: "AI-Driven Efficiency",
    description: "Reduce time spent on legal research and document review by up to 70% with our advanced AI algorithms.",
    icon: HiOutlineLightningBolt,
    stats: "70% Faster",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Data-Backed Accuracy",
    description: "Make informed decisions with AI insights backed by comprehensive legal databases and precedents.",
    icon: HiOutlineShieldCheck,
    stats: "99.9% Accurate",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate our solutions with your existing legal databases and workflow systems.",
    icon: HiOutlinePuzzle,
    stats: "100+ Integrations",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    title: "Performance Analytics",
    description: "Track and analyze your legal team's performance with detailed analytics and insights.",
    icon: HiOutlineChartBar,
    stats: "Real-time Metrics",
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    title: "24/7 Availability",
    description: "Access your legal tools and resources anytime, anywhere with our cloud-based platform.",
    icon: HiOutlineClock,
    stats: "Always Available",
    color: "from-red-500/20 to-red-600/20",
  },
  {
    title: "Cost Effective",
    description: "Reduce operational costs while improving the quality and speed of legal work.",
    icon: HiOutlineCash,
    stats: "60% Cost Savings",
    color: "from-teal-500/20 to-teal-600/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-32 overflow-hidden">
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
            Why Choose{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
              Asvara Innovations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of legal technology with our innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative z-10 h-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-colors">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-accent font-semibold">{feature.stats}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 