"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMail, HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/lib/emailjs';
import { toast } from 'sonner';
import ContactForm from "./components/ContactForm";
import ContactInfoGrid from "./components/ContactInfoGrid";

const contactInfo = [
  {
    icon: HiOutlineMail,
    title: "Email Us",
    description: "Our friendly team is here to help.",
    detail: "support@asvara.com",
    link: "mailto:support@asvara.com",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    description: "Mon-Fri from 10am to 6pm IST.",
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
    icon: HiOutlineClock,
    title: "Business Hours",
    description: "Indian Standard Time (IST)",
    detail: "10:00 AM - 6:00 PM",
    link: "#",
  },
];

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Billing Question",
  "Feature Request",
  "Partnership Opportunity",
  "Other",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        to_name: "Support Team",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        {
          publicKey: emailConfig.publicKey,
        }
      );

      toast.success("Message sent successfully! We'll get back to you soon.", {
        position: "top-right",
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        subject: subjects[0],
        message: "",
      });
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send message. Please try again later.", {
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#101522] to-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Light beam from top right */}
        <div className="absolute top-0 right-0 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_top_right,_rgba(0,123,255,0.25)_0%,_rgba(255,255,255,0.10)_60%,_transparent_100%)] blur-2xl opacity-80 z-0" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-accent/30 via-blue-700/20 to-transparent rounded-full blur-3xl opacity-60 z-0 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            We're here to help
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our AI solutions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactForm
              isSubmitting={isSubmitting}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              subjects={subjects}
            />
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactInfoGrid contactInfo={contactInfo} />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 