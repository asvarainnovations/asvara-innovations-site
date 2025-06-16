"use client";

import { Suspense } from "react";
import GavelLoading from "@/app/components/GavelLoading";

function SlowContent() {
  // Simulate a 3s delay
  return new Promise<JSX.Element>((resolve) => {
    setTimeout(() => {
      resolve(
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h1 className="text-4xl font-bold mb-4">Loading Demo Complete</h1>
          <p className="text-lg">
            This is what users see after the loading animation.
          </p>
        </div>
      );
    }, 3000);
  });
}

export default function LoadingDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#121212]">
          <GavelLoading />
        </div>
      }
    >
      <SlowContent />
    </Suspense>
  );
}
