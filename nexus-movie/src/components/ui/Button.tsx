// src/components/ui/Button.tsx
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classNames";
import Loader from "./Loader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cinema-black",
      "disabled:opacity-60 disabled:pointer-events-none",
      fullWidth && "w-full"
    );

    const variants = {
      primary:
        "bg-netflix-red hover:bg-red-700 text-white focus:ring-electric-cyan",
      secondary:
        "bg-surface-grey hover:bg-zinc-700 text-white border border-surface-grey/50 focus:ring-electric-cyan",
      outline:
        "border border-metadata-grey/60 hover:border-white/70 bg-transparent text-white focus:ring-electric-cyan",
      ghost:
        "bg-transparent hover:bg-surface-grey/80 text-white focus:ring-electric-cyan",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {isLoading ? <Loader size="sm" className="mr-2" /> : children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
