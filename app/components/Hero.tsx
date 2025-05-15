"use client";

import Image from "next/image";
import { HiHome } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

interface HeroProps {
  onFadeStart?: () => void;
  onFadeHalf?: () => void;
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

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => setStartFade(true)}>
        {showLoading && (
          <LoadingAnimation 
            onAnimationComplete={handleAnimationComplete}
            finalPosition={logoPosition}
          />
        )}
      </AnimatePresence>
      <div
        key="hero"
        className="min-h-[70vh] bg-black relative overflow-hidden"
        style={{ pointerEvents: showLoading ? 'none' : 'auto' }}
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
        <div className={`container mx-auto px-6 ${!session?.user ? 'grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 pt-24 pb-0' : 'flex flex-col items-center justify-center pt-32 pb-16'}`}>
          {/* For logged-in users: 30/70 split */}
          {session?.user ? (
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-10 shadow-2xl">
              {/* Left: Logo, name, tagline */}
              <div className="w-full md:w-[30%] flex flex-col items-center justify-center mb-8 md:mb-0">
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
                  <div ref={logoRef} className="relative z-10 flex flex-col items-center text-center">
                    <Image
                      src="/logo-white.png"
                      alt="asvara"
                      width={220}
                      height={220}
                      className="mb-6 drop-shadow-xl"
                      priority
                    />
                    <h2 className="text-white text-4xl font-medium font-roboto mb-2">asvara</h2>
                    <p className="text-gray-400 text-xl">Legal Eagle On Board</p>
                  </div>
                </div>
              </div>
              {/* Right: Main content */}
              <motion.div 
                className="space-y-8 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h1 className="space-y-2 text-center">
                  <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    <span className="text-white">Revolutionizing </span>
                    <span className="bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Legal Work</span>
                  </span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">with AI Innovation</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                  Cutting-edge AI solutions empowering legal professionals, law
                  firms, and enterprises to work smarter and achieve more
                </p>
                {/* Service Buttons: stack vertically on mobile, row on md+ */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full max-w-xs md:max-w-none mx-auto mt-6">
                  <button className="relative bg-black/40 backdrop-blur-sm text-white px-8 py-3 rounded border border-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 hover:border-accent/80 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    PleadSmart
                  </button>
                  <button className="relative bg-black/40 backdrop-blur-sm text-white px-8 py-3 rounded border border-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 hover:border-accent/80 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    DocBare
                  </button>
                  <button className="relative bg-black/40 backdrop-blur-sm text-white px-8 py-3 rounded border border-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 hover:border-accent/80 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    AI Court Room
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative z-10 bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-10 flex flex-col shadow-2xl">
              {/* Glowing/gradient logo background */}
              <div className="relative flex flex-col items-center mb-8">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-accent/40 via-blue-700/30 to-transparent blur-2xl animate-pulse z-0" />
                <div ref={logoRef} className="relative z-10 flex flex-col items-center text-center">
                  <Image
                    src="/logo-white.png"
                    alt="asvara"
                    width={240}
                    height={240}
                    className="mb-4 drop-shadow-xl"
                    priority
                  />
                  <motion.div
                    className="space-y-2 mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <h2 className="text-white text-3xl font-medium font-roboto">asvara</h2>
                    <p className="text-gray-400 text-lg">Legal Eagle On Board</p>
                  </motion.div>
                </div>
              </div>
              {/* Main Content Section - animated */}
              <motion.div 
                className={`space-y-8`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h1 className="space-y-2 text-center">
                  <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    <span className="text-white">Revolutionizing </span>
                    <span className="bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Legal Work With</span>
                  </span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">AI Innovation</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                  Cutting-edge AI solutions empowering legal professionals, law
                  firms, and enterprises to work smarter and achieve more
                </p>
                <div className="flex gap-6 justify-center mt-8">
                  <button className="relative bg-accent/90 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:bg-accent transition-all duration-300">
                    Case Genius
                  </button>
                  <button className="relative bg-white/10 text-white px-10 py-4 rounded-xl font-semibold text-lg border border-accent shadow-lg hover:scale-105 hover:bg-accent/80 hover:text-white transition-all duration-300">
                    Docbare
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          {/* Right Column - Login Form (only if not logged in) */}
          {!session?.user && (
            <motion.div 
              className="relative z-10 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: startFade ? 1 : 0, x: startFade ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="bg-gradient-to-b from-[#222] to-transparent rounded-3xl p-8 flex flex-col shadow-xl">
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
                      type="button" 
                      className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                      Log In
                      <HiArrowRight className="h-4 w-4 text-white/70" />
                    </button>
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-gray-400">or continue with</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Continue with Google
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
