"use client";

import Image from "next/image";
import { HiHome } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import { useState, useEffect, useRef, useCallback } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./Button";
import Link from "next/link";

interface HeroProps {
  onFadeStart?: () => void;
  onFadeHalf?: () => void;
}

function LoggedInHero({ logoRef, startFade }: { logoRef: React.RefObject<HTMLDivElement>, startFade: boolean }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-8 shadow-2xl">
      {/* Left: Logo, name, tagline */}
      <div className="w-full md:w-[40%] flex flex-col items-center justify-center mb-8 md:mb-0 h-full">
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
          <div ref={logoRef} className="relative z-10 flex flex-col items-center text-center">
            <Image
              src="/logo-white.png"
              alt="asvara"
              width={140}
              height={140}
              className="mb-4 drop-shadow-xl"
              priority
            />
            <h2 className="text-white text-2xl font-medium font-roboto mb-1">asvara</h2>
            <p className="text-gray-400 text-base">Legal Eagle On Board</p>
          </div>
        </div>
      </div>
      {/* Right: Main content */}
      <motion.div 
        className="space-y-6 w-full items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h1 className="space-y-1 text-center max-w-xl mx-auto">
          <span className="block text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">Revolutionizing</span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Legal Work With</span>
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">AI Innovation</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
          Cutting-edge AI solutions empowering legal professionals, law
          firms, and enterprises to work smarter and achieve more
        </p>
        {/* Service Buttons: stack vertically on mobile, row on md+ */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
          <button
            type="button"
            onClick={() => window.open("https://pleadsmart.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            PleadSmart
          </button>
          <button
            type="button"
            onClick={() => window.open("https://docbare.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            DocBare
          </button>
          <button
            type="button"
            onClick={() => window.open("https://aicourt.asvarainnovation.com", "_blank", "noopener,noreferrer")}
            className="inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            AI Court
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function LoggedOutHero({ logoRef, startFade }: { logoRef: React.RefObject<HTMLDivElement>, startFade: boolean }) {
  // Scroll handler for Learn More
  const handleLearnMore = useCallback(() => {
    const el = document.getElementById('problem-solution');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // fallback: try scrolling to a ref if you have one
    }
  }, []);

  return (
    <>
      {/* Left Card: Hero Content */}
      <motion.div
        className="relative z-10 bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-12 flex flex-row items-center shadow-2xl h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Left: Logo, name, tagline */}
        <div className="flex flex-col items-start justify-center flex-1 min-w-[220px] max-w-xl gap-8 px-6 self-center">
          <div className="relative flex flex-col items-start justify-center h-full w-full gap-6">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
            <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-6 w-full">
              <Image
                src="/logo-white.png"
                alt="asvara"
                width={220}
                height={220}
                className="mb-2 drop-shadow-xl"
                priority
              />
              <h2 className="text-white text-5xl font-bold font-roboto leading-tight">asvara</h2>
              <p className="text-gray-400 text-2xl font-normal">Legal Eagle On Board</p>
            </div>
          </div>
        </div>
        {/* Right: Main hero text, description, and buttons */}
        <div className="flex flex-col items-start justify-center flex-1 px-6 max-w-xl w-full gap-2">
          <h1 className="text-left text-3xl sm:text-5xl font-extrabold text-white max-w-lg mx-auto break-words space-y-1">
            <span className="leading-snug block">Revolutionizing</span>
            <span className="leading-snug block bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text whitespace-nowrap">Legal Work With</span>
            <span className="leading-snug block">AI Innovation</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-lg mx-auto">
            Cutting-edge AI solutions empowering legal professionals, law firms,
            and enterprises to work smarter and achieve more
          </p>
          <div className="flex flex-row gap-6 mt-8">
            <Link href="/auth/register" className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
              Get Started <HiArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={handleLearnMore}
              className="inline-flex items-center rounded-md border border-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
      {/* Right Card: Login Form */}
      <motion.div
        className="relative z-10 bg-gradient-to-b from-[#222] to-transparent rounded-3xl p-8 shadow-2xl h-full flex flex-col items-start justify-start"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: startFade ? 1 : 0, x: startFade ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6 mt-8">
            <HiHome className="text-white/70 h-5 w-5" />
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">User ID</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <a href="#" className="text-gray-400 text-sm hover:text-gray-300">
                Forgot ID / Password
              </a>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log In <HiArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-gray-400">or continue with</span>
            </div>
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Mail className="mr-2 h-5 w-5 text-gray-400" />
            Continue with Google
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function Hero({ onFadeStart, onFadeHalf }: HeroProps) {
  const { data: session } = useSession();
  const [loginMethod, setLoginMethod] = useState<'userId' | 'phone'>('userId');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
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
    setShowLoading(false);
    setStartLogoAnim(true);
  };

  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  const switchToUserId = () => {
    setLoginMethod('userId');
    setIsOtpSent(false);
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
        <div className={`relative z-10 container mx-auto px-6 ${!session?.user ? 'grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 pt-24 pb-0 items-stretch' : 'flex flex-col items-center justify-center pt-32 pb-16'}`}>
          {session?.user ? (
            <LoggedInHero logoRef={logoRef} startFade={startFade} />
          ) : (
            <LoggedOutHero logoRef={logoRef} startFade={startFade} />
          )}
        </div>
      </div>
    </>
  );
}
