"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  staticPreviewImage?: string;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 450,
  height = 300,
  quality = 90,
  staticPreviewImage,
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 2,
    "viewport.height": height * 2,
  });

  const previewUrl = staticPreviewImage || `https://api.microlink.io/?${params}`;

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <Image
            src={previewUrl}
            width={width}
            height={height}
            quality={quality}
            priority
            alt="hidden image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={0}
        closeDelay={200}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          asChild
          onMouseMove={handleMouseMove}
          className={cn("cursor-pointer", className)}
        >
          <div>{children}</div>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            side="top"
            align="center"
            sideOffset={10}
            className="z-50"
          >
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -20,
                    scale: 0.6,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    }
                  }}
                  className="shadow-xl rounded-xl"
                  style={{
                    x: translateX,
                  }}
                  onClick={handlePreviewClick}
                >
                  <div className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800">
                    <Image
                      src={previewUrl}
                      width={width}
                      height={height}
                      quality={quality}
                      priority
                      className="rounded-lg"
                      alt="Preview"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
}; 