import React from "react";
import { cn } from "@/utils/classNames";
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "vibe" | "rating";
}

export const Badge = ({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-zinc-800 text-zinc-300",
    outline: "border border-white/20 text-white",

    vibe: "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20 uppercase tracking-widest text-[10px]",

    rating: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}>
      {children}
    </div>
  );
};
