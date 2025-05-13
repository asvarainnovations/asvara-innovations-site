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
    <main className="min-h-screen bg-black">
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
