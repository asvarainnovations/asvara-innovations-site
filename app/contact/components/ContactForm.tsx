"use client";

import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/lib/emailjs';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Billing Question",
  "Feature Request",
  "Partnership Opportunity",
  "Other",
];

export default function ContactForm() {
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
        to_name: "Asvara Support Team",
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
        { publicKey: emailConfig.publicKey }
      );

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: subjects[0],
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none";

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
            required
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject} className="bg-[#0E0E10] text-white">{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={inputClass}
            required
            placeholder="How can we help you?"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
} 