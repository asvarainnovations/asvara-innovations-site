"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Clock, Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tableOfContents = [
  { id: "intro", title: "Introduction" },
  { id: "who-we-are", title: "Who We Are" },
  { id: "registration", title: "Registration and Access" },
  { id: "using-services", title: "Using Our Services" },
  { id: "content-ownership", title: "Content and Ownership" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "payment", title: "Payment, Subscriptions, and Credits" },
  { id: "termination", title: "Termination and Suspension" },
  { id: "discontinuation", title: "Discontinuation of Services" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnity", title: "Indemnity" },
  { id: "dispute", title: "Dispute Resolution" },
  { id: "copyright", title: "Copyright Complaints" },
  { id: "general", title: "General Terms" },
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

export default function TermsOfServicePage() {
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
              <Scale className="w-8 h-8 text-green-400 mr-3" />
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100">
                Terms of Service
              </h1>
            </div>
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              <span className="italic">Effective Date: [Insert Date]</span>
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
            <span className="text-gray-300">Terms of Service</span>
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
                {/* Section: Intro */}
                <section id="intro" className="text-gray-300 leading-relaxed scroll-mt-[100px]">
                  <p className="mb-6">
                    Thank you for choosing Asvara. These Terms of Use (“Terms”)
                    apply to your use of Asvara’s legal research tools,
                    AI-powered applications, document services, and related
                    websites or software (collectively, the “Services”). By
                    using our Services, you agree to be bound by these Terms.
                  </p>
                  <p>
                    Our Privacy Policy explains how we handle your personal data
                    and content. While it is not part of these Terms, we
                    encourage you to read it carefully.
                  </p>
                </section>
                {/* Section: Who We Are */}
                <section id="who-we-are" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    1. Who We Are
                  </motion.h2>
                  <p className="text-gray-300">
                    Asvara Private Limited is an Indian legal technology company
                    committed to transforming legal research and litigation
                    workflows using AI. We build tools that assist lawyers,
                    firms, students, and institutions with intelligent legal
                    research, drafting, and argument testing.
                  </p>
                </section>
                {/* Section: Registration and Access */}
                <section id="registration" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    2. Registration and Access
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">2.1 Minimum Age</h3>
                  <p>
                    To access or use the Services provided by Asvara Private
                    Limited (“Asvara”), you must be at least 13 years of age, or
                    the minimum age required by applicable law in your
                    jurisdiction to legally consent to use online services. If
                    you are under the age of 18, you may only use the Services
                    under the supervision and with the consent of a parent or
                    legal guardian who agrees to be bound by these Terms on your
                    behalf.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You meet the minimum age requirement;</li>
                    <li>
                      If under 18, you have obtained parental or guardian
                      consent;
                    </li>
                    <li>
                      You are fully capable of entering into a binding legal
                      agreement.
                    </li>
                  </ul>
                  <p>
                    Asvara reserves the right to request proof of age or
                    parental consent and to suspend or terminate any user
                    account that is in violation of this requirement.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">2.2 Registration</h3>
                  <p>
                    To use certain features of the Services, you may be required
                    to create an account. When registering, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Provide true, accurate, current, and complete information
                      as requested during the sign-up process;
                    </li>
                    <li>
                      Maintain and promptly update your account information to
                      keep it accurate and complete;
                    </li>
                    <li>
                      Keep your login credentials secure and confidential;
                    </li>
                    <li>
                      Not share your account credentials or allow anyone else to
                      access or use your account.
                    </li>
                  </ul>
                  <p>
                    You are solely responsible for all activities that occur
                    under your account, whether or not authorized by you. If you
                    suspect any unauthorized use or security breach, you must
                    notify Asvara immediately at{" "}
                    <a
                      href="mailto:contact@asvarainnovation.com"
                      className="text-green-400 underline"
                    >
                      contact@asvarainnovation.com
                    </a>
                  </p>
                  <p>
                    If you are creating or managing an account on behalf of a
                    company, institution, or another individual, you represent
                    that you have the legal authority to do so and to bind that
                    entity or person to these Terms.
                  </p>
                  <p>
                    Asvara shall not be liable for any loss or damage arising
                    from your failure to comply with these obligations.
                  </p>
                </section>
                {/* Section: Using Our Services */}
                <section id="using-services" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    3. Using Our Services
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">3.1 Permitted Use</h3>
                  <p>
                    Subject to your full and continued compliance with these
                    Terms of Use and any applicable policies, guidelines, or
                    instructions issued by Asvara, we grant you a limited,
                    non-exclusive, non-transferable, and revocable license to
                    access and use our Services solely for lawful personal,
                    professional, educational, or research purposes.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>As intended by the nature of the platform;</li>
                    <li>
                      In a manner that complies with all applicable laws,
                      regulations, and court orders;
                    </li>
                    <li>
                      In accordance with any user manuals, technical
                      documentation, and usage limitations provided by Asvara;
                    </li>
                    <li>
                      Without infringing the intellectual property or rights of
                      others.
                    </li>
                  </ul>
                  <p>
                    Any unauthorized use of the Services constitutes a material
                    breach of these Terms and may result in suspension or
                    termination of your access.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    3.2 Prohibited Use
                  </h3>
                  <p>
                    You agree not to misuse or abuse the Services. Specifically,
                    you shall not, and shall not permit any third party to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Violate any applicable law, regulation, or legal duty
                      (including but not limited to copyright laws, privacy
                      rights, or court orders);
                    </li>
                    <li>
                      Infringe, misappropriate, or otherwise violate the
                      intellectual property or proprietary rights of Asvara or
                      any third party;
                    </li>
                    <li>
                      Attempt to reverse engineer, decompile, disassemble, or
                      otherwise derive the source code, underlying architecture,
                      models, or algorithms of the Services;
                    </li>
                    <li>
                      Extract or mine data from the Services using automated
                      tools, bots, crawlers, or scripts, unless expressly
                      authorized by Asvara in writing;
                    </li>
                    <li>
                      Upload, submit, or disseminate any illegal, offensive,
                      defamatory, obscene, harmful, or plagiarized content
                      through the platform;
                    </li>
                    <li>
                      Falsely represent or imply that the AI-generated output is
                      human-generated or official legal advice;
                    </li>
                    <li>
                      Use the Services to develop or train any AI model or
                      system that competes with Asvara’s offerings;
                    </li>
                    <li>
                      Bypass, disable, or interfere with any rate limiting,
                      access control, usage restriction, or technical safeguard
                      implemented to protect the Services;
                    </li>
                    <li>
                      Use the Services in a way that degrades performance or
                      interferes with the experience of other users.
                    </li>
                  </ul>
                  <p>
                    We reserve the right to investigate violations and cooperate
                    with law enforcement or regulatory authorities where
                    required. Breach of these provisions may result in legal
                    action and termination of your access to the Services.
                  </p>
                </section>
                {/* Section: Content and Ownership */}
                <section id="content-ownership" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    4. Content and Ownership
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">4.1 Your Content</h3>
                  <p>
                    As a user of Asvara’s Services, you may interact with our
                    platform by submitting data, text, queries, documents, case
                    facts, or other materials (“Input”). Based on your Input,
                    our Services may generate text, recommendations, summaries,
                    drafts, predictions, or other results (“Output”).
                    Collectively, your Input and corresponding Output are
                    referred to as “Content.”
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      You retain all rights, title, and interest in and to the
                      Input you provide.
                    </li>
                    <li>
                      You also own the Output generated specifically for you, to
                      the extent permitted by law.
                    </li>
                    <li>
                      You are solely responsible for ensuring that your Input
                      does not infringe upon any third party’s rights, violate
                      any law, or breach confidentiality obligations.
                    </li>
                  </ul>
                  <p>You represent and warrant that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      You have the legal right and authority to provide any
                      Input submitted through the Services;
                    </li>
                    <li>
                      The Input does not contain confidential or proprietary
                      information of any third party, unless lawfully permitted
                      to disclose it.
                    </li>
                  </ul>
                  <h3 className="font-semibold mt-4 mb-1">
                    4.2 Our Use of Content
                  </h3>
                  <p>
                    By using our Services, you grant Asvara Private Limited a
                    non-exclusive, worldwide, royalty-free license to store,
                    process, analyze, and use the Content you submit for the
                    limited purposes of:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Operating, maintaining, and providing the functionality of
                      the Services;
                    </li>
                    <li>
                      Improving and training Asvara’s models and systems (in
                      anonymized or aggregated form);
                    </li>
                    <li>
                      Enhancing legal accuracy, user experience, and platform
                      capabilities;
                    </li>
                    <li>
                      Fulfilling legal obligations or responding to lawful
                      requests by authorities.
                    </li>
                  </ul>
                  <p>
                    Unless required by law or stated otherwise in our Privacy
                    Policy, Asvara does not claim ownership over your Input or
                    distribute your Output to other users in a way that
                    identifies you.
                  </p>
                  <p>
                    You may contact us at{" "}
                    <a
                      href="mailto:contact@asvarainnovation.com"
                      className="text-green-400 underline"
                    >
                      contact@asvarainnovation.com
                    </a>{" "}
                    to request that your data be excluded from training models,
                    subject to certain limitations and implications on service
                    performance.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    4.3 Content Accuracy
                  </h3>
                  <p>
                    Asvara’s Services are powered by advanced AI and machine
                    learning technologies. However, due to the probabilistic and
                    evolving nature of artificial intelligence:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      The Output generated may be incomplete, outdated, biased,
                      or factually incorrect;
                    </li>
                    <li>
                      The same or similar Output may be provided to multiple
                      users based on similar Inputs;
                    </li>
                    <li>
                      You must not rely on any Output as the sole source of
                      legal advice, factual information, or professional
                      guidance.
                    </li>
                  </ul>
                  <p>You acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      You are solely responsible for reviewing and validating
                      any Output before using it for legal, academic, business,
                      or other critical purposes;
                    </li>
                    <li>
                      Asvara makes no guarantees regarding the completeness,
                      accuracy, or legal validity of Output;
                    </li>
                    <li>
                      Human judgment, legal verification, and professional
                      review are required before acting on any Output.
                    </li>
                  </ul>
                  <p>
                    We disclaim all liability for any action or decision taken
                    based on AI-generated Content without adequate human
                    validation.
                  </p>
                </section>
                {/* Section: Third-Party Services and Integrations */}
                <section id="third-party" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    5. Third-Party Services and Integrations
                  </motion.h2>
                  <p>
                    Asvara’s Services may incorporate, interoperate with, or
                    provide access to third-party software, APIs, websites,
                    databases, tools, or content (collectively, “Third-Party
                    Services”). These may include but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Legal databases and case repositories</li>
                    <li>Communication or productivity tools</li>
                    <li>
                      External APIs for document handling, search, or analytics
                    </li>
                    <li>Plugins or integrations from third-party vendors</li>
                  </ul>
                  <p>
                    While these integrations may enhance the functionality of
                    the platform, they are not owned, controlled, or maintained
                    by Asvara. Accordingly:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Your use of any Third-Party Services is subject to the
                      terms, licenses, and privacy policies of the respective
                      providers.
                    </li>
                    <li>
                      Asvara does not guarantee the availability, accuracy,
                      completeness, or security of any Third-Party Services or
                      their outputs.
                    </li>
                    <li>
                      We are not liable for any loss, damage, breach, or
                      disruption caused by or arising from such Third-Party
                      Services.
                    </li>
                  </ul>
                  <p>By using our platform, you acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Your interaction with Third-Party Services is at your own
                      discretion and risk;
                    </li>
                    <li>
                      Asvara disclaims all responsibility and liability for any
                      third-party content, output, or consequences resulting
                      from such integrations;
                    </li>
                    <li>
                      If a Third-Party Service ceases to operate, changes its
                      terms, or causes system incompatibility, we are not
                      obligated to maintain continued access or support.
                    </li>
                  </ul>
                  <p>
                    If you do not agree with the terms of a Third-Party Service,
                    you should refrain from enabling or interacting with that
                    integration within our platform.
                  </p>
                </section>
                {/* Section: Intellectual Property */}
                <section id="intellectual-property" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    6. Intellectual Property
                  </motion.h2>
                  <p>
                    All intellectual property rights in and to the Services
                    provided by Asvara Private Limited—including but not limited
                    to the software, source code, machine learning models,
                    algorithms, user interfaces, designs, databases, text,
                    graphics, features, trademarks, service marks, logos, and
                    any proprietary content or materials—are and shall remain
                    the exclusive property of Asvara or its authorized
                    licensors.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      You are not granted any ownership rights in the Services
                      or any intellectual property therein;
                    </li>
                    <li>
                      Your access is limited to a non-exclusive, revocable right
                      to use the Services in accordance with these Terms;
                    </li>
                    <li>
                      You may not copy, modify, adapt, distribute, sell,
                      license, reverse engineer, decompile, or create derivative
                      works from any part of the Services or their components;
                    </li>
                    <li>
                      Any unauthorized use, reproduction, or exploitation of
                      Asvara’s intellectual property may result in civil and/or
                      criminal liability.
                    </li>
                  </ul>
                  <h3 className="font-semibold mt-4 mb-1">
                    Use of Brand Assets
                  </h3>
                  <p>
                    The names “Asvara”, our product names (such as PleadSmart,
                    Docbare, and AI Court Room), and all related logos,
                    graphics, icons, slogans, and brand elements are registered
                    and/or common law trademarks of Asvara Private Limited.
                  </p>
                  <p>
                    You may not use, reproduce, or display our trademarks or
                    brand assets for any commercial or non-commercial purpose
                    unless:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Such use is permitted under our Brand Guidelines (if
                      publicly made available), or
                    </li>
                    <li>
                      You have obtained prior written consent from Asvara.
                    </li>
                  </ul>
                  <p>
                    We reserve the right to revoke any granted usage permissions
                    at any time.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    Feedback and Suggestions
                  </h3>
                  <p>
                    If you submit feedback, ideas, suggestions, or improvements
                    regarding the Services (collectively, “Feedback”), you agree
                    that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Asvara may freely use, incorporate, and commercialize such
                      Feedback without restriction or obligation to you;
                    </li>
                    <li>
                      You assign to Asvara all right, title, and interest in and
                      to such Feedback.
                    </li>
                  </ul>
                  <p>
                    This provision ensures that we can continue to improve and
                    innovate our Services for the benefit of all users.
                  </p>
                </section>
                {/* Section: Payment, Subscriptions, and Credits */}
                <section id="payment" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    7. Payment, Subscriptions, and Credits
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">7.1 Billing</h3>
                  <p>
                    Certain features or offerings within Asvara’s Services may
                    be available only through paid subscriptions, usage-based
                    billing, or prepaid credit systems. If you choose to access
                    any paid Services, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Provide accurate, complete, and current payment
                      information, including a valid payment method (e.g.,
                      credit/debit card, UPI, or net banking);
                    </li>
                    <li>
                      Authorize Asvara or its designated payment processor to
                      charge your selected payment method for all applicable
                      fees, including recurring subscription payments, usage
                      charges, and applicable taxes;
                    </li>
                    <li>
                      Allow us to store your billing details securely, where
                      necessary, for automated recurring billing.
                    </li>
                  </ul>
                  <p>
                    Unless otherwise specified at the time of purchase, all
                    subscriptions will renew automatically at the end of the
                    billing cycle (monthly, quarterly, or annually) until you
                    cancel. You are responsible for all fees associated with
                    your account and any usage beyond plan limits.
                  </p>
                  <p>
                    Failure to complete payment may result in downgraded access,
                    suspension, or termination of your Services.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">7.2 Cancellation</h3>
                  <p>
                    You may cancel your subscription at any time through your
                    account settings or by contacting our support team.
                    Cancellation will take effect at the end of the current
                    billing period.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      All payments are non-refundable, including for partial
                      use, unused time, or remaining credits, unless required by
                      applicable law;
                    </li>
                    <li>
                      Canceling a subscription does not delete your account, but
                      you may lose access to paid features at the end of your
                      billing term.
                    </li>
                  </ul>
                  <p>
                    We reserve the right to refuse refunds or pro-rata returns
                    unless explicitly stated otherwise in a product-specific
                    refund policy.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">7.3 Changes</h3>
                  <p>
                    Asvara continuously improves its Services and may update its
                    pricing or features over time. We reserve the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Modify or discontinue certain features, packages, or
                      benefits;
                    </li>
                    <li>
                      Introduce new subscription tiers or usage-based plans;
                    </li>
                    <li>
                      Increase pricing for subscriptions or other services.
                    </li>
                  </ul>
                  <p>
                    If we increase the pricing of a recurring plan you are
                    subscribed to, we will provide at least 30 days' advance
                    notice via email or in-product notification before the
                    changes take effect. Continued use of the Services beyond
                    the effective date of the price change constitutes your
                    acceptance of the updated pricing.
                  </p>
                  <p>
                    If you do not agree with any pricing changes, you must
                    cancel your subscription before the new prices apply.
                  </p>
                </section>
                {/* Section: Termination and Suspension */}
                <section id="termination" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    8. Termination and Suspension
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">8.1 By You</h3>
                  <p>
                    You are free to stop using our Services at any time. You may
                    delete your account or cease accessing the platform without
                    notice. If you are on a paid subscription, cancellation
                    policies outlined in Section 7.2 will apply. Please note
                    that simply discontinuing use does not automatically cancel
                    paid subscriptions unless explicitly requested.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">8.2 By Asvara</h3>
                  <p>
                    We reserve the right to suspend or terminate your access to
                    some or all of our Services, including deactivating or
                    deleting your account, at our sole discretion, with or
                    without notice, if we determine that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      You have violated these Terms, our policies, applicable
                      laws, or engaged in any activity that is abusive,
                      fraudulent, unlawful, or harmful to others;
                    </li>
                    <li>
                      Your use of the Services poses legal, reputational,
                      operational, or security risks to Asvara, its users, or
                      third parties;
                    </li>
                    <li>
                      Your account has been inactive for more than 12
                      consecutive months and does not have an active paid
                      subscription;
                    </li>
                    <li>
                      We are required to do so to comply with legal obligations,
                      court orders, or regulatory actions.
                    </li>
                  </ul>
                  <p>
                    Suspension may be temporary or permanent and may result in
                    loss of access to Content or stored data associated with
                    your account. We recommend exporting any important
                    information prior to discontinuing use.
                  </p>
                </section>
                {/* Section: Discontinuation of Services */}
                <section id="discontinuation" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    9. Discontinuation of Services
                  </motion.h2>
                  <p>
                    Asvara is committed to delivering reliable and innovative
                    legal AI solutions, but we reserve the right to modify,
                    suspend, or discontinue any part of our Services—including
                    specific features, tools, platforms, or the Services as a
                    whole—at our sole discretion and at any time.
                  </p>
                  <p>
                    Where reasonably possible, we will provide advance notice of
                    such discontinuation via email, in-app notification, or an
                    announcement on our website.
                  </p>
                  <p>
                    If you are a paying subscriber and a discontinued Service
                    affects a feature you have prepaid for, we will issue a
                    pro-rated refund for any unused portion of that Service, in
                    accordance with applicable law and our refund policies.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Asvara shall not be held liable for any inconvenience,
                      loss of data, or disruption resulting from the
                      discontinuation of any Service, provided that reasonable
                      notice and/or appropriate refund is given where required;
                    </li>
                    <li>
                      You are responsible for backing up or exporting any
                      important information or data associated with your use of
                      the Services prior to such discontinuation.
                    </li>
                  </ul>
                  <p>
                    This clause does not limit our rights to modify or update
                    the Services as part of ongoing improvements or changes to
                    our business model.
                  </p>
                </section>
                {/* Section: Disclaimers */}
                <section id="disclaimers" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    10. Disclaimers
                  </motion.h2>
                  <p>
                    The Services provided by Asvara are offered strictly on an
                    “as is” and “as available” basis. To the maximum extent
                    permitted under applicable law, Asvara and its affiliates,
                    officers, employees, and licensors disclaim all warranties,
                    express or implied, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Warranties of merchantability</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement</li>
                    <li>
                      Accuracy, reliability, completeness, or usefulness of the
                      Services or Outputs
                    </li>
                  </ul>
                  <p>
                    While our AI systems are designed to assist with legal
                    research, document analysis, drafting, and related
                    workflows, they operate on probabilistic models that may not
                    always reflect current legal standards, judicial reasoning,
                    or factual accuracy.
                  </p>
                  <p>You expressly acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      The Outputs generated by our Services should not be
                      treated as legal advice, legal opinion, or a substitute
                      for consultation with qualified legal professionals;
                    </li>
                    <li>
                      You are solely responsible for verifying, interpreting,
                      and validating any Output or suggestion provided by our
                      platform before relying on it for decision-making, legal
                      submissions, or client guidance;
                    </li>
                    <li>
                      We do not warrant that the Services will be uninterrupted,
                      timely, secure, or error-free;
                    </li>
                    <li>
                      Any reliance you place on information or results obtained
                      through the Services is entirely at your own risk.
                    </li>
                  </ul>
                  <p>
                    Some jurisdictions may not allow the exclusion of certain
                    warranties. In such cases, the disclaimers in this section
                    will apply only to the fullest extent permitted by law.
                  </p>
                </section>
                {/* Section: Limitation of Liability */}
                <section id="liability" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    11. Limitation of Liability
                  </motion.h2>
                  <p>
                    To the fullest extent permitted by applicable law, Asvara
                    Private Limited, including its directors, officers,
                    employees, affiliates, licensors, and agents, shall not be
                    liable to you or any third party for any indirect,
                    incidental, consequential, special, exemplary, or punitive
                    damages, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Loss of profits or revenue</li>
                    <li>Loss of data or goodwill</li>
                    <li>Loss of business opportunities</li>
                    <li>Service interruption</li>
                    <li>Computer damage or system failure</li>
                    <li>Costs of substitute services</li>
                    <li>
                      Any legal or regulatory consequences arising from reliance
                      on the Output
                    </li>
                  </ul>
                  <p>
                    These limitations apply whether the claim is based on
                    contract, tort (including negligence), warranty, strict
                    liability, or any other legal theory, and even if Asvara has
                    been advised of the possibility of such damages.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    11.1 Cap on Liability
                  </h3>
                  <p>
                    In any event, Asvara's total cumulative liability arising
                    out of or relating to these Terms or the use of the Services
                    shall not exceed the greater of:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>₹8,000 (Indian Rupees Eight Thousand only); or</li>
                    <li>
                      The total amount paid by you to Asvara for the Services in
                      the twelve (12) months immediately preceding the event
                      giving rise to the claim.
                    </li>
                  </ul>
                  <p>
                    This limitation of liability is a fundamental element of the
                    basis of the bargain between you and Asvara and shall apply
                    even if any limited remedy fails of its essential purpose.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    11.2 Jurisdictional Exceptions
                  </h3>
                  <p>
                    Some jurisdictions may not allow the exclusion or limitation
                    of certain damages. In such cases, the limitations in this
                    section shall apply only to the extent permitted by the laws
                    of your jurisdiction.
                  </p>
                </section>
                {/* Section: Indemnity */}
                <section id="indemnity" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    12. Indemnity
                  </motion.h2>
                  <p>
                    You agree to defend, indemnify, and hold harmless Asvara
                    Private Limited, its affiliates, officers, directors,
                    employees, licensors, partners, and agents from and against
                    any and all claims, demands, damages, obligations, losses,
                    liabilities, costs, or expenses, including but not limited
                    to reasonable attorney's fees, arising out of or relating
                    to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your access to or use of the Services;</li>
                    <li>
                      Your violation of these Terms or any applicable law or
                      regulation;
                    </li>
                    <li>
                      Your Content, including any claim that your Input or your
                      use of Output infringes, misappropriates, or otherwise
                      violates the rights of a third party;
                    </li>
                    <li>
                      Any activity occurring under your account, whether or not
                      authorized by you;
                    </li>
                    <li>
                      Your misuse of AI-generated Output or reliance on it in a
                      manner inconsistent with legal or ethical standards.
                    </li>
                  </ul>
                  <p>
                    This indemnification obligation survives the termination or
                    expiration of these Terms and your use of the Services.
                  </p>
                  <p>
                    Asvara reserves the right, at its own expense, to assume the
                    exclusive defense and control of any matter otherwise
                    subject to indemnification by you. In such a case, you agree
                    to cooperate with our defense of such claims.
                  </p>
                </section>
                {/* Section: Dispute Resolution */}
                <section id="dispute" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    13. Dispute Resolution
                  </motion.h2>
                  <h3 className="font-semibold mt-4 mb-1">
                    13.1 Governing Law and Jurisdiction
                  </h3>
                  <p>
                    These Terms of Use and any dispute arising out of or in
                    connection with them, including any question regarding their
                    existence, validity, or termination, shall be governed by
                    and construed in accordance with the laws of India, without
                    regard to its conflict of laws principles.
                  </p>
                  <p>
                    All disputes, controversies, or claims related to or arising
                    under these Terms or your use of the Services shall be
                    subject to the exclusive jurisdiction of the courts located
                    in the jurisdiction where the registered office of Asvara
                    Private Limited is situated, currently in New Delhi, India.
                    You hereby consent to the personal jurisdiction and venue of
                    such courts and waive any objections based on inconvenience
                    of forum.
                  </p>
                  <h3 className="font-semibold mt-4 mb-1">
                    13.2 Informal Resolution
                  </h3>
                  <p>
                    Before initiating any formal legal proceedings, we strongly
                    encourage you to first contact us in good faith at{" "}
                    <a
                      href="mailto:contact@asvarainnovation.com"
                      className="text-green-400 underline"
                    >
                      contact@asvarainnovation.com
                    </a>{" "}
                    to attempt an informal resolution of the dispute.
                  </p>
                  <p>
                    We are committed to resolving user concerns fairly and
                    efficiently, and many issues can be resolved promptly
                    without litigation. Both parties agree to make reasonable
                    efforts to resolve the issue informally within 30 days of
                    notice, unless mutually extended in writing.
                  </p>
                  <p>
                    Only after this period, if a resolution cannot be reached,
                    may either party proceed with formal legal proceedings as
                    described in Section 13.1.
                  </p>
                </section>
                {/* Section: Copyright Complaints */}
                <section id="copyright" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    14. Copyright Complaints
                  </motion.h2>
                  <p>
                    If you believe your intellectual property rights have been
                    violated, please write to:
                  </p>
                  <p>
                    Asvara Private Limited
                    <br />
                    Legal & Compliance Department
                    <br />
                    Email:{" "}
                    <a
                      href="mailto:asvarainnovation@gmail.com"
                      className="text-green-400 underline"
                    >
                      asvarainnovation@gmail.com
                    </a>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A description of the work and infringement</li>
                    <li>Your name, address, and signature</li>
                    <li>A good faith belief statement</li>
                    <li>
                      A statement of authority and accuracy under penalty of
                      perjury
                    </li>
                  </ul>
                </section>
                {/* Section: General Terms */}
                <section id="general" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-green-400/30"
                  >
                    15. General Terms
                  </motion.h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>Entire Agreement:</strong> These Terms of Use,
                      together with our{" "}
                      <Link
                        href="/policies/privacy"
                        className="text-green-400 underline"
                      >
                        Privacy Policy
                      </Link>
                      ,{" "}
                      <Link
                        href="/policies/cookie"
                        className="text-green-400 underline"
                      >
                        Cookie Policy
                      </Link>
                      , and any applicable service-specific agreements,
                      constitute the entire agreement between you and Asvara
                      Private Limited concerning your access to and use of the
                      Services. They supersede all prior or contemporaneous
                      communications and understandings, whether oral or
                      written.
                    </li>
                    <li>
                      <strong>Severability:</strong> If any provision of these
                      Terms is found to be invalid, illegal, or unenforceable by
                      a court of competent jurisdiction, the remaining
                      provisions shall remain in full force and effect. The
                      unenforceable portion shall be interpreted to reflect the
                      original intent of the parties as closely as possible.
                    </li>
                    <li>
                      <strong>Assignment:</strong> You may not assign, delegate,
                      or transfer your rights or obligations under these Terms
                      without prior written consent from Asvara. Any attempted
                      assignment without such consent shall be null and void.
                      Asvara may freely assign or transfer its rights and
                      obligations under these Terms to any affiliate, successor
                      entity, or in connection with a merger, acquisition, or
                      sale of assets.
                    </li>
                    <li>
                      <strong>Force Majeure:</strong> Asvara shall not be held
                      liable for any delay or failure in performance resulting
                      from events beyond its reasonable control, including but
                      not limited to natural disasters, acts of war, terrorism,
                      governmental actions, labor disputes, internet or
                      telecommunications failures, power outages, or other force
                      majeure events.
                    </li>
                    <li>
                      <strong>Waiver:</strong> The failure of Asvara to enforce
                      any right or provision of these Terms shall not constitute
                      a waiver of that right or provision. Any waiver must be in
                      writing and expressly stated. A waiver of any breach shall
                      not constitute a waiver of any other or subsequent breach.
                    </li>
                  </ul>
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
            Questions about these Terms of Service?
          </h3>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
          >
            Contact Legal Team
          </Button>
        </div>
      </section>
    </div>
  );
}
