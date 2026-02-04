//src/components/ui/AuthInput.tsx
import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AuthInput = ({ label, ...props }: AuthInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-wider text-metadata-grey">
      {label}
    </label>
    <input
      {...props}
      className="bg-cinema-black border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition"
    />
  </div>
);
