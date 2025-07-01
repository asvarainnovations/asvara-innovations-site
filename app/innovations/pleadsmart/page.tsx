"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

export default function PleadSmartPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-[#101522] to-black/95">
      <div className="relative pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8 text-center">
              {/* <span className="px-3 py-1 text-sm font-medium bg-accent/90 text-white rounded-full">
                Innovation
              </span> */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">
                PleadSmart
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                Your On-Demand AI Legal Assistant
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 flex items-center justify-center bg-black/20">
              {/* Replace with actual image if available */}
              <Image
                src="/products/pleadsmart-illustration.png"
                alt="PleadSmart Illustration"
                width={1000}
                height={1000}
              />
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-invert max-w-none mx-auto">
              <p>
                <strong>PleadSmart</strong> is an AI-powered legal chatbot
                designed to assist users across the legal spectrum — from
                advocates to corporate legal teams and even pro se litigants. It
                can:
              </p>
              <ul>
                <li>Understand and analyse the facts of a legal matter</li>
                <li>Instantly retrieve and summarize relevant judgments</li>
                <li>Identify favourable precedents based on fact patterns</li>
                <li>
                  Draft tailored legal arguments, notices, contracts, and even
                  plaints
                </li>
              </ul>
              <p>
                Essentially, PleadSmart automates a significant portion of an
                advocate's workflow — everything short of physically appearing
                in court.
              </p>
              <h2>What is PleadSmart?</h2>
              <p>
                PleadSmart is Asvara's AI-powered legal assistant designed to
                automate and enhance the core functions of legal research,
                drafting, and argument building. Built to serve lawyers, law
                students, in-house legal teams, and even individuals seeking
                basic legal support, PleadSmart acts like a reliable associate
                advocate who's always available, always prepared, and never
                overwhelmed. In an ecosystem where legal professionals often
                face time pressure, fragmented resources, and repetitive
                drafting tasks, PleadSmart fills the critical gap—offering
                instant access to case law, legal reasoning, and document
                creation, all through a natural, conversational interface.
              </p>
              <h2>How PleadSmart Works</h2>
              <p>
                At its core, PleadSmart is a smart legal chatbot capable of
                understanding complex legal questions posed in plain language.
                Users can describe a legal issue or set of facts, and PleadSmart
                will instantly retrieve and summarize relevant judgments from
                Indian courts. Unlike traditional keyword-based search tools
                that require legal expertise to use effectively, PleadSmart
                understands the intent and factual context behind a query. This
                means it not only finds judgments with matching legal issues but
                also prioritizes those with similar fact patterns and favorable
                outcomes. Whether a lawyer is looking for a landmark precedent
                or a case that mirrors their client's situation, PleadSmart
                reduces hours of manual research to minutes.
              </p>
              <h2>Drafting & Document Generation</h2>
              <p>
                But PleadSmart goes beyond research—it is also an intelligent
                drafting engine. It can generate notices, legal opinions,
                arguments, contracts, and even full plaints based on the facts
                provided. A user can simply input the matter—whether it's a
                tenancy dispute, a contract breach, or a defamation claim—and
                PleadSmart will produce a first draft that is structurally
                sound, legally accurate, and tailored to the jurisdiction. This
                is particularly valuable for solo practitioners, junior
                advocates, or corporate legal teams managing high volumes of
                repetitive work. By automating the initial drafting stage,
                PleadSmart frees up valuable time for strategic thinking and
                client interaction.
              </p>
              <h2>Argument Building & Counterarguments</h2>
              <p>
                One of the most innovative features of PleadSmart is its ability
                to simulate argument-building. A user can test the strength of a
                legal position by asking the system to generate
                counterarguments, helping them anticipate weaknesses before
                presenting their case in court. This back-and-forth interaction
                makes PleadSmart a virtual sparring partner, enabling users to
                refine their pleadings and prepare more persuasively.
              </p>
              <h2>For Legal Education</h2>
              <p>
                PleadSmart also caters to legal educators and students by
                functioning as an interactive learning tool. It explains legal
                doctrines in clear terms, cites relevant authorities, and can
                even quiz users or simulate exam-style questions to reinforce
                learning. For institutions and legal training academies, it
                offers a scalable way to standardize legal learning while
                encouraging practical application.
              </p>
              <h2>Why PleadSmart?</h2>
              <p>
                In a profession where clarity, speed, and accuracy are
                paramount, PleadSmart delivers all three. It doesn't replace the
                lawyer—it makes the lawyer faster, sharper, and better equipped.
                With its ability to handle complex tasks like judgment analysis,
                document generation, and legal strategy simulation, PleadSmart
                represents a major leap forward in the use of AI for the Indian
                legal sector. It embodies Asvara's mission to place a "Legal
                Eagle on Board" for every legal professional—no matter their
                size, experience level, or workload.
              </p>
            </div>
          </motion.div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
