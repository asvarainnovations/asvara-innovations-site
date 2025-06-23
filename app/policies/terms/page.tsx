"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tableOfContents = [
  { id: "definitions", title: "Definitions" },
  { id: "registration", title: "Registration" },
  { id: "account-registration", title: "Account Registration and Security" },
  { id: "license-access", title: "License and Access" },
  { id: "user-content", title: "User Content" },
  { id: "privacy-security", title: "Privacy and Data Security" },
  { id: "intellectual-property", title: "Intellectual Property Rights" },
  { id: "fees-payment", title: "Fees and Payment" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "service-availability", title: "Service Availability" },
  { id: "disclaimer-warranties", title: "Disclaimer of Warranties" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing Law and Jurisdiction" },
  { id: "changes-terms", title: "Changes to Terms" },
  { id: "force-majeure", title: "Force Majeure" },
  { id: "entire-agreement", title: "Entire Agreement" },
  {
    id: "disclaimer-warranties-2",
    title: "Disclaimer of Warranties (AI Services)",
  },
  { id: "dispute-resolution", title: "Dispute Resolution" },
  { id: "paid-accounts", title: "Paid Accounts" },
  { id: "content", title: "Content" },
  { id: "content-violations", title: "Content Violations" },
];

const SidebarTOC = () => {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Card className="sticky-policy-toc bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2 max-h-[60vh] overflow-auto pr-1 custom-scrollbar">
          {tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300 hover:bg-zinc-800/50"
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default function TermsPage() {
  return (

      <div className="min-h-screen bg-zinc-950">
        {/* Hero Title */}
        <section className="bg-zinc-900 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-400 mr-3" />
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100">
                  Terms & Conditions
                </h1>
              </div>
              <div className="flex items-center justify-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span className="italic">
                  Effective Date: June 15, 2025
                </span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Breadcrumb */}
        <div className="bg-zinc-900/50 border-b border-zinc-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <Link
                href="/policies"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Policies
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <span className="text-gray-300">Terms & Conditions</span>
            </nav>
          </div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Sidebar TOC */}
            <div className="lg:col-span-1">
              <SidebarTOC />
            </div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-invert prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-12"
                >
                  {/* Intro */}
                  <div className="text-gray-300 leading-relaxed">
                    <p className="text-xl mb-8">
                      Welcome to Asvara Private Limited ("Asvara," "we," "our," or
                      "us"). These Terms and Conditions ("Terms") govern your
                      access to and use of our legal AI services, including but
                      not limited to PleadSmart, Docbare, and AI Court Room
                      (collectively referred to as the "Services"). Please read
                      them carefully before using the Services.
                    </p>
                    <p className="mb-4">
                      By accessing or using our Services, you confirm that you
                      have read, understood, and agree to be bound by these Terms,
                      as well as our Privacy Policy, which is incorporated by
                      reference. If you do not agree with any of these Terms,
                      please do not access or use our Services.
                    </p>
                  </div>
                  {/* 1. Definitions */}
                  <section id="definitions" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      1. DEFINITIONS
                    </motion.h2>
                    <ul className="text-gray-300 list-disc ml-6 space-y-2">
                      <li>
                        "User" refers to any individual or entity who accesses or
                        uses the Services.
                      </li>
                      <li>
                        "Content" refers to all text, documents, templates, data,
                        information, or material submitted, uploaded, generated,
                        or otherwise made available by you through the Services.
                      </li>
                      <li>
                        "Intellectual Property" means all patents, copyrights,
                        trademarks, trade secrets, and other proprietary rights
                        under applicable laws.
                      </li>
                    </ul>
                  </section>
                  {/* 2. Registration */}
                  <section id="registration" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      2. REGISTRATION
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) By using the Services, you represent and warrant that:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) You are at least 18 years old and capable of forming
                          a binding contract with Asvara;
                        </li>
                        <li>
                          (B) Minimum age. You must be at least 13 years old or
                          the minimum age required in your country to consent to
                          use the Services. If you are under 18 you must have your
                          parent or legal guardian's permission to use the
                          Services.
                        </li>
                        <li>
                          (C) You are not prohibited from using the Services under
                          any applicable law or regulation;
                        </li>
                        <li>
                          (D) You will comply with these Terms and all applicable
                          laws.
                        </li>
                      </ul>
                    </div>
                  </section>
                  {/* 3. Account Registration and Security */}
                  <section id="account-registration" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      3. ACCOUNT REGISTRATION AND SECURITY
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) To access certain features of the Services, you may be
                        required to create an account. You agree to:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Provide accurate, current, and complete information;
                        </li>
                        <li>
                          (B) Maintain the security of your account and password;
                        </li>
                        <li>
                          (C) Notify us immediately of any unauthorized use of
                          your account;
                        </li>
                        <li>
                          (D) Be responsible for all activities that occur under
                          your account.
                        </li>
                      </ul>
                      <p>
                        (2) Registration. You must provide accurate and complete
                        information to register for an account to use our
                        Services. You may not share your account credentials or
                        make your account available to anyone else and are
                        responsible for all activities that occur under your
                        account. If you create an account or use the Services on
                        behalf of another person or entity, you must have the
                        authority to accept these Terms on their behalf.
                      </p>
                      <p>
                        (3) We reserve the right to suspend or terminate accounts
                        that are inactive, inaccurate, or violate these Terms.
                      </p>
                    </div>
                  </section>
                  {/* 4. License and Access */}
                  <section id="license-access" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      4. LICENSE AND ACCESS
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Asvara grants you a limited, non-exclusive,
                        non-transferable, revocable license to access and use the
                        Services for your internal business or personal use,
                        subject to compliance with these Terms.
                      </p>
                      <p>You agree not to:</p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Copy, modify, or distribute any part of the Services
                          without prior written consent;
                        </li>
                        <li>
                          (B) Reverse-engineer, decompile, or disassemble any part
                          of our Services or software;
                        </li>
                        <li>
                          (C) Interfere with or disrupt the integrity or
                          performance of the Services;
                        </li>
                        <li>
                          Use automated scripts or bots to access the Services.
                        </li>
                      </ul>
                    </div>
                  </section>
                  {/* 5. User Content */}
                  <section id="user-content" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      5. USER CONTENT
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) You retain ownership of all documents, data, or
                        information you submit to the Services ("User Content").
                        However, by submitting User Content, you grant Asvara a
                        non-exclusive, worldwide, royalty-free, sublicensable
                        license to use, reproduce, process, and store the User
                        Content solely to provide and improve the Services.
                      </p>
                      <p>(2) You represent and warrant that:</p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) You own or have the necessary rights to submit the
                          User Content;
                        </li>
                        <li>
                          (B) The User Content does not infringe or violate any
                          third-party rights or laws.
                        </li>
                      </ul>
                      <p>
                        (3) We reserve the right (but are not obligated) to remove
                        or restrict any User Content that violates these Terms.
                      </p>
                    </div>
                  </section>
                  {/* 6. Privacy and Data Security */}
                  <section id="privacy-security" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      6. PRIVACY AND DATA SECURITY
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Our Privacy Policy governs the collection, use, and
                        disclosure of personal data. You acknowledge and agree
                        that:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) We may process personal data as described in our
                          Privacy Policy.
                        </li>
                        <li>
                          (B) We implement reasonable security measures to protect
                          your information;
                        </li>
                        <li>
                          (C) You are responsible for safeguarding any credentials
                          and access to your account.
                        </li>
                      </ul>
                    </div>
                  </section>
                  {/* 7. Intellectual Property Rights */}
                  <section id="intellectual-property" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      7. INTELLECTUAL PROPERTY RIGHTS
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) All rights, title, and interest in and to the Services
                        (including underlying software, design, AI models, logos,
                        trademarks, and content created by Asvara) are the
                        exclusive property of Asvara or its licensors.
                      </p>
                      <p>
                        (2) Nothing in these Terms shall be construed as granting
                        any license or right to use any Asvara trademark or
                        intellectual property without express written permission.
                      </p>
                    </div>
                  </section>
                  {/* 8. Fees and Payment */}
                  <section id="fees-payment" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      8. FEES AND PAYMENT
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Some features of the Services may require payment. If
                        you choose to use paid features, you agree to:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>(A) Provide accurate billing information;</li>
                        <li>
                          (B) Authorize us to charge applicable fees to your
                          payment method;
                        </li>
                        <li>(C) Pay all applicable taxes and charges.</li>
                      </ul>
                      <p>
                        Failure to pay may result in suspension or termination of
                        your account.
                      </p>
                    </div>
                  </section>
                  {/* 9. Third-Party Services */}
                  <section id="third-party" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      9. THIRD-PARTY SERVICES
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) The Services may integrate with or contain links to
                        third-party services. We are not responsible for the
                        practices, content, or policies of third-party services,
                        and you use them at your own risk.
                      </p>
                    </div>
                  </section>
                  {/* 10. Confidentiality */}
                  <section id="confidentiality" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      10. CONFIDENTIALITY
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Each party agrees to maintain the confidentiality of
                        confidential information disclosed by the other party.
                        Confidential information shall not include information
                        that:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>(A) Is or becomes public knowledge;</li>
                        <li>(B) Was already known before disclosure;</li>
                        <li>(C) Is disclosed with prior written consent.</li>
                      </ul>
                    </div>
                  </section>
                  {/* 11. Service Availability */}
                  <section id="service-availability" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      11. SERVICE AVAILABILITY
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) We aim to maintain availability of the Services but do
                        not guarantee uninterrupted access. Maintenance, updates,
                        or technical issues may result in temporary
                        unavailability. We are not liable for any loss resulting
                        from unavailability or downtime.
                      </p>
                    </div>
                  </section>
                  {/* 12. Disclaimer of Warranties */}
                  <section id="disclaimer-warranties" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      12. DISCLAIMER OF WARRANTIES
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) The Services are provided "AS IS" and "AS AVAILABLE"
                        without warranties of any kind. Asvara disclaims all
                        warranties, express or implied, including:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Accuracy, reliability, or completeness of results;
                        </li>
                        <li>(B) Fitness for a particular purpose;</li>
                        <li>(C) Non-infringement;</li>
                        <li>
                          (D) That the Services will be uninterrupted or
                          error-free.
                        </li>
                      </ul>
                    </div>
                  </section>
                  {/* 13. Limitation of Liability */}
                  <section id="limitation-liability" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      13. LIMITATION OF LIABILITY
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) To the fullest extent permitted by law, Asvara shall
                        not be liable for:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Indirect, incidental, consequential, special, or
                          punitive damages;
                        </li>
                        <li>(B) Loss of profits, data, business, or goodwill;</li>
                        <li>
                          (C) Any claim arising out of your use of the Services.
                        </li>
                      </ul>
                      <p>
                        (2) Our total liability under any theory of liability is
                        limited to the amount paid by you (if any) in the 12
                        months prior to the claim.
                      </p>
                    </div>
                  </section>
                  {/* 14. Indemnification */}
                  <section id="indemnification" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      14. INDEMNIFICATION
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) You agree to indemnify, defend, and hold harmless
                        Asvara, its officers, directors, employees, and affiliates
                        from and against any claims, losses, damages, or expenses
                        arising from:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>(A) Your use of the Services;</li>
                        <li>(B) Violation of these Terms;</li>
                        <li>(C) Infringement of third-party rights.</li>
                      </ul>
                    </div>
                  </section>
                  {/* 15. Termination */}
                  <section id="termination" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      15. TERMINATION
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) We may suspend or terminate your access to the
                        Services at any time if:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>(A) You breach these Terms;</li>
                        <li>(B) We are required by law to do so;</li>
                        <li>
                          (C) Your account is inactive for an extended period.
                        </li>
                      </ul>
                      <p>
                        (2) Upon termination, your right to use the Services ends
                        immediately. You may request deletion of your account and
                        data.
                      </p>
                    </div>
                  </section>
                  {/* 16. Governing Law and Jurisdiction */}
                  <section id="governing-law" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      16. GOVERNING LAW AND JURISDICTION
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) These Terms shall be governed by and construed in
                        accordance with the laws of India. Any disputes arising
                        out of or in connection with these Terms shall be subject
                        to the exclusive jurisdiction of the courts at the
                        location of the registered office of Asvara Private
                        Limited, India.
                      </p>
                    </div>
                  </section>
                  {/* 17. Changes to Terms */}
                  <section id="changes-terms" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      17. CHANGES TO TERMS
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) We may update these Terms at any time. Changes will be
                        posted on our website. Continued use of the Services after
                        changes constitutes acceptance of the new Terms.
                      </p>
                    </div>
                  </section>
                  {/* 18. Force Majeure */}
                  <section id="force-majeure" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      18. FORCE MAJEURE
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Asvara Private Limited shall not be held liable for
                        any failure or delay in the performance of its obligations
                        under these Terms where such failure or delay is caused by
                        circumstances beyond its reasonable control, including but
                        not limited to:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Acts of God (such as floods, earthquakes, fires, or
                          storms);
                        </li>
                        <li>
                          (B) War, invasion, hostilities (whether declared or
                          not), terrorist threats or acts, civil unrest, or riots;
                        </li>
                        <li>
                          (C) Government restrictions, embargoes, or orders;
                        </li>
                        <li>
                          (D) Pandemic or epidemic outbreaks (including COVID-19
                          or similar events);
                        </li>
                        <li>(E) Labor disputes, strikes, or lockouts;</li>
                        <li>
                          (F) Power outages, internet failures, or
                          telecommunications breakdowns;
                        </li>
                        <li>
                          (G) Failures of third-party service providers or cloud
                          infrastructure not within our control.
                        </li>
                      </ul>
                      <p>
                        (2) In such an event, Asvara shall be excused from
                        performance for the duration of the force majeure
                        condition and shall take all reasonable steps to resume
                        normal operations as soon as practicable.
                      </p>
                      <p>
                        (3) Nothing in this clause shall excuse either party from
                        payment obligations accrued before the force majeure
                        event.
                      </p>
                    </div>
                  </section>
                  {/* 19. Entire Agreement */}
                  <section id="entire-agreement" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      19. ENTIRE AGREEMENT
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) These Terms, along with our Privacy Policy, constitute
                        the entire agreement between you and Asvara concerning
                        your use of the Services and supersede all prior
                        agreements.
                      </p>
                    </div>
                  </section>
                  {/* 20. Disclaimer of Warranties (AI Services) */}
                  <section id="disclaimer-warranties-2" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      20. DISCLAIMER OF WARRANTIES
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) The services provided by asvara private limited,
                        including but not limited to PleadSmart, Docbare, and Ai
                        Court Room, are offered strictly on an "as is" and "as
                        available" basis. To the fullest extent permitted by
                        applicable law, asvara, its affiliates, licensors, and
                        service providers expressly disclaim all warranties of any
                        kind, whether express, implied, statutory, or otherwise,
                        including but not limited to:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>(A) Warranties of merchantability,</li>
                        <li>(B) Fitness for a particular purpose,</li>
                        <li>(C) Non-infringement,</li>
                        <li>(D) Accuracy,</li>
                        <li>(E) Quiet enjoyment,</li>
                        <li>
                          (F) And any warranties arising from course of dealing,
                          usage, or trade practice.
                        </li>
                      </ul>
                      <p>
                        (2) Asvara does not guarantee that the services will be
                        timely, error-free, uninterrupted, or free from security
                        breaches, data loss, or unauthorized access. We do not
                        warrant that the outputs or recommendations generated by
                        our ai systems will be legally sufficient, reliable, or
                        compliant with specific jurisdictional requirements.
                      </p>
                      <p>
                        (3) You understand and agree that any information, draft
                        documents, or legal analysis provided by the services are
                        ai-generated outputs and are to be used as assistive tools
                        only, not as definitive or substitute sources of legal
                        advice. You should always seek independent legal counsel
                        before making decisions based on our services. You accept
                        full responsibility and assume all risks for any use of
                        the service outputs.
                      </p>
                    </div>
                  </section>
                  {/* 21. Dispute Resolution */}
                  <section id="dispute-resolution" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      21. DISPUTE RESOLUTION
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) Before initiating any legal proceeding, you and Asvara
                        Private Limited agree to attempt to resolve any dispute,
                        claim, or controversy arising out of or in connection with
                        these Terms or your use of the Services ("Dispute")
                        through good-faith informal negotiations. You agree to
                        notify us in writing by sending an email to
                        asvarainnovation@gmail.com describing the nature of the
                        issue. We will similarly attempt to resolve the matter by
                        contacting you via the email associated with your account.
                        If the Dispute is not resolved within 90 days of notice,
                        either party may initiate formal proceedings as outlined
                        below.
                      </p>
                      <p>
                        (2) Subject to the exceptions below, you and Asvara agree
                        to resolve any Dispute arising under or in connection with
                        these Terms through final and binding arbitration
                        conducted in accordance with the Arbitration and
                        Conciliation Act, 1996, as amended from time to time.
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) The arbitration shall be conducted by a sole
                          arbitrator mutually appointed by the parties.
                        </li>
                        <li>
                          (B) If parties are unable to agree on the arbitrator,
                          the arbitrator shall be appointed in accordance with the
                          Arbitration and Conciliation Act.
                        </li>
                        <li>
                          (C) The seat and venue of arbitration shall be [Insert
                          City], India, and the proceedings shall be conducted in
                          English.
                        </li>
                        <li>
                          (D) Each party shall bear its own legal costs and share
                          equally in the arbitrator's fees, unless otherwise
                          determined in the final award.
                        </li>
                      </ul>
                      <p>
                        (3) The following claims are excluded from arbitration:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Individual claims filed in small claims court where
                          permitted by applicable law.
                        </li>
                        <li>
                          (B) Claims seeking injunctive or equitable relief to
                          prevent unauthorized use, access, or abuse of our
                          Services or violations of intellectual property rights.
                        </li>
                      </ul>
                      <p>(4) You and Asvara agree that:</p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Any Dispute must be brought in an individual
                          capacity only, and not as a plaintiff or class member in
                          any purported class, collective, or representative
                          action.
                        </li>
                        <li>
                          (B) You expressly waive any right to participate in
                          class arbitrations, class actions, or joint litigations.
                        </li>
                        <li>
                          (C) The arbitrator shall not have the authority to
                          consolidate more than one individual's claims or preside
                          over any form of a representative or class proceeding.
                        </li>
                      </ul>
                      <p>
                        (5) In the event that 25 or more similar claims are filed
                        by or with assistance from the same legal counsel or
                        organization within a 90-day period, Asvara reserves the
                        right to consolidate such matters into batches for
                        streamlined resolution, with shared arbitration costs,
                        subject to mutual agreement or direction by the arbitral
                        institution.
                      </p>
                      <p>
                        (6) If any provision of this Dispute Resolution section is
                        found to be unlawful, void, or for any reason
                        unenforceable, the remaining provisions shall remain in
                        effect. However, if any part of this section is found to
                        prohibit individual arbitration or allow class
                        arbitration, the entire Dispute Resolution section shall
                        be deemed unenforceable.
                      </p>
                    </div>
                  </section>
                  {/* 22. Paid Accounts */}
                  <section id="paid-accounts" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      22. PAID ACCOUNTS
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) If you choose to purchase access to any paid features
                        or subscriptions of our Services (including but not
                        limited to PleadSmart, Docbare, and AI Court Room), you
                        agree to provide accurate, current, and complete billing
                        information, including a valid payment method.
                      </p>
                      <p>
                        (2) You authorize Asvara Private Limited to charge your
                        provided payment method for:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) The full amount of any applicable subscription fees,
                        </li>
                        <li>(B) Service upgrades,</li>
                        <li>(C) Taxes and charges imposed by applicable law.</li>
                      </ul>
                      <p>
                        (2) For recurring subscriptions, your selected payment
                        method will be automatically charged on a periodic basis
                        (e.g., monthly or annually) according to your chosen plan,
                        unless you cancel your subscription in accordance with
                        Clause 22.6 below.
                      </p>
                      <p>
                        (3) Failure to process payment may result in immediate
                        suspension, limitation, or downgrade of your account
                        access, until full payment is received.
                      </p>
                      <p>
                        (4) You are solely responsible for the payment of any
                        applicable goods and services tax (GST), value-added tax
                        (VAT), withholding tax, or other local statutory charges
                        imposed by your jurisdiction. Where required, Asvara will
                        charge applicable taxes and reflect them in your invoice.
                      </p>
                      <p>
                        (5) In certain cases, you may pre-purchase service credits
                        that can be used across our platform. These credits:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Are non-transferable and non-refundable (except
                          where mandated by law),
                        </li>
                        <li>
                          (B) Expire within the validity period specified at the
                          time of purchase,
                        </li>
                        <li>
                          (C) Are subject to Asvara's Service Credit Policy, which
                          may be updated from time to time.
                        </li>
                      </ul>
                      <p>
                        (6) You may cancel your paid subscription at any time via
                        your account settings or by contacting support at
                        asvarainnovation@gmail.com.
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Upon cancellation, you will retain access to paid
                          features until the end of the current billing cycle.
                        </li>
                        <li>
                          (B) No partial refunds will be issued for unused time,
                          except as required under applicable consumer protection
                          laws.
                        </li>
                        <li>
                          (C) This clause does not override any statutory right of
                          refund or cancellation that may apply under your local
                          laws.
                        </li>
                      </ul>
                      <p>
                        (7) Asvara Private Limited reserves the right to modify
                        pricing, subscription tiers, or service plans. If there is
                        a price increase on your current subscription:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) We will notify you at least 30 days in advance by
                          email or dashboard notice,
                        </li>
                        <li>
                          (B) The updated price will apply upon your next billing
                          cycle,
                        </li>
                        <li>
                          (C) You will have the option to cancel before the new
                          pricing takes effect.
                        </li>
                      </ul>
                      <p>
                        (8) Failure to cancel prior to the renewal date will
                        constitute acceptance of the updated pricing.
                      </p>
                    </div>
                  </section>
                  {/* 23. Content */}
                  <section id="content" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      23. CONTENT
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) By using Asvara's Services, including PleadSmart,
                        Docbare, and AI Court Room, you may provide data, queries,
                        documents, prompts, or other material ("Input"), and
                        receive responses, analyses, drafts, summaries, or other
                        data ("Output") generated by the Services. Together, Input
                        and Output are referred to as your "Content."
                      </p>
                      <p>
                        (2) You are solely responsible for your Content,
                        including:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Ensuring that your Input is lawful, accurate, and
                          does not violate any applicable law, regulation, or
                          third-party rights,
                        </li>
                        <li>
                          (B) Having all necessary rights, licenses, and
                          permissions to provide such Input.
                        </li>
                      </ul>
                      <p>
                        (3) You agree not to submit Content that is unlawful,
                        defamatory, infringing, or otherwise inappropriate or
                        abusive in nature.
                      </p>
                      <p>(4) As between you and Asvara:</p>
                      <ul className="list-disc ml-6">
                        <li>(A) You retain full ownership of your Input, and</li>
                        <li>
                          (B) Subject to applicable law, you also own the Output
                          generated specifically in response to your Input.
                        </li>
                      </ul>
                      <p>
                        (5) To the extent that any rights in Output may otherwise
                        vest in Asvara, we hereby assign all right, title, and
                        interest we may have in such Output to you, exclusively
                        and irrevocably.
                      </p>
                      <p>
                        (6) This assignment does not apply to Output received by
                        other users, even if similar or identical, due to the
                        probabilistic and non-deterministic nature of AI
                        generation.
                      </p>
                      <p>
                        (7) Due to the statistical nature of AI and language
                        models:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Outputs generated by our Services may not be unique,
                        </li>
                        <li>
                          (B) Similar or identical responses may be provided to
                          different users based on comparable Inputs,
                        </li>
                        <li>
                          (C) You agree that Asvara does not guarantee exclusivity
                          of Output unless expressly agreed in a separate license
                          or enterprise agreement.
                        </li>
                      </ul>
                      <p>(8) We may use Content internally to:</p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) Deliver and improve the performance, quality, and
                          accuracy of our Services,
                        </li>
                        <li>(B) Maintain technical and legal compliance,</li>
                        <li>
                          (C) Detect misuse, abuse, or violations of our Terms and
                          policies,
                        </li>
                        <li>
                          (D) Conduct internal research and development to refine
                          our AI models (except where you opt out, consider Clause
                          23.10).
                        </li>
                      </ul>
                      <p>
                        (9) Content may be reviewed by our systems or personnel
                        solely for these legitimate purposes and in accordance
                        with our Privacy Policy.
                      </p>
                      <p>
                        (10) If you do not wish for your Content (Input or Output)
                        to be used for improving or training our AI models:
                      </p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) You may opt out by submitting a request to
                          contact@asvarainnovation.com or by managing your
                          preferences through your user account settings.
                        </li>
                        <li>
                          (B) Please note that opting out may limit certain
                          features or personalization capabilities of our
                          Services.
                        </li>
                      </ul>
                      <p>(11) You acknowledge and agree that:</p>
                      <ul className="list-disc ml-6">
                        <li>
                          (A) The Output generated by our AI Services may not
                          always be accurate, complete, current, or appropriate
                          for every situation,
                        </li>
                        <li>
                          (B) Asvara's Services do not constitute legal advice,
                          nor should Output be relied upon as a substitute for
                          independent professional or legal judgment,
                        </li>
                        <li>
                          (C) Human review, legal validation, and professional
                          discretion should be exercised before acting upon any
                          Output.
                        </li>
                        <li>
                          (D) Output should not be used to make legally or
                          materially significant decisions about any individual
                          (e.g., in employment, credit, legal, insurance, or
                          housing contexts),
                        </li>
                        <li>
                          (E) Output may contain incorrect or biased information,
                          or reference third-party products, people, or services.
                          Any such references do not imply endorsement or
                          affiliation with Asvara Private Limited.
                        </li>
                      </ul>
                    </div>
                  </section>
                  {/* 24. Content Violations */}
                  <section id="content-violations" className="scroll-mt-[100px]">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                    >
                      24. CONTENT VIOLATIONS
                    </motion.h2>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        (1) If we determine that your Content violates these
                        Terms, applicable law, or exposes Asvara to legal risk, we
                        reserve the right (but not obligation) to remove or
                        restrict access to such Content, and/or suspend or
                        terminate your account.
                      </p>
                    </div>
                  </section>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer CTA */}
        <section className="bg-zinc-900/50 border-t border-zinc-800 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Questions about these Terms?
            </h3>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Contact Legal Team
            </Button>
          </div>
        </section>
      </div>
  );
}
