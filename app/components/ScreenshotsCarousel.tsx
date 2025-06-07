"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const screenshots = [
  {
    src: "/images/search-interface.png",
    caption: "AI-Powered Search"
  },
  {
    src: "/images/drafting-interface.png",
    caption: "Automated Draft Editor"
  },
  {
    src: "/images/alert-dashboard.png",
    caption: "Real-Time Alert Dashboard"
  }
];

export default function ScreenshotsCarousel() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative w-full py-20 px-4 bg-black/90">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2 initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.7}} viewport={{once:true}} className="text-3xl md:text-4xl font-bold text-white text-center mb-12">See It In Action</motion.h2>
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button onClick={()=>setActive((active-1+screenshots.length)%screenshots.length)} className="absolute left-0 z-10 p-2 text-white/70 hover:text-[#007BFF] transition-colors">
            &#8592;
          </button>
          {/* Screenshot */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} transition={{duration:0.4}} className="w-full flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#181c24] w-full max-w-2xl mx-auto mb-4">
                <img src={screenshots[active].src} alt={screenshots[active].caption} className="w-full h-72 object-cover" />
              </div>
              <div className="text-gray-300 text-base text-center mb-2">{screenshots[active].caption}</div>
            </motion.div>
          </AnimatePresence>
          {/* Right Arrow */}
          <button onClick={()=>setActive((active+1)%screenshots.length)} className="absolute right-0 z-10 p-2 text-white/70 hover:text-[#007BFF] transition-colors">
            &#8594;
          </button>
        </div>
        {/* Navigation Dots */}
        <div className="flex gap-2 mt-4">
          {screenshots.map((_, idx) => (
            <button key={idx} onClick={()=>setActive(idx)} className={`w-3 h-3 rounded-full ${active===idx ? 'bg-[#007BFF]' : 'bg-gray-500/50'} transition-colors`} />
          ))}
        </div>
      </div>
    </section>
  );
} 