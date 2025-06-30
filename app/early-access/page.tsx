"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { emailConfigEA } from "@/lib/emailjs";
import emailjs from "@emailjs/browser";

const benefits = [
  {
    icon: CalendarDaysIcon,
    title: "Priority Onboarding",
    desc: "Jump the line & go live first.",
  },
  {
    icon: SparklesIcon,
    title: "Exclusive Features",
    desc: "Access beta-only tools & insights.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Founders' Feedback",
    desc: "Shape the product with your input.",
  },
];

const roles = ["Lawyer", "In‑House Counsel", "Student", "Other"];

const faqs = [
  {
    q: "When will I receive my invite?",
    a: "We review applications weekly and send invites on a rolling basis. Watch your inbox!",
  },
  {
    q: "Is there any cost in beta?",
    a: "No, early access is free. We want your feedback, not your wallet.",
  },
  {
    q: "Can I request specific features?",
    a: "Absolutely! We love building with our users. Share your ideas in the form or during onboarding.",
  },
  {
    q: "How will I know if I'm selected?",
    a: "You'll get an email from us with next steps and your access link.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use industry-standard security and never share your data without consent.",
  },
  {
    q: "Can I invite my team?",
    a: "Team invites are coming soon! For now, each person should apply individually.",
  },
];

const testimonials = [
  {
    quote: "Asvara's AI tools are a game-changer for legal research.",
    author: "Adv. Priya S.",
  },
  {
    quote: "The onboarding was smooth and the team is super responsive.",
    author: "Rohit M., In-house Counsel",
  },
  {
    quote: "I love being able to shape the product as a beta user!",
    author: "Simran K., Law Student",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EarlyAccessPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    role: "Lawyer",
    useCase: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [sendError, setSendError] = useState("");

  function validate() {
    const errs: any = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSendError("");
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        await emailjs.send(
          emailConfigEA.serviceId,
          emailConfigEA.templateId,
          {
            name: form.name,
            email: form.email,
            org: form.org,
            role: form.role,
            useCase: form.useCase,
          },
          emailConfigEA.publicKey
        );
        setLoading(false);
        setSubmitted(true);
      }
    } catch (err) {
      setLoading(false);
      setSendError("Something went wrong. Please try again or email us directly at asvarainnovation@gmail.com.");
    }
  }

  return (
    <div className="bg-[#0E0E10] min-h-screen text-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[50vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#2979FF]/60 via-[#121217]/80 to-[#0E0E10] animate-gradient-x" />
        </motion.div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Get Early Access</h1>
          <h2 className="text-xl md:text-2xl font-medium mb-2">Be the first to experience AI‑powered legal intelligence.</h2>
          <p className="text-[#A6A6A6] text-lg">Limited spots—reserve yours today.</p>
        </div>
      </section>

      {/* Benefits Snapshot */}
      <section className="container mx-auto max-w-5xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={b.title} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-[#2979FF] bg-white mb-4">
                <b.icon className="w-8 h-8 text-[#2979FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{b.title}</h3>
              <p className="text-[#A6A6A6] text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access Form */}
      <section className="flex justify-center py-16 px-4">
        <Card className="w-full max-w-xl bg-[#121217] border border-[#A6A6A6]/40 p-8 rounded-2xl shadow-lg">
          <AnimatePresence>
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                <div>
                  <label className="block text-xs font-medium uppercase mb-2 tracking-wider text-[#A6A6A6]">Name *</label>
                  <input
                    type="text"
                    className={classNames(
                      "w-full px-4 py-3 rounded-lg bg-[#18181B] border border-[#23232A] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all",
                      errors.name && "border-[#A6A6A6] text-[#A6A6A6]"
                    )}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  {errors.name && <div className="text-[#A6A6A6] text-xs mt-1">{errors.name}</div>}
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase mb-2 tracking-wider text-[#A6A6A6]">Email *</label>
                  <input
                    type="email"
                    className={classNames(
                      "w-full px-4 py-3 rounded-lg bg-[#18181B] border border-[#23232A] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all",
                      errors.email && "border-[#A6A6A6] text-[#A6A6A6]"
                    )}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                  {errors.email && <div className="text-[#A6A6A6] text-xs mt-1">{errors.email}</div>}
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase mb-2 tracking-wider text-[#A6A6A6]">Organization</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-[#18181B] border border-[#23232A] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all"
                    value={form.org}
                    onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase mb-2 tracking-wider text-[#A6A6A6]">Role</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-[#18181B] border border-[#23232A] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all"
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  >
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase mb-2 tracking-wider text-[#A6A6A6]">Use Case</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[#18181B] border border-[#23232A] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-all"
                    placeholder="Tell us briefly how you'll use Asvara"
                    value={form.useCase}
                    onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#2979FF] hover:bg-[#1761c7] text-white font-semibold uppercase py-3 rounded-lg shadow-md hover:shadow-blue-700/40 transition-all text-base tracking-wider mt-2"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Request Early Access"}
                </Button>
                <div className="text-xs text-[#A6A6A6] text-center mt-2">
                  We respect your privacy. We'll never share your data.
                </div>
                {sendError && (
                  <div className="text-xs text-red-400 text-center mt-2">{sendError}</div>
                )}
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold mb-4">Thank you for requesting early access!</h3>
                <p className="text-[#A6A6A6] mb-2">We've received your details and will be in touch soon with next steps.</p>
                <p className="text-[#A6A6A6]">Questions? Email <a href="mailto:support@asvara.ai" className="underline text-[#2979FF]">support@asvara.ai</a></p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </section>

      {/* How It Works */}
      <section className="container mx-auto max-w-3xl py-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#2979FF] bg-white mb-2">
              <PaperAirplaneIcon className="w-8 h-8 text-[#2979FF]" />
            </div>
            <h4 className="text-lg font-semibold mb-1">Apply</h4>
            <p className="text-[#A6A6A6] text-sm mb-2">Fill out the form</p>
          </div>
          <div className="flex items-center justify-center relative w-24 h-8 md:w-32">
            <motion.div
              className="absolute left-0 right-0 top-1/2 h-1 rounded-full"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{
                transform: "translateY(-50%)",
                background: "linear-gradient(90deg, #2979FF 0%, #2979FF80 50%, #2979FF 100%)",
                backgroundSize: "200% 100%",
                height: "4px",
                borderRadius: "9999px",
              }}
            />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-[#2979FF] bg-white mb-2">
              <RocketLaunchIcon className="w-8 h-8 text-[#2979FF]" />
            </div>
            <h4 className="text-lg font-semibold mb-1">Onboard</h4>
            <p className="text-[#A6A6A6] text-sm mb-2">We'll send your access link</p>
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="container mx-auto max-w-2xl py-8 px-4">
        <h3 className="text-2xl font-semibold text-center">FAQs</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border border-[#23232A] rounded-lg bg-[#18181B] overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <span className="text-base font-medium text-[#F5F5F5]">{faq.q}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-[#A6A6A6] transform transition-transform duration-300 ${faqOpen === i ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              <div
                className={`px-6 pb-2 text-[#A6A6A6] text-sm transition-all duration-500 ease-in-out ${faqOpen === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                style={{ overflow: "hidden" }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Contact */}
      {/* <section className="container mx-auto max-w-4xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="bg-[#18181B] border-l-4 border-[#2979FF] p-6 rounded-xl text-[#A6A6A6] italic shadow">
              "{t.quote}"
              <div className="mt-2 not-italic font-semibold text-[#F5F5F5]">— {t.author}</div>
            </blockquote>
          ))}
        </div>
        <div className="text-center text-[#A6A6A6]">
          Questions? Email <a href="mailto:support@asvara.ai" className="underline text-[#2979FF]">support@asvara.ai</a>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
} 