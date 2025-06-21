"use client";

import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

export default function AICourtPage() {
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
                AI Court Room
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                A Virtual Courtroom to Simulate Real Trials, Test Arguments, Predict Outcomes — and Resolve Disputes
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 flex items-center justify-center bg-black/20">
              {/* Replace with actual image if available */}
              <span className="text-gray-500">[AI Court Room Illustration]</span>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-invert max-w-none mx-auto">
              <p>
                <strong>AI Court Room</strong> is Asvara's flagship product — a first-of-its-kind legal simulation and predictive platform that recreates courtroom proceedings and dispute resolution environments using AI. It allows users to test legal strategies, simulate litigation or ADR scenarios, and receive probability-based predictions — all within a dynamic, intelligent chamber.
              </p>
              <h2>How It Works</h2>
              <p>Each session consists of three roles:</p>
              <ol>
                <li>Client (Petitioner)</li>
                <li>Respondent (Opposing Party)</li>
                <li>Judge (or Arbitrator/Mediator)</li>
              </ol>
              <p>Users can assign these roles to either themselves or to AI. For example:</p>
              <ul>
                <li>Be the Client yourself</li>
                <li>Let the Respondent and Judge be AI</li>
                <li>Upload your documents, arguments, and evidence</li>
                <li>Begin a live legal or ADR simulation</li>
              </ul>
              <h2>Core Features</h2>
              <ol>
                <li><strong>Legal Argument Simulation</strong>
                  <ul>
                    <li>AI replicates real court scenarios, allowing the user to present arguments while the AI Respondent delivers realistic, legally sound counterarguments.</li>
                    <li>The AI Judge moderates the session, ensuring fairness and adherence to procedural law.</li>
                  </ul>
                </li>
                <li><strong>Document & Evidence Review</strong>
                  <ul>
                    <li>Users can upload factual briefs, legal documents, or evidence.</li>
                    <li>The AI Judge evaluates the submissions based on relevant laws and precedents.</li>
                  </ul>
                </li>
                <li><strong>Outcome Prediction & Drafting</strong>
                  <ul>
                    <li>At the end of each session, the AI provides:</li>
                    <ul>
                      <li>A probability-based prediction of how the case may be decided in real courts.</li>
                      <li>Detailed memorials and pleadings from both sides.</li>
                    </ul>
                  </ul>
                </li>
                <li><strong>ADR Simulations (Mediation, Negotiation & Arbitration)</strong>
                  <ul>
                    <li>Mediation: AI serves as a neutral mediator, facilitating structured dialogue to find common ground.</li>
                    <li>Negotiation: AI Respondent negotiates based on goals, constraints, and legal strength — perfect for settlement planning.</li>
                    <li>Arbitration: AI acts as an arbitrator, hearing both sides, evaluating evidence, and rendering a reasoned decision.</li>
                  </ul>
                </li>
              </ol>
              <p>These features make it ideal not just for courts, but also for in-house legal teams, dispute resolution forums, and academic training in ADR techniques.</p>
              <h2>Use Cases & Benefits</h2>
              <ul>
                <li><strong>Case Outcome Prediction:</strong> Quantify the strength of your case using AI trained on Indian Supreme Court, High Courts and other judgments.</li>
                <li><strong>Advocacy Practice:</strong> Law students and junior lawyers can practice pleadings, objections, and argument structuring.</li>
                <li><strong>Argument Refinement:</strong> Check how opposing counsel might respond to your case theory — and improve it.</li>
                <li><strong>Moot Court & Legal Education:</strong> Automatically generate memorials for both sides for use in competitions or study.</li>
                <li><strong>Dispute Resolution Training & Practice:</strong> Simulate real-world ADR sessions — with AI facilitating the process in a structured, realistic manner.</li>
              </ul>
              <p>
                So, Asvara's AI Court Room is a revolutionary platform designed to simulate courtroom proceedings and alternative dispute resolution (ADR) environments using artificial intelligence. It offers a virtual legal chamber where users can participate in realistic, AI-driven legal scenarios involving a Client (Petitioner), a Respondent (Opposing Party), and a Judge. What sets this product apart is the flexibility it offers—each role can be played either by a human or an AI, depending on the user's objective. Whether for litigation preparation, strategy testing, skill development, or dispute resolution, AI Court Room delivers a comprehensive and intelligent legal experience like no other product in the Indian legal-tech space.
              </p>
              <p>
                The process begins with users uploading relevant documents, including case summaries, pleadings, and evidence. The AI Judge reviews these materials following established principles of law and procedure, simulating how a real court might handle the matter. Once the setup is complete, the platform enters the argument phase. Here, participants—human or AI—engage in a structured legal debate. If the user chooses to play the role of the Client while assigning AI to act as the Respondent and Judge, they can argue their case in real time and receive intelligent counterarguments and feedback. This not only prepares lawyers for real-world challenges but also sharpens their legal thinking by exposing them to multiple sides of a legal issue. The AI Judge moderates the exchange, ensuring due process, raising procedural objections when appropriate, and evaluating each argument based on merit and legal precedent.
              </p>
              <p>
                In addition to litigation simulation, AI Court Room also functions as a robust platform for ADR simulations. Users can simulate a mediation session where the AI acts as a neutral facilitator guiding both parties toward a possible settlement. In negotiation mode, the AI Respondent negotiates terms based on risk, legal merit, and typical industry practices, allowing users to explore potential settlement strategies. Arbitration mode enables both sides to present their positions while the AI Arbitrator renders a reasoned award. These ADR simulations are invaluable for in-house legal teams, law students, and early-career practitioners seeking to understand dispute resolution mechanisms beyond the courtroom.
              </p>
              <p>
                Once the session concludes, AI Court Room delivers a detailed analysis of the case, including a probability-based prediction of the likely outcome. This prediction is grounded in a deep database of Supreme Court and High Court judgments, ensuring that the output reflects actual legal trends and judicial reasoning. Alongside the prediction, the platform automatically generates complete legal memorials for both sides, including arguments, citations, and structured pleadings. These outputs can be used for training, moot courts, or even real-world filing support, dramatically reducing the time spent on drafting.
              </p>
              <p>
                AI Court Room stands at the intersection of legal education, litigation strategy, and AI-powered innovation. It empowers users to test, refine, and elevate their legal skills and case strategies before they step into a real courtroom or ADR forum. With no comparable solution currently available in the Indian legal-tech market, AI Court Room sets a new benchmark for how legal professionals can prepare, learn, and succeed.
              </p>
            </div>
          </motion.div>
        </article>
      </div>

      <Footer />
    </main>
  );
} 