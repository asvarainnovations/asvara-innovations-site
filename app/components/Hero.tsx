"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onFadeStart?: () => void;
  onFadeHalf?: () => void;
}

function LoggedInHero({ logoRef, startFade }: { logoRef: React.RefObject<HTMLDivElement>, startFade: boolean }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl gap-4 md:gap-8">
      {/* Left: Logo, name, tagline */}
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center mb-4 md:mb-0 h-full">
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
          <div ref={logoRef} className="relative z-10 flex flex-col items-center text-center">
            <Image
              src="/logo-white.png"
              alt="asvara"
              width={300}
              height={300}
              className="mb-2 sm:mb-4 drop-shadow-xl"
              priority
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 220px, 300px"
            />
            <h2 className="text-white text-4xl sm:text-3xl md:text-4xl font-medium font-roboto mb-1">asvara</h2>
            <p className="text-gray-400 text-xl sm:text-lg md:text-xl">Legal Eagle On Board</p>
          </div>
        </div>
      </div>
      {/* Right: Main content */}
      <motion.div 
        className="space-y-4 sm:space-y-6 w-full flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h1 className="space-y-1 max-w-xl mx-auto">
          <span className="block text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white">Revolutionizing</span>
          <span className="block text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Legal Work With</span>
          </span>
          <span className="block text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white">AI Innovation</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Cutting-edge AI solutions empowering legal professionals, law
          firms, and enterprises to work smarter and achieve more
        </p>
        {/* Service Buttons: stack vertically on mobile, row on md+ */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-12 mt-4 sm:mt-8 justify-center items-center">
          {/* <button
            type="button"
            onClick={() => window.open("https://pleadsmart.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            PleadSmart
          </button> */}
          <button
            type="button"
            onClick={() => window.open("https://docbare.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            DocBare
          </button>
          <button
            type="button"
            onClick={() => window.open("https://aicourt.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            AI Court
          </button>
        </div>
      </motion.div>
    </div>
  );
}


export default function Hero({ onFadeStart, onFadeHalf }: HeroProps) {
  const [startFade, setStartFade] = useState(false);
  const [startLogoAnim, setStartLogoAnim] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0, width: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  // These should match the loading logo's final state
  const loadingLogoScale = 0.57;
  const loadingLogoOffsetX = -28.8; // vw
  const loadingLogoOffsetY = -100; // px

  useEffect(() => {
    const updateLogoPosition = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        // Convert positions to viewport-relative units
        setLogoPosition({
          x: (rect.left - (viewportWidth / 2 - rect.width / 2)) / viewportWidth * 100,
          y: rect.top - window.innerHeight / 2 + rect.height / 2,
          width: rect.width
        });
      }
    };

    // Update position initially and on window resize
    updateLogoPosition();
    window.addEventListener('resize', updateLogoPosition);
    return () => window.removeEventListener('resize', updateLogoPosition);
  }, []);

  const handleAnimationComplete = () => {
    setStartLogoAnim(true);
  };



  // Call onFadeStart when fade animation starts
  useEffect(() => {
    if (startFade && typeof onFadeStart === 'function') {
      onFadeStart();
    }
  }, [startFade, onFadeStart]);

  useEffect(() => {
    // Remove AnimatePresence and LoadingAnimation, and instead trigger fade after a short delay
    const timer = setTimeout(() => setStartFade(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        key="hero"
        className="min-h-[70vh] bg-black relative overflow-hidden"
      >
        <style jsx>{`
          select option {
            background-color: #1a1a1a;
            color: white;
            padding: 8px 12px;
          }
          select option:checked {
            background-color: #2563eb;
          }
        `}</style>
        {/* Animated floating accent shape */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-accent/30 via-blue-700/20 to-transparent rounded-full blur-3xl opacity-60 z-0 animate-pulse" />
        {/* Background dots/grid effect */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: startFade ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          onAnimationComplete={() => {
            if (typeof onFadeHalf === 'function') {
              setTimeout(() => {
                onFadeHalf();
              }, 500);
            }
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center pt-32 pb-16">
          <LoggedInHero logoRef={logoRef} startFade={startFade} />
        </div>
      </div>
    </>
  );
}
