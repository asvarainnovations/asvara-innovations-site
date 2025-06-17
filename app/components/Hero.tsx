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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-8 justify-center items-center">
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
      {/* Main container for hero cards */}
      <motion.div
        className="relative z-10 bg-gradient-to-b from-[#111] to-transparent rounded-3xl flex flex-col md:flex-row items-center md:items-stretch shadow-2xl h-full p-4 xs:p-6 md:p-12 gap-4 md:gap-0 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Left: Logo, name, tagline */}
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl gap-2 xs:gap-4 sm:gap-8 px-2 xs:px-4 sm:px-6 md:px-8 py-4 md:py-0 self-center">
          <div className="relative flex flex-col items-center justify-center h-full w-full gap-2 xs:gap-4 sm:gap-6">
            <div className="absolute -inset-1 xs:-inset-2 sm:-inset-10 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
            <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-1 xs:gap-2 sm:gap-6 w-full">
              <Image
                src="/logo-white.png"
                alt="asvara"
                width={60}
                height={60}
                className="mb-1 xs:mb-2 sm:mb-2 drop-shadow-xl w-[48px] xs:w-[70px] sm:w-[120px] md:w-[220px] h-auto"
                priority
                sizes="(max-width: 400px) 48px, (max-width: 640px) 70px, (max-width: 1024px) 120px, 220px"
              />
              <h2 className="text-white text-lg xs:text-xl sm:text-3xl md:text-5xl font-bold font-roboto leading-tight">asvara</h2>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-lg md:text-2xl font-normal">Legal Eagle On Board</p>
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8 w-full">
            <Link href="/auth/register" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer w-full sm:w-auto">
              Get Started <HiArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={handleLearnMore}
              className="inline-flex items-center justify-center rounded-md border border-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer w-full sm:w-auto"
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
          <div className="my-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-600" />
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 border-t border-gray-600" />
            </div>
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Login with Google
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
