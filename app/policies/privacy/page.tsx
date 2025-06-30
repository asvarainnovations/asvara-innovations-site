"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tableOfContents = [
  { id: "information-collection", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "data-sharing", title: "Data Sharing and Disclosure" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "security-measures", title: "Security Measures" },
  { id: "cookies-tracking", title: "Cookies and Tracking" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "changes-policy", title: "Changes to this Policy" },
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
    <Card className="sticky-policy-toc top-8 bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
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

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-blue-400 mr-3" />
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100">
                Privacy Policy
              </h1>
            </div>
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              <span className="italic">Last updated: June 15, 2025</span>
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
            <span className="text-gray-300">Privacy Policy</span>
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
                <div className="text-gray-300 leading-relaxed">
                  <p className="text-xl mb-8">
                    Asvara Private Limited ("Asvara", "we", "our", or "us") is
                    committed to protecting the privacy and security of the
                    users ("you", "your") of our AI-powered legal research
                    products, including but not limited to Case Genius, DocBare,
                    and any other services we provide ("Services").
                  </p>
                  <p className="mb-4">
                    This Privacy Policy does not apply to content that we
                    process on behalf of customers of our business offerings,
                    such as our API. Our use of that data is governed by our
                    customer agreements covering access to and use of those
                    offerings.
                  </p>
                  <p className="mb-8">
                    For information about how we collect and use training
                    information to develop our language models that power
                    PleadSmart and AI Court Room and other Services, and your
                    choices with respect to that information, please look into
                    this help center.
                  </p>
                </div>

                <section id="information-collection" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Information We Collect
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-100">
                      Personal Data You Provide:
                    </h3>
                    <p>
                      We collect Personal Data if you create an account to use
                      our Services or communicate with us as follows:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Account Information:</strong> When you create an
                        account with us, we will collect information associated
                        with your account, including your name, contact
                        information, account credentials, date of birth, payment
                        information, and transaction history, (collectively,
                        "Account Information").
                      </li>
                      <li>
                        <strong>User Content:</strong> We collect Personal Data
                        that you provide in the input to our Services
                        ("Content"), including your prompts and other content
                        you upload, such as file, image, and audio, depending on
                        the features you use.
                      </li>
                      <li>
                        <strong>Communication Information:</strong> If you
                        communicate with us, such as via email or our pages on
                        social media sites, we may collect Personal Data like
                        your name, contact information, and the contents of the
                        messages you send ("Communication Information").
                      </li>
                      <li>
                        <strong>Other Information You Provide:</strong> We
                        collect other information that you may provide to us,
                        such as when you participate in our events or surveys or
                        provide us with information to establish your identity
                        or age (collectively, "Other Information You Provide").
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-100 mt-6">
                      Personal Data We Receive from Your Use of the Services:
                    </h3>
                    <p>
                      When you visit, use, or interact with the Services, we
                      receive the following information about your visit, use,
                      or interactions ("Technical Information"):
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Log Data:</strong> We collect information that
                        your browser or device automatically sends when you use
                        our Services. Log data includes your Internet Protocol
                        address, browser type and settings, the date and time of
                        your request, and how you interact with our Services.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> We collect information
                        about your use of the Services, such as the types of
                        content that you view or engage with, the features you
                        use and the actions you take, as well as your time zone,
                        country, the dates and times of access, user agent and
                        version, type of computer or mobile device, and your
                        computer connection.
                      </li>
                      <li>
                        <strong>Device Information:</strong> We collect
                        information about the device you use to access the
                        Services, such as the name of the device, operating
                        system, device identifiers, and browser you are using.
                        Information collected may depend on the type of device
                        you use and its settings.
                      </li>
                      <li>
                        <strong>Location Information:</strong> We may determine
                        the general area from which your device accesses our
                        Services based on information like its IP address for
                        security reasons and to make your product experience
                        better, for example to protect your account by detecting
                        unusual login activity or to provide more accurate
                        responses. In addition, some of our Services allow you
                        to choose to provide more precise location information
                        from your device, such as location information from your
                        device's GPS.
                      </li>
                      <li>
                        <strong>Cookies and Similar Technologies:</strong> We
                        use cookies and similar technologies to operate and
                        administer our Services, and improve your experience. If
                        you use our Services without creating an account, we may
                        store some of the information described in this policy
                        with cookies, for example to help maintain your
                        preferences across browsing sessions. For details about
                        our use of cookies, please read our Cookie Notice.
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-100 mt-6">
                      Information We Receive from Other Sources:
                    </h3>
                    <p>
                      We receive information from our trusted partners, such as
                      security partners, to protect against fraud, abuse, and
                      other security threats to our Services, and from marketing
                      vendors who provide us with information about potential
                      customers of our business services.
                    </p>
                    <p>
                      We also collect information from other sources, like
                      information that is publicly available on the internet, to
                      develop the models that power our Services.
                    </p>
                  </div>
                </section>

                <section id="how-we-use" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    How We Use Your Information
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>We may use Personal Data for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        To provide, analyze, and maintain our Services, for
                        example to respond to your questions for Asvara powered
                        AIs;
                      </li>
                      <li>
                        To improve and develop our Services and conduct
                        research, for example to develop new product features;
                      </li>
                      <li>
                        To communicate with you, including to send you
                        information about our Services and events, for example
                        about changes or improvements to the Services;
                      </li>
                      <li>
                        To prevent fraud, illegal activity, or misuses of our
                        Services, and to protect the security of our systems and
                        Services;
                      </li>
                      <li>
                        To comply with legal obligations and to protect the
                        rights, privacy, safety, or property of our users,
                        Asvara, or third parties.
                      </li>
                    </ul>
                    <p>
                      We may also aggregate or de-identify Personal Data so that
                      it no longer identifies you and use this information for
                      the purposes described above, such as to analyze the way
                      our Services are being used, to improve and add features
                      to them, and to conduct research. We will maintain and use
                      de-identified information in de-identified form and not
                      attempt to reidentify the information, unless required by
                      law.
                    </p>
                    <p>
                      As noted above, we may use Content you provide us to
                      improve our Services, for example to train the models that
                      power different product of Asvara. Read our instruction on
                      how you can opt out of our use of your Content to train
                      our models.
                    </p>
                    <p className="font-semibold text-blue-400">
                      Note: We *do not use client-uploaded legal documents or
                      queries for training public models without your explicit
                      consent.
                    </p>
                  </div>
                </section>

                <section id="data-sharing" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Data Sharing and Disclosure
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p className="font-semibold">
                      We do not sell your personal data.
                    </p>
                    <p>
                      We may share your information in some certain
                      circumstances mentioned below:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Vendors and Service Providers:</strong> To
                        assist us in meeting business operations needs and to
                        perform certain services and functions, we may disclose
                        Personal Data to vendors and service providers,
                        including providers of hosting services, customer
                        service vendors, cloud services, content delivery
                        services, support and safety monitoring services, email
                        communication software, web analytics services, payment
                        and transaction processors, and other information
                        technology providers. Pursuant to our instructions,
                        these parties will access, process, or store Personal
                        Data only in the course of performing their duties to
                        us.
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> If we are involved
                        in strategic transactions, reorganization, bankruptcy,
                        receivership, or transition of service to another
                        provider (collectively, a "Transaction"), your Personal
                        Data may be disclosed in the diligence process with
                        counterparties and others assisting with the Transaction
                        and transferred to a successor or affiliate as part of
                        that Transaction along with other assets.
                      </li>
                      <li>
                        <strong>
                          Government Authorities or Other Third Parties:
                        </strong>{" "}
                        We may share your Personal Data, including information
                        about your interaction with our Services, with
                        government authorities, industry peers, or other third
                        parties in compliance with the law:
                      </li>
                    </ul>
                    <div className="ml-8 space-y-1">
                      <p>
                        (i) If required to do so to comply with a legal
                        obligation, or in the good faith belief that such action
                        is necessary to comply with a legal obligation,
                      </p>
                      <p>(ii) To protect and defend our rights or property,</p>
                      <p>
                        (iii) If we determine, in our sole discretion, that
                        there is a violation of our terms, policies, or the law;
                      </p>
                      <p>
                        (iv) To detect or prevent fraud or other illegal
                        activity;
                      </p>
                      <p>
                        (v) To protect the safety, security, and integrity of
                        our products, employees, users, or the public, or
                      </p>
                      <p>(vi) To protect against legal liability.</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Affiliates:</strong> We may disclose Personal
                        Data to our affiliates, meaning an entity that controls,
                        is controlled by, or is under common control with Asvara
                        Private Limited. Our affiliates may use this Personal
                        Data in a manner consistent with this Privacy Policy.
                      </li>
                      <li>
                        <strong>Business Account Administrators:</strong> When
                        you join a PleadSmart, Docbare, AI Court Room or
                        business account, the administrators of that account may
                        access and control your Asvara account, including being
                        able to access your Content. In addition, if you create
                        an account using an email address belonging to your
                        employer or another organization, we may share the fact
                        that you have an account and certain account
                        information, such as your email address, with your
                        employer or organization to, for example, enable you to
                        be added to their business account.
                      </li>
                      <li>
                        <strong>
                          Other Users and Third Parties You Interact or Share
                          Information With:
                        </strong>{" "}
                        Certain features allow you to interact or share
                        information with other users or third parties. For
                        example, you can share PleadSmart, Docbare, AI Court
                        Room conversations with other users shared link. You can
                        also send information to third-party applications, such
                        as via custom actions for Asvara, or for searching the
                        web to help answer questions that benefit from more
                        recent information. Information you share with third
                        parties is governed by their own terms and privacy
                        policies, and you should make sure you understand those
                        terms and policies before sharing information with them.
                      </li>
                    </ul>
                  </div>
                </section>

                <section id="data-retention" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Data Retention
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      We'll retain your Personal Data for only as long as we
                      need in order to provide our Services to you, or for other
                      legitimate business purposes such as resolving disputes,
                      safety and security reasons, or complying with our legal
                      obligations. How long we retain Personal Data will depend
                      on a number of factors, such as:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        Our purpose for processing the data (such as whether we
                        need to retain the data to provide our Services);
                      </li>
                      <li>
                        The amount, nature, and sensitivity of the information;
                      </li>
                      <li>
                        The potential risk of harm from unauthorized use or
                        disclosure;
                      </li>
                      <li>Any legal requirements that we are subject to.</li>
                    </ul>
                    <p>
                      In some cases, the length of time we retain data depends
                      on your settings. For example, Asvara temporary chats will
                      not appear in your history and will be kept up to 30 days
                      for safety purposes. You can find more information on data
                      control you can visit Help Center.
                    </p>
                  </div>
                </section>

                <section id="your-rights" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Your Rights
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      Depending on jurisdiction (including India or under GDPR
                      if applicable), you may have rights to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate or incomplete data</li>
                      <li>Request deletion ("right to be forgotten")</li>
                      <li>Object to certain data uses or withdraw consent</li>
                      <li>
                        Lodge a complaint with a data protection authority
                      </li>
                    </ul>
                    <p>
                      You can exercise some of these rights through your Asvara
                      account. If you are unable to exercise your rights through
                      your account, please submit your request through
                      contact@asvarainnovation.com or
                      asvarainnovation@gmail.com.
                    </p>
                  </div>
                </section>

                <section id="security-measures" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Security Measures
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      We implement commercially reasonable technical,
                      administrative, and organizational measures designed to
                      protect Personal Data from loss, misuse, and unauthorized
                      access, disclosure, alteration, or destruction. However,
                      no Internet or email transmission is ever fully secure or
                      error free. Therefore, you should take special care in
                      deciding what information you provide to the Services. In
                      addition, we are not responsible for circumvention of any
                      privacy settings or security measures contained on the
                      Service, or third-party websites.
                    </p>
                  </div>
                </section>

                <section id="cookies-tracking" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Cookies and Tracking
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      We use essential cookies and analytics tools to improve
                      user experience. You may adjust your browser settings to
                      decline cookies.
                    </p>
                  </div>
                </section>

                <section id="children-privacy" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Children's Privacy
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      Our services are intended for professionals aged 18 and
                      above. We do not knowingly collect personal data from
                      minors who are below the age of 14.
                      </p>
                    </div>
                </section>

                <section id="changes-policy" className="scroll-mt-[100px]">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-blue-400/30"
                  >
                    Changes to this Policy
                  </motion.h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      We may update this Privacy Policy from time to time.
                      Material changes will be notified via email or through our
                      platform.
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
            Need clarification on our privacy practices?
          </h3>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Contact Privacy Team
          </Button>
        </div>
      </section>
    </div>
  );
}
