"use client";

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react'
import ProblemSolutionSection from './components/ProblemSolutionSection';
import ProductSection from './components/ProductSection';
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
      <ProductSection />
      <FeaturesGrid />
      <HowItWorksSection />
      {/* <ScreenshotsCarousel /> */}
      {/* <CallToActionBanner /> */}
      <Footer />
    </main>
  )
}
