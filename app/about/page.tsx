"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaHandshake, FaLightbulb, FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/app/components/Footer";

const founders = [
  {
    name: "Sajal Anand",
    title: "Lawyer & Chief Legal Architect",
    bio: "Sajal leads legal, strategic, and data architecture at Asvara. With deep insight into case law, litigation workflows, and compliance, he curates legal datasets, designs argument frameworks, and embeds ethical reasoning into our models.",
  },
  {
    name: "Rajat Balyan",
    title: "Co-Founder, Director & CTO",
    bio: "Rajat oversees the technology stack, architecture, and ML development. He ensures our platforms are robust, scalable, and secure—powering PleadSmart, Docbare, and AI Court Room with performance and precision.",
  },
];

const values = [
  {
    icon: FaHandshake,
    label: "Collaboration",
    desc: "We build together, valuing every perspective.",
  },
  {
    icon: FaLightbulb,
    label: "Curiosity",
    desc: "We question, explore, and innovate relentlessly.",
  },
  {
    icon: FaShieldAlt,
    label: "Ownership",
    desc: "We take initiative and deliver with integrity.",
  },
];

export default function AboutPage() {
  // Animate icons on scroll into view
  // const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     valueRefs.current.forEach((ref) => {
  //       if (ref) {
  //         const rect = ref.getBoundingClientRect();
  //         if (rect.top < window.innerHeight - 100) {
  //           ref.classList.add("animate-pulse");
  //         }
  //       }
  //     });
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <main className="bg-[#0E0E10] text-[#F5F5F5] min-h-screen w-full">
      {/* 1. Hero Banner */}
      <section className="relative flex items-center justify-center min-h-[60vh] px-4" style={{background: "linear-gradient(135deg, #10111A 0%, #0E0E10 100%)"}}>
        <div className="text-center w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-16">
          <h1 className="text-[2.5rem] md:text-[4rem] font-extrabold mb-4">About Asvara</h1>
          <p className="text-[1.25rem] md:text-2xl font-medium text-[#A6A6A6] max-w-2xl mx-auto">
            Revolutionizing legal practice with AI-powered research, drafting, & simulation.
          </p>
        </div>
      </section>

      {/* 2. Company Story */}
      <section className="py-12 md:py-16 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-20 px-4 md:px-20 items-center">
          {/* Left: About Us content (only first paragraph) */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-1 bg-[#2979FF] rounded" aria-hidden="true"></div>
            <div className="pl-6">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6">About Us</h2>
              <p className="text-[#F5F5F5] text-base md:text-lg leading-relaxed mb-4">
                At Asvara, we are driven by the belief that the future of legal services lies at the intersection of deep legal expertise and cutting-edge artificial intelligence. Founded with a shared vision to revolutionize legal research, drafting, and decision-making in India and beyond, our mission is to build intelligent tools that empower legal professionals, institutions, and enterprises to work smarter, faster, and more confidently.
              </p>
            </div>
          </div>
          {/* Right: Mission Quote Box */}
          <div className="flex items-center w-full">
            <div className="bg-[#121217] border-l-4 border-[#2979FF] rounded-lg shadow-lg p-8 w-full flex flex-col justify-center min-h-[220px]">
              <blockquote className="text-xl md:text-2xl font-medium text-[#F5F5F5] mb-4">
                "Every tool we build is the result of rigorous legal reasoning, iterative design, and hands-on technical validation."
              </blockquote>
              <span className="text-[#A6A6A6] text-base mt-2">— Mission Statement</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Team Section (Meet Our Founders) */}
      <section className="py-12 md:py-16 w-full">
        <div className="max-w-6xl mx-auto flex flex-col items-center px-4">
          <h2 className="text-[2rem] font-extrabold mb-8 text-center">Meet Our Founders</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-10 w-full">
            {/* Sajal */}
            <div className="flex flex-col items-center flex-1">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-[#23233a] rounded-full mb-4 flex items-center justify-center text-5xl font-bold text-[#2979FF] shadow-lg border-4 border-[#2979FF]/30 overflow-hidden relative">
                <Image
                  src="/team/sajal.jpeg"
                  alt="Sajal Anand"
                  width={150}
                  height={150}
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="font-bold text-xl mt-1 mb-4 text-center">Sajal Anand</div>
              <a
                href="https://www.linkedin.com/in/sajal-anand-508993215/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2979FF] text-white text-base font-bold shadow hover:bg-[#1761c7] transition mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                LinkedIn
              </a>
            </div>
            {/* Rajat */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-[#23233a] rounded-full mb-4 flex items-center justify-center text-5xl font-bold text-[#2979FF] shadow-lg border-4 border-[#2979FF]/30 overflow-hidden relative">
                <Image
                  src="/team/rajat.png"
                  alt="Rajat Balyan"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="font-bold text-xl mt-1 mb-4 text-center">Rajat Balyan</div>
              <a
                href="https://www.linkedin.com/in/rajat-balyan/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2979FF] text-white text-base font-bold shadow hover:bg-[#1761c7] transition mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 text-lg max-w-2xl mx-auto text-justify">
            <span className="block font-semibold text-center mb-4">Our co-founders bring together uniquely complementary strengths:</span>
            <span className="font-normal">
            <b>Sajal Anand</b>, a lawyer by training, leads the legal, strategic, and data architecture efforts at Asvara. With deep insight into case law, litigation workflows, and compliance challenges, he ensures that our AI tools remain grounded in the realities of legal practice. As a key driver of Asvara's vision, Sajal plays a crucial role in shaping the direction of the company—curating legal datasets, designing contextual argument frameworks, and embedding ethical reasoning into our models.<br /><br />
            <b>Rajat Balyan</b>, the technical mind behind Asvara, oversees the development of our technology stack. A dedicated and innovative engineer, he leads the architecture, infrastructure, and machine learning development of all our products. Rajat is responsible for ensuring that our platforms are robust, scalable, and secure—powering the intelligence that drives PleadSmart, Docbare, and AI Court Room with performance and precision.
            </span>
          </div>
        </div>
      </section>

      {/* 4. Our Culture & Values (narrative) */}
      <section className="py-12 md:py-16 w-full">
        <div className="max-w-6xl mx-auto flex flex-col items-center px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Culture & Values</h2>
          <div className="bg-[#18181C] border border-[#23232A] rounded-2xl shadow p-8 md:p-12 w-full max-w-3xl">
            <div className="text-[#A6A6A6] text-base leading-relaxed space-y-4">
              <p>At Asvara, our work culture is defined by collaboration, curiosity, and deep problem-solving. Every tool we build is the result of rigorous legal reasoning, iterative design, and hands-on technical validation. We don't believe in building technology for its own sake—we are here to solve real-world legal problems. Our team operates on principles of transparency, ownership, and empathy, where every member is empowered to take initiative and contribute meaningfully to the mission.</p>
              <p>Whether it's refining a legal argument model, implementing a new interface, or conducting user research with legal professionals, we approach every challenge with a shared commitment to excellence. We are proud of the journey we've started—and energized for what lies ahead. Asvara is more than a company. It's a movement to democratize legal intelligence and make AI an indispensable partner in the practice of law.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Culture & Values */}
      {/* <section className="py-12 md:py-16 w-full bg-[#10111A]">
        <div className="max-w-5xl mx-auto flex flex-col items-center px-4">
          <h2 className="text-2xl font-semibold mb-10 text-center">Culture & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {values.map((v) => (
              <div
                key={v.label}
                className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300"
              >
                <v.icon className="w-14 h-14 mb-4 text-[#2979FF]" />
                <h3 className="text-lg font-semibold mb-2">{v.label}</h3>
                <p className="text-[#A6A6A6] text-base">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 6. Call to Action */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 mb-10">
        <div className="bg-[#18181C] rounded-2xl shadow-xl px-8 py-20 max-w-4xl w-full flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#2979FF] to-[#22C55E] bg-clip-text text-transparent">
            Join the Movement
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#2979FF] to-[#22C55E] rounded-full mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-4">
            <Link href="/early-access" passHref>
              <button className="bg-[#2979FF] hover:bg-[#1565C0] text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all flex items-center gap-2">
                <FaRocket className="text-xl" />
                Get Early Access
              </button>
            </Link>
            <Link href="/careers" passHref>
              <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all flex items-center gap-2">
                <FaUsers className="text-xl" />
                Join Our Team
              </button>
            </Link>
          </div>
          <p className="text-[#A6A6A6] text-base mt-2">Be the first to try our AI legal tools.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
} 