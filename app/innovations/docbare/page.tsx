"use client";

import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

export default function DocBarePage() {
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
                DocBare
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                AI-Powered Contract & Draft Analyzer
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 flex items-center justify-center bg-black/20">
              {/* Replace with actual image if available */}
              <span className="text-gray-500">[DocBare Illustration]</span>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-invert max-w-none mx-auto">
              <p>
                <strong>DocBare</strong> is an intelligent document review system built to evaluate legal drafts, contracts, and pleadings. It provides:
              </p>
              <ul>
                <li>A clause-by-clause legal analysis of your document</li>
                <li>Identification of provisions that are in your favor or potentially risky</li>
                <li>Suggestions for additions, removals, or rewording based on best legal practices</li>
                <li>Verification of whether all relevant legal grounds are covered</li>
              </ul>
              <p>
                In short, DocBare acts as a second pair of expert legal eyes, giving you a comprehensive legal audit of your document before it's filed or signed.
              </p>
              <h2>What is DocBare?</h2>
              <p>
                DocBare is Asvara's advanced AI solution for reviewing, analyzing, and strengthening legal documents. It is built for lawyers, in-house legal teams, compliance professionals, and even law students who regularly deal with complex contracts, pleadings, and policy drafts. In a field where the smallest clause can have massive consequences, DocBare ensures that no important detail is overlooked. It functions like a senior legal reviewer—meticulously going through each line, evaluating risks, and offering suggestions grounded in legal logic, precedent, and best practices.
              </p>
              <h2>How DocBare Works</h2>
              <p>
                The platform is designed to take a raw draft—whether it's a contract, agreement, petition, or legal notice—and run it through a deep legal analysis engine. DocBare dissects the document clause by clause, checking for legal sufficiency, coherence, and enforceability. It identifies which clauses are in the user's favor, which are neutral, and which may be biased toward the other party. Additionally, it flags missing provisions, vague language, conflicting terms, and compliance gaps. For example, in a vendor agreement, DocBare can point out whether there's a missing indemnity clause, an unclear termination process, or an imbalance in liability terms.
              </p>
              <h2>Guided Suggestions & Explanations</h2>
              <p>
                What makes DocBare uniquely powerful is that it doesn't just critique — it also guides. The platform suggests practical edits, alternative clause language, or additional provisions that should be included based on the purpose of the document and the jurisdiction involved. It contextualizes its feedback with explanations, so users not only know what to change but also understand why it matters. This feature makes DocBare not just a tool for correction, but a resource for learning and legal growth.
              </p>
              <h2>For Litigation Teams</h2>
              <p>
                For litigation teams, DocBare is equally valuable. Lawyers can upload written submissions or court pleadings to receive an evaluation of legal arguments, potential inconsistencies, and whether the proper procedural elements have been included. This real-time review process helps reduce errors before filing and enhances the persuasive power of the document. It also ensures that the arguments align with binding precedents and established legal principles.
              </p>
              <h2>For Corporate Legal Teams</h2>
              <p>
                In corporate legal settings, where hundreds of contracts are often reviewed under tight deadlines, DocBare helps standardize and accelerate the review process. Legal teams can quickly screen vendor agreements, NDAs, MoUs, and service contracts without compromising quality. DocBare not only checks for legal soundness but also assesses risk exposure, making it an invaluable asset in high-volume environments.
              </p>
              <h2>For Legal Education</h2>
              <p>
                Moreover, for legal education and training, DocBare acts as a silent mentor. Law students and interns can upload their drafts and receive professional-grade feedback within minutes. This speeds up the learning curve and builds drafting confidence early in a legal career.
              </p>
              <h2>Why DocBare?</h2>
              <p>
                DocBare bridges the gap between speed and precision—something every legal professional aspires to master. By bringing clarity, consistency, and depth to document review, it ensures that users aren't just producing paperwork, but legally solid, well-structured documents. With DocBare, Asvara is redefining what it means to review a legal draft—turning every review into an opportunity for refinement, risk reduction, and smarter legal outcomes.
              </p>
            </div>
          </motion.div>
        </article>
      </div>

      <Footer />
    </main>
  );
} 