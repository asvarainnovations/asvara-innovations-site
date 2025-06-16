"use client";
import React, { useRef, useEffect } from "react";
import Image from 'next/image';

// Animation timing (ms)
const timing = {
  windup: 700,   // gavel up
  strike: 250,   // swing down
  rest: 1200,    // hold on base
  reset: 400,    // swing back up
};
const total = timing.windup + timing.strike + timing.rest + timing.reset;

export default function GavelLoading({ className = "", size = 340 }: { className?: string; size?: number }) {
  const gavelRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = (ts - start) % total;
      let rotate = -28;
      // Animation: windup -> strike -> rest -> reset
      if (elapsed < timing.windup) {
        // Windup (gavel up)
        rotate = -28;
      } else if (elapsed < timing.windup + timing.strike) {
        // Strike (rotate down)
        const p = (elapsed - timing.windup) / timing.strike;
        rotate = -28 + 38 * p; // -28deg to +10deg
      } else if (elapsed < timing.windup + timing.strike + timing.rest) {
        // Rest (hold on base)
        rotate = 10;
      } else {
        // Reset (rotate back up)
        const p = (elapsed - timing.windup - timing.strike - timing.rest) / timing.reset;
        rotate = 10 - 38 * p; // +10deg to -28deg
      }
      if (gavelRef.current) {
        gavelRef.current.setAttribute(
          "transform",
          `rotate(${rotate} 320 220)` // pivot at gavel head center
        );
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-16 h-16">
        <Image
          src="/gavel.svg"
          alt="Loading gavel"
          width={64}
          height={64}
          className="animate-bounce"
          priority
        />
      </div>
    </div>
  );
}