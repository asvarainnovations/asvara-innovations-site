"use client";

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react'
import ProblemSolutionSection from './components/ProblemSolutionSection';
import FeaturesGrid from './components/FeaturesGrid';
import HowItWorksSection from './components/HowItWorksSection';
import ScreenshotsCarousel from './components/ScreenshotsCarousel';
import CallToActionBanner from './components/CallToActionBanner';

export default function Home() {
  const [startFade, setStartFade] = useState(false);
  const [startTransforming, setStartTransforming] = useState(false);

  const handleHeroComplete = () => {
    // Add a small delay before starting Transforming section animation
    setTimeout(() => {
      setStartTransforming(true);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>
      {/* <Navbar animateIn={startFade} /> */}
      <Hero 
        onFadeStart={() => setStartFade(true)} 
        onFadeHalf={handleHeroComplete}
      />
      <ProblemSolutionSection />
      <FeaturesGrid />
      <HowItWorksSection />
      {/* <ScreenshotsCarousel /> */}
      <CallToActionBanner />
      <a href="/blogs" className="block mt-8 text-lg font-bold text-blue-600 underline hover:text-blue-800">Visit our Blog</a>
      <Footer />
    </main>
  )
}
