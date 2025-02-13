"use client";

interface SectionDividerProps {
  type?: "top" | "bottom";
  from?: string;
  to?: string;
  className?: string;
}

export function SectionDivider({ 
  type = "bottom", 
  from = "from-gray-900", 
  to = "to-transparent",
  className = ""
}: SectionDividerProps) {
  return (
    <div 
      className={`absolute ${type === "top" ? "-top-32" : "-bottom-32"} left-0 right-0 h-64 pointer-events-none ${className}`}
      style={{
        background: `linear-gradient(${type === "top" ? "180deg" : "0deg"}, var(--tw-gradient-stops))`,
        backgroundImage: `linear-gradient(${type === "top" ? "180deg" : "0deg"}, ${from.replace('from-', '')} 0%, ${to.replace('to-', '')} 100%)`
      }}
    />
  );
} 