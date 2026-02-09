"use client";

import { User, Shield, Settings, LucideIcon } from "lucide-react";
import { cn } from "@/utils/classNames";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export default function ProfileTabs({ active, onChange }: any) {
  return (
    <nav className="flex items-center gap-1 md:gap-2 p-1.5 bg-zinc-900/50 border border-white/5 rounded-full overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 rounded-full transition-all whitespace-nowrap",
              "text-[10px] md:text-xs font-black uppercase tracking-widest",
              isActive
                ? "bg-electric-cyan text-black shadow-lg"
                : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}>
            <Icon size={16} />
            <span className={cn(isActive ? "block" : "hidden md:block")}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
