"use client";
export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, Brain, BookOpen, Clock, ChevronDown, ChevronUp, Sparkles, Briefcase, TrendingUp } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import Footer from "../components/Footer";
import axios from '@/lib/axios';

const culturePoints = [
  { icon: <Sparkles className="w-5 h-5 text-[#2979FF] mr-2" />, text: "Innovative AI R&D" },
  { icon: <Users className="w-5 h-5 text-[#2979FF] mr-2" />, text: "Collaborative, flat org" },
  { icon: <BookOpen className="w-5 h-5 text-[#2979FF] mr-2" />, text: "Continuous learning stipend" },
  { icon: <Clock className="w-5 h-5 text-[#2979FF] mr-2" />, text: "Flexible work & growth" },
];

const positions = [
  "Any",
  "ML Engineer",
  "Frontend Engineer",
  "Legal Researcher",
  "DevOps",
  "Marketing",
  "Product Manager",
  "QA Engineer",
  "Content Writer",
  "Other"
];

// Add FormState type above initialForm
type FormState = {
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  portfolio: string;
  resume: File | null;
  cover: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  position: "Any",
  linkedin: "",
  portfolio: "",
  resume: null,
  cover: "",
};

const formSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  phone: z.string().min(1, "Phone number is required."),
  position: z.string(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  resume: z
    .instanceof(File)
    .refine(
      (file) =>
        file && [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      { message: "PDF or DOC only." }
    ),
  cover: z.string().optional(),
});

export default function CareersPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: type === "file" ? files && files[0] : value }));
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      // Prepare FormData for multipart/form-data POST
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('position', form.position);
      formData.append('linkedin', form.linkedin);
      formData.append('portfolio', form.portfolio);
      formData.append('cover', form.cover);
      if (form.resume) formData.append('resume', form.resume);

      const res = await axios.post('/api/careers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = res.data;
      setSubmitting(false);
      if (!res.status || res.status >= 400 || data?.error) {
        toast.error(data?.error || 'Submission failed.');
        return;
      }
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err: any) {
      setSubmitting(false);
      if (err.response?.data?.error) toast.error(err.response.data.error);
      else toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0E0E10] text-[#F5F5F5] relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[44vh] px-4 overflow-hidden" style={{background: "linear-gradient(135deg, #181C2A 0%, #23233a 100%)"}}>
        {/* SVG Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
            <path fill="#0E0E10" d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" />
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center py-12 md:py-20 w-full">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-[2.5rem] md:text-5xl font-extrabold tracking-tight mb-2">
            Join the <span className="text-[#2979FF]">Asvara</span> Team
          </motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.2}} className="mt-2 text-lg md:text-xl text-[#A6A6A6] max-w-xl">
            Build the future of legal‑tech with us.
          </motion.p>
        </div>
      </section>

      {/* Why Asvara */}
      <section className="w-full flex justify-center items-center py-12 md:py-20 px-4 bg-transparent">
        <motion.div initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.7, ease:'easeInOut'}} viewport={{once:true}} className="max-w-3xl w-full flex justify-center">
          {/* Large, visually prominent card with bullet points only */}
          <div className="bg-[#18181b] rounded-2xl shadow-lg border border-[#23233a] p-10 md:p-16 flex flex-col gap-8 w-full max-w-2xl items-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-center">Why Asvara?</h2>
            <ul className="space-y-6 w-full">
              {culturePoints.map((pt, i) => (
                <li key={i} className="flex items-center text-lg md:text-xl font-medium w-full justify-center md:justify-start">
                  <span className="mr-3">{pt.icon}</span>
                  <span className="text-[#F5F5F5]">{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Open Roles / Message */}
      <section className="py-16 md:py-20 px-4 flex flex-col items-center">
        <h2 className="text-[1.5rem] font-semibold mb-6 text-center">Open Roles</h2>
        <p className="text-[#A6A6A6] text-center max-w-xl mb-2">We're always looking for talented people—submit your info below.</p>
      </section>

      {/* Application Form */}
      <section className="flex flex-col items-center py-16 md:py-20 px-4">
        <motion.form 
          className="w-full max-w-xl bg-[#121217] border border-[#A6A6A6]/30 rounded-xl p-8 md:p-10 flex flex-col gap-4 shadow-lg relative"
          initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.1}}
          onSubmit={handleSubmit}
          style={{minHeight: 420}}
        >
          <AnimatePresence>
          {!submitted ? <>
            <h3 className="text-xl font-bold mb-2 text-center">Universal Application</h3>
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="name">Full Name *</label>
                <input
                  className={`w-full bg-[#18181b] border ${errors.name && touched.name ? 'border-red-500' : 'border-[#A6A6A6]/30'} rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6]`}
                  type="text" name="name" id="name" autoComplete="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your full name" required aria-invalid={!!errors.name}
                />
                <div className="h-5 mt-1 text-xs">
                  {touched.name && errors.name ? <span className="text-red-500">{errors.name}</span> : <span className="text-[#A6A6A6]">&nbsp;</span>}
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="email">Email Address *</label>
                <input
                  className={`w-full bg-[#18181b] border ${errors.email && touched.email ? 'border-red-500' : 'border-[#A6A6A6]/30'} rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6]`}
                  type="email" name="email" id="email" autoComplete="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@email.com" required aria-invalid={!!errors.email}
                />
                <div className="h-5 mt-1 text-xs">
                  {touched.email && errors.email ? <span className="text-red-500">{errors.email}</span> : <span className="text-[#A6A6A6]">&nbsp;</span>}
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="phone">Phone Number</label>
                <input
                  className="w-full bg-[#18181b] border border-[#A6A6A6]/30 rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6]"
                  type="tel" name="phone" id="phone" autoComplete="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="1234567890"
                />
              </div>
              {/* Position */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="position">Position of Interest</label>
                <select
                  className="w-full bg-[#18181b] border border-[#A6A6A6]/30 rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base"
                  name="position" id="position" value={form.position} onChange={handleChange} onBlur={handleBlur}
                >
                  {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* LinkedIn */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="linkedin">LinkedIn Profile</label>
                <input
                  className="w-full bg-[#18181b] border border-[#A6A6A6]/30 rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6]"
                  type="url" name="linkedin" id="linkedin" autoComplete="url" value={form.linkedin} onChange={handleChange} onBlur={handleBlur} placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              {/* Portfolio / GitHub */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="portfolio">Portfolio / GitHub</label>
                <input
                  className="w-full bg-[#18181b] border border-[#A6A6A6]/30 rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6]"
                  type="url" name="portfolio" id="portfolio" autoComplete="url" value={form.portfolio} onChange={handleChange} onBlur={handleBlur} placeholder="https://github.com/yourprofile"
                />
              </div>
              {/* Resume Upload */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="resume">Resume (PDF/DOC) *</label>
                <input
                  className={`w-full bg-[#18181b] border ${errors.resume && touched.resume ? 'border-red-500' : 'border-[#A6A6A6]/30'} rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base file:bg-[#2979FF] file:text-white file:font-semibold file:rounded file:px-4 file:py-2 file:border-0`}
                  type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" onChange={handleChange} onBlur={handleBlur} ref={fileInput}
                />
                <div className="h-5 mt-1 text-xs">
                  {touched.resume && errors.resume ? <span className="text-red-500">{errors.resume}</span> : <span className="text-[#A6A6A6]">&nbsp;</span>}
                </div>
              </div>
              {/* Cover Letter */}
              <div>
                <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="cover">Cover Letter</label>
                <textarea
                  className="w-full bg-[#18181b] border border-[#A6A6A6]/30 rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base placeholder-[#A6A6A6] min-h-[96px]"
                  name="cover" id="cover" value={form.cover} onChange={handleChange} onBlur={handleBlur} placeholder="Optional (4–6 lines)"
                  rows={5}
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="mt-6 w-full bg-[#2979FF] text-white font-semibold text-base py-3 rounded-md uppercase tracking-wide shadow transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-[#2979FF] focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:ring-offset-2"
              whileHover={{ scale: 1.03, boxShadow: "0 0 16px #2979FF55" }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </motion.button>
          </> :
          <motion.div
            key="thanks"
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-20}}
            className="flex flex-col items-center justify-center min-h-[320px] h-full w-full py-12 px-4 text-center"
          >
            <CheckCircle className="w-14 h-14 text-[#2979FF] mb-6" />
            <h4 className="text-2xl md:text-3xl font-extrabold mb-2">Thanks, we've received your application!</h4>
            <p className="text-[#A6A6A6] text-lg">Our team will review your info and get in touch soon.</p>
          </motion.div>
          }
          </AnimatePresence>
        </motion.form>
      </section>

      {/* What to Expect */}
      <section className="max-w-xl mx-auto py-10 px-4">
        <div className="bg-[#18181b] border border-[#A6A6A6]/30 rounded-lg p-6">
          <button
            className="flex items-center w-full text-left text-[#F5F5F5] text-base font-semibold focus:outline-none group"
            onClick={() => setAccordionOpen((o) => !o)}
            aria-expanded={accordionOpen}
          >
            <span>What to Expect Next</span>
            {accordionOpen ? <ChevronUp className="ml-auto w-5 h-5 transition-transform group-aria-expanded:rotate-180" /> : <ChevronDown className="ml-auto w-5 h-5 transition-transform" />}
          </button>
          <AnimatePresence>
            {accordionOpen && (
              <motion.ul
                initial={{height:0, opacity:0}}
                animate={{height:'auto', opacity:1}}
                exit={{height:0, opacity:0}}
                transition={{duration:0.3}}
                className="overflow-hidden mt-4 space-y-3 text-[#A6A6A6] text-base"
              >
                <li>1–2 business days: we review your application</li>
                <li>We'll reach out to schedule a chat</li>
                <li>Even if there's no current opening, we'll keep your profile on file</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
} 