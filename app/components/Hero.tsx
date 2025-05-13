"use client";

import Image from "next/image";
import { HiHome } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";

interface HeroProps {
  onFadeStart?: () => void;
  onFadeHalf?: () => void;
}

export default function Hero({ onFadeStart, onFadeHalf }: HeroProps) {
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

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 pt-24 pb-0">
          {/* Left Column - Split into two sections */}
          <div className="relative z-10 bg-gradient-to-b from-[#111] to-transparent rounded-3xl p-8 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8 items-start mt-8">
              {/* Logo Section - logo is static, text is animated */}
              <div ref={logoRef} className="flex flex-col items-center text-center">
                <Image
                  src="/logo-white.png"
                  alt="asvara"
                  width={240}
                  height={240}
                  className="mb-8"
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
              {/* Main Content Section - animated */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startFade ? 1 : 0, y: startFade ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h1 className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[56px] font-bold leading-none text-white">Revolutionizing</span>
                    <div className="bg-white text-black px-4 py-1 text-[32px] font-bold">Legal Work With</div>
                  </div>
                  <div className="text-[56px] font-bold leading-none text-white">
                    AI Innovation
                  </div>
                </h1>

                <p className="text-gray-300 text-md">
                  Cutting-edge AI solutions empowering legal professionals, law
                  firms, and enterprises to work smarter and achieve more
                </p>

                <div className="flex gap-4">
                  <button className="relative bg-black/40 backdrop-blur-sm text-white px-8 py-3 rounded border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300">
                    Case Genius
                  </button>
                  <button className="relative bg-black/40 backdrop-blur-sm text-white px-8 py-3 rounded border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300">
                    Docbare
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <motion.div 
            className="relative z-10 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: startFade ? 1 : 0, x: startFade ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-gradient-to-b from-[#222] to-transparent rounded-3xl p-8 flex flex-col">
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
        </div>
      </div>
    </>
  );
}
