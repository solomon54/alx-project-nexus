"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/utils/classNames";

export default function PreferencesPanel() {
  const [notifications, setNotifications] = useState(true);
  const [region, setRegion] = useState("United States");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          System Notifications
        </label>
        <Toggle
          icon={<Bell size={16} />}
          label="Push Notifications"
          description="Alerts for new releases & library updates."
          value={notifications}
          onToggle={() => setNotifications(!notifications)}
        />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          Content Delivery
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-electric-cyan transition-colors">
            <Globe size={18} />
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={cn(
              "w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white text-sm appearance-none outline-none transition-all",
              "focus:border-electric-cyan/50 focus:ring-4 focus:ring-electric-cyan/10"
            )}>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Japan">Japan</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            <ChevronDown size={18} />
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 ml-1 italic">
          * This adjusts catalog availability based on your location.
        </p>
      </div>
    </motion.div>
  );
}

interface ToggleProps {
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
  icon?: React.ReactNode;
}

function Toggle({ label, description, value, onToggle, icon }: ToggleProps) {
  return (
    <div className="flex items-center justify-between bg-zinc-900/40 border border-white/5 p-5 rounded-[2rem] transition-all hover:border-white/10">
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={cn(
              "p-3 rounded-2xl transition-colors",
              value
                ? "bg-electric-cyan/10 text-electric-cyan"
                : "bg-zinc-800 text-zinc-500"
            )}>
            {icon}
          </div>
        )}
        <div>
          <h4 className="font-bold text-sm text-white tracking-tight">
            {label}
          </h4>
          <p className="text-[11px] text-zinc-500 leading-tight">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={cn(
          "relative w-12 h-6 rounded-full transition-colors duration-300 outline-none",
          value ? "bg-electric-cyan" : "bg-zinc-700"
        )}>
        <motion.span
          animate={{ x: value ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
        />
      </button>
    </div>
  );
}
