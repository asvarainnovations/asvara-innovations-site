"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent/90",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        outline: "border-2 border-accent/20 text-white hover:bg-accent/10",
        ghost: "bg-transparent text-accent hover:bg-accent/10",
        heroPrimary: "bg-accent/90 text-white shadow-lg hover:scale-105 hover:bg-accent transition-all duration-300",
        heroSecondary: "bg-white/10 text-white border border-accent shadow-lg hover:scale-105 hover:bg-accent/80 hover:text-white transition-all duration-300",
        service: "bg-black/40 backdrop-blur-sm text-white border border-accent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 hover:border-accent/80 hover:bg-accent/10 transition-all duration-300",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-6",
        lg: "h-12 px-8 text-lg",
        hero: "px-6 py-2 text-base rounded-xl font-semibold",
        service: "px-6 py-2 rounded text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {props.children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 