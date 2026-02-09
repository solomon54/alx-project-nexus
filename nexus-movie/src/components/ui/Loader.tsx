// src/components/ui/Loader.tsx
"use client";

import { cn } from "@/utils/classNames";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "cyan" | "white" | "red";
  className?: string;
}

export default function Loader({
  size = "md",
  color = "cyan",
  className,
}: LoaderProps) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colors = {
    cyan: "border-electric-cyan/30 border-t-electric-cyan",
    white: "border-white/30 border-t-white",
    red: "border-netflix-red/30 border-t-netflix-red",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full",
        sizes[size],
        colors[color],
        "border-solid border-t-transparent",
        className
      )}
    />
  );
}
