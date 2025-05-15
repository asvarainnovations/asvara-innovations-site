"use client";

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Transforming from './components/Transforming'
import Footer from './components/Footer'
import { useState } from 'react'

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
      <Navbar animateIn={startFade} />
      <Hero 
        onFadeStart={() => setStartFade(true)} 
        onFadeHalf={handleHeroComplete}
      />
      <Transforming startAnimation={startTransforming} />
      <Footer />
    </main>
  )
}
