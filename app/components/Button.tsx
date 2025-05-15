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
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-6",
        lg: "h-12 px-8 text-lg",
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