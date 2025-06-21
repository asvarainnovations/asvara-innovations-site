"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaGavel, FaFileAlt, FaPaperclip, FaFolderOpen, FaBalanceScale } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import Link from 'next/link';

const featureCards = [
  {
    icon: <FaSearch className="w-6 h-6 text-accent" />,
    title: "Case Search",
  },
  {
    icon: <FaGavel className="w-6 h-6 text-accent" />,
    title: "Instant Judgments",
  },
  {
    icon: <FaFileAlt className="w-6 h-6 text-accent" />,
    title: "Smart Summaries",
  },
];

export default function ProductSection() {
  // Animation controls for AI Courtroom pillars
  const [activePillar, setActivePillar] = useState(0);
  // DocBare hover state
  const [docHover, setDocHover] = useState(false);
  // AI Court Room hover state
  const [courtHover, setCourtHover] = useState(false);
  // PleadSmart device hover state
  const [pleadSmartHover, setPleadSmartHover] = useState(false);
  // Track mobile/desktop for hardcoded arc positions
  const [isMobile, setIsMobile] = useState(false);
  // Track hydration to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  // Ref for the bench
  const benchRef = useRef<HTMLDivElement>(null);
  // Ref for the product card container
  const courtContainerRef = useRef<HTMLDivElement>(null);
  const [benchCenter, setBenchCenter] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 4);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 500);
      // Update bench center relative to container on resize
      if (benchRef.current && courtContainerRef.current) {
        const benchRect = benchRef.current.getBoundingClientRect();
        const containerRect = courtContainerRef.current.getBoundingClientRect();
        setBenchCenter({
          x: benchRect.left + benchRect.width / 2 - containerRect.left,
          y: benchRect.top - containerRect.top,
        });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Set bench center after mount
    if (benchRef.current && courtContainerRef.current) {
      const benchRect = benchRef.current.getBoundingClientRect();
      const containerRect = courtContainerRef.current.getBoundingClientRect();
      setBenchCenter({
        x: benchRect.left + benchRect.width / 2 - containerRect.left,
        y: benchRect.top - containerRect.top,
      });
    }
  }, []);

  // Steps data
  const steps = [
    { label: "Intake", icon: <FaFileAlt className="text-white" /> },
    { label: "Evidence", icon: <FaPaperclip className="text-white" /> },
    { label: "Trial", icon: <FaGavel className="text-white" /> },
    { label: "Verdict", icon: <FaBalanceScale className="text-white" /> },
  ];

  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-black via-[#101522] to-black/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-36">
          {/* PleadSmart */}
          <div className="flex flex-col items-center">
            <div className="h-80 w-full flex items-center justify-center">
              {/* 3D Device Mockup */}
              <motion.div
                className="relative w-56 h-36 md:w-64 md:h-40 bg-gradient-to-br from-[#1C3D5A] to-[#0A192F] rounded-2xl shadow-2xl border border-accent/30"
                whileHover={{ rotateY: 10, rotateX: 5, scale: 1.04 }}
                style={{ perspective: 800 }}
                onMouseEnter={() => setPleadSmartHover(true)}
                onMouseLeave={() => setPleadSmartHover(false)}
              >
                {/* Sidebar Chat UI */}
                <div className="absolute left-0 top-0 h-full w-1/4 bg-black/30 rounded-l-2xl flex flex-col items-center py-4">
                  <div className="w-6 h-6 bg-accent/80 rounded-full mb-2" />
                  <div className="w-4 h-4 bg-accent/40 rounded-full mb-2" />
                  <div className="w-4 h-4 bg-accent/20 rounded-full" />
                </div>
                {/* Document Canvas */}
                <div className="absolute right-0 top-0 h-full w-3/4 flex flex-col justify-center items-center z-20">
                  <div className="w-32 h-20 bg-white/10 rounded-lg mb-2" />
                  <div className="w-24 h-3 bg-accent/40 rounded mb-1" />
                  <div className="w-20 h-3 bg-accent/20 rounded" />
                </div>
                {/* Floating Feature Cards with spread-out arc animation above the device, anchored to device */}
                <div className="absolute left-1/2 top-0 translate-x-[-50%] flex flex-row justify-center items-center z-10" style={{ pointerEvents: 'none', width: '100%', height: '90px', perspective: 800 }}>
                  {featureCards.map((card, i) => {
                    // Arc offsets for 3 cards: left, center, right (above the device)
                    const arcOffsets = [
                      { x: -200, y: -100 },
                      { x: -70, y: -160 },
                      { x: 100, y: -100 },
                    ];
                    const restingPos = { x: -70, y: 10 };
                    const { x, y } = pleadSmartHover ? arcOffsets[i] : restingPos;
                    const opacity = pleadSmartHover ? 1 : 0;
                    return (
                      <motion.div
                        key={card.title}
                        className="absolute left-1/2 top-0 bg-white/10 border border-accent/30 rounded-xl px-4 py-3 flex flex-col items-center shadow-lg backdrop-blur-md"
                        style={{ zIndex: 10 - i, transformStyle: "preserve-3d", pointerEvents: 'auto' }}
                        animate={{
                          opacity: opacity,
                          x: x,
                          y: y,
                          rotateZ: (i - 1) * 8,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        {card.icon}
                        <span className="mt-2 text-sm text-white font-medium whitespace-nowrap">
                          {card.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
            <Link href="/innovations/pleadsmart">
              <h1 className="mt-8 text-3xl font-semibold text-white text-center hover:text-accent transition-colors duration-300">PleadSmart</h1>
            </Link>
            <p className="text-gray-300 text-center mt-2 text-sm max-w-xs">
              AI-powered legal assistant for research, drafting, and argument building.
            </p>
          </div>

          {/* DocBare */}
          <div className="flex flex-col items-center">
            <div className="h-80 w-full flex items-center justify-center pb-24">
              <div className="transform scale-110 md:scale-125">
                {/* 3D Folder with Document and Paperclip Animation */}
                <motion.div
                  className="relative w-56 h-48 md:w-64 md:h-56 flex items-center justify-center group"
                  whileHover={{ scale: 1.04, rotateY: -8, rotateX: 4 }}
                  style={{ perspective: 800 }}
                  onMouseEnter={() => setDocHover(true)}
                  onMouseLeave={() => setDocHover(false)}
                >
                  {/* Folder SVG */}
                  <svg
                    className="absolute left-1/2 -translate-x-1/2 bottom-8 w-32 h-32 z-10"
                    viewBox="0 0 128 56"
                    fill="none"
                    style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
                  >
                    <defs>
                      <linearGradient id="folderGradient" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(10)">
                        <stop offset="0%" stopColor="#ffe066" />
                        <stop offset="100%" stopColor="#ffd43b" />
                      </linearGradient>
                    </defs>
                    <rect x="12" y="2" width="32" height="12" rx="4" fill="#ffe066" stroke="#e6b800" strokeWidth="1.5" />
                    <rect x="0" y="10" width="128" height="88" rx="16" fill="url(#folderGradient)" stroke="#e6b800" strokeWidth="2" />
                    <g>
                      <foreignObject x="16" y="28" width="32" height="20">
                        <div className="w-8 h-5 flex items-center justify-center">
                          <span style={{ color: '#b8860b', fontSize: '22px' }}>
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M2 14V4.5A1.5 1.5 0 013.5 3h3.379a2 2 0 011.789 1.106l.263.527A2 2 0 0010.72 6h7.78A1.5 1.5 0 0120 7.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#b8860b"/></svg>
                          </span>
                        </div>
                      </foreignObject>
                    </g>
                  </svg>
                  {/* Animated Document: hidden by default, slides up on hover */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-8 w-28 h-16 bg-gradient-to-br from-white to-blue-50 rounded-md border border-gray-200 shadow-xl z-20 flex items-center justify-center rotate-[-7deg]"
                    style={{ boxShadow: '0 6px 18px 0 rgba(0,0,0,0.10)' }}
                    animate={docHover ? { y: -48, opacity: 1 } : { y: 40, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Tab */}
                    <div className="absolute -top-2 left-3 w-8 h-3 bg-blue-200 rounded-t-md shadow-sm" />
                    <FaFileAlt className="text-accent text-2xl z-10" />
                    {/* Blue checkmark accent */}
                    <span className="absolute top-2 right-2 w-4 h-4 bg-accent/80 rounded-full flex items-center justify-center shadow-md">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5L5.2 8.5L9 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    </span>
                    {/* Paperclip attached to top left */}
                    <span className="absolute -top-2 left-1 w-5 h-5 flex items-center justify-center z-30">
                      <FaPaperclip className="text-accent text-lg rotate-12 drop-shadow-[0_0_8px_#00A6FB99]" />
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <Link href="/innovations/docbare">
              <h1 className="mt-8 text-3xl font-semibold text-white text-center hover:text-accent transition-colors duration-300">DocBare</h1>
            </Link>
            <p className="text-gray-300 text-center mt-2 text-sm max-w-xs">
              AI-powered contract & draft analyzer for clause-by-clause legal review.
            </p>
          </div>

          {/* AI Court Room */}
          <div className="flex flex-col items-center">
            <div className="h-80 w-full flex items-center justify-center pb-32">
              {/* Courtroom Diorama with Steps and Background */}
              <motion.div
                ref={courtContainerRef}
                className="relative w-72 h-72 md:w-96 md:h-80 flex items-center justify-center group"
                style={{ perspective: 800, overflow: 'visible' }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => {
                  setCourtHover(true);
                  if (benchRef.current && courtContainerRef.current) {
                    const benchRect = benchRef.current.getBoundingClientRect();
                    const containerRect = courtContainerRef.current.getBoundingClientRect();
                    setBenchCenter({
                      x: benchRect.left + benchRect.width / 2 - containerRect.left,
                      y: benchRect.top - containerRect.top,
                    });
                  }
                }}
                onMouseLeave={() => setCourtHover(false)}
              >
                {/* Subtle background columns */}
                <div className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none">
                  <svg width="240" height="80" viewBox="0 0 240 80" fill="none" className="opacity-10">
                    <rect x="20" y="40" width="16" height="40" rx="4" fill="#fff" />
                    <rect x="204" y="40" width="16" height="40" rx="4" fill="#fff" />
                    <rect x="60" y="20" width="16" height="60" rx="4" fill="#fff" />
                    <rect x="164" y="20" width="16" height="60" rx="4" fill="#fff" />
                  </svg>
                </div>
                {/* Floor shadow */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-14 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-full blur-2xl opacity-70 z-0" />
                {/* Judge's bench (3D) */}
                <div ref={benchRef} className="absolute bottom-24 left-1/2 -translate-x-1/2 w-40 h-16 bg-gradient-to-br from-[#1C3D5A] to-[#0A192F] rounded-t-2xl border-2 border-accent/40 shadow-2xl flex flex-col items-center z-10">
                  <div className="flex items-center justify-center h-full">
                    <FaBalanceScale className="text-accent text-3xl" />
                    <FaGavel className="text-accent text-2xl ml-2" />
                  </div>
                  {/* Bench base */}
                  <div className="w-full h-2 bg-accent/30 rounded-b-xl mt-1" />
                </div>
                {/* Podiums (3D) */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-52 flex justify-between z-10">
                  <div className="w-10 h-16 bg-gradient-to-br from-[#0A192F] to-[#1C3D5A] rounded-md border border-accent/20 shadow-lg" />
                  <div className="w-10 h-16 bg-gradient-to-br from-[#0A192F] to-[#1C3D5A] rounded-md border border-accent/20 shadow-lg" />
                </div>
                {/* Steps pop up on hover */}
                {courtHover && mounted && benchCenter && steps.map((step, i) => {
                  // Perfectly symmetrical arc offsets for perfect centering
                  const positionsDesktop = [
                    { x: -140, y: -100 },
                    { x: -80, y: -150 },
                    { x: 10, y: -150 },
                    { x: 60, y: -100 },
                  ];
                  const positionsMobile = [
                    { x: -120, y: -60 },
                    { x: -70, y: -120 },
                    { x: 10, y: -120 },
                    { x: 60, y: -60 },
                  ];
                  const { x, y } = isMobile ? positionsMobile[i] : positionsDesktop[i];
                  // Place steps absolutely relative to the bench center, within the container
                  return (
                    <motion.div
                      key={step.label}
                      className="absolute flex flex-col items-center pointer-events-none"
                      style={{
                        left: `${benchCenter.x}px`,
                        top: `${benchCenter.y}px`,
                        transform: 'none',
                      }}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, x, y }}
                      exit={{ opacity: 0, x: 0, y: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-accent/30 flex items-center justify-center border-2 border-accent shadow-lg drop-shadow-[0_2px_8px_rgba(0,170,255,0.5)]">
                        {step.icon}
                      </div>
                      <span className="text-xs md:text-sm font-semibold drop-shadow-md whitespace-nowrap px-2 rounded mt-2 md:mt-3 text-accent bg-black/90 pointer-events-none" style={{ minWidth: 60, textAlign: 'center' }}>
                        {i + 1}. {step.label}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            <Link href="/innovations/aicourt">
              <h2 className="mt-8 text-3xl font-semibold text-white text-center hover:text-accent transition-colors duration-300">AI Court Room</h2>
            </Link>
            <p className="text-gray-300 text-center mt-2 text-sm max-w-xs">
              Virtual courtroom to simulate trials, test arguments, predict outcomes, and resolve disputes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 