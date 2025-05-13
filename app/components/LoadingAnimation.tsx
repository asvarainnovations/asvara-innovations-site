"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingAnimationProps {
  onAnimationComplete: () => void;
  finalPosition: {
    x: number;
    y: number;
    width: number;
  };
}

const LoadingAnimation = ({ onAnimationComplete, finalPosition }: LoadingAnimationProps) => {
  const initialSize = 500;
  const finalScale = finalPosition.width / initialSize;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ 
          scale: finalScale,
          x: `${finalPosition.x}vw`,
          y: finalPosition.y
        }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          ease: "easeInOut"
        }}
        onAnimationComplete={onAnimationComplete}
      >
        <Image
          src="/logo-white.png"
          alt="asvara"
          width={initialSize}
          height={initialSize}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation; 