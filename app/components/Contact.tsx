"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { HiOutlineMail, HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineGlobeAlt } from "react-icons/hi";
import { SectionDivider } from "./ui/SectionDivider";
import emailjs from '@emailjs/browser';
import { FormEvent, useState, useEffect } from 'react';
import { emailConfig } from '../lib/emailjs';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: HiOutlineMail,
    title: "Email Us",
    description: "Our friendly team is here to help.",
    detail: "contact@asvarainnovations.com",
    link: "mailto:contact@asvarainnovations.com",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 6pm.",
    detail: "+91 (800) 123-4567",
    link: "tel:+918001234567",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Visit Us",
    description: "Come say hello at our office.",
    detail: "Mumbai, Maharashtra 400001",
    link: "https://maps.google.com",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Global Support",
    description: "24/7 support worldwide.",
    detail: "Available in 10+ countries",
    link: "#support",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    
    try {
      const response = await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        form,
        emailConfig.publicKey
      );

      if (response.status === 200) {
        toast.success('Message sent successfully! We will get back to you soon.', {
          position: 'top-right',
          duration: 5000,
        });
        form.reset();
      }
    } catch (error: unknown) {
      console.error('Email error:', error);
      toast.error((error as Error)?.message || 'Sorry, something went wrong. Please try again later.', {
        position: 'top-right',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Section Dividers */}
      <SectionDivider type="top" from="from-[#0A0F1C]" to="to-gray-900" className="z-10" />

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
            Get in{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our AI solutions? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full shadow-lg shadow-accent/25 hover:shadow-accent/30 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg p-8 border border-white/10 hover:border-accent/30 transition-all flex flex-col justify-between h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 h-full flex flex-col">
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mb-2 text-sm text-gray-400">{item.description}</p>
                  </div>
                  <p className="text-accent font-medium mt-auto">{item.detail}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 