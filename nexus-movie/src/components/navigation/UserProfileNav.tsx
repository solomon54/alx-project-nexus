//src/components/navigation/UserProfileNav.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  LogIn,
  Settings,
  LogOut,
  Bookmark,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/classNames";

export default function UserProfileNav() {
  const { user, signOut, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-10 h-10 flex items-center justify-center bg-zinc-900/50 rounded-full border border-white/10">
        <Loader2 size={16} className="text-electric-cyan animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth")}
        className="flex items-center gap-3 bg-zinc-950 p-1.5 pr-5 rounded-full border border-white/20 hover:border-electric-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all group">
        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-electric-cyan transition-colors">
          <User size={18} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">
          Sign In
        </span>
      </button>
    );
  }

  const initial = user.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-1 pr-3 rounded-full transition-all duration-300",
          "bg-zinc-950 border border-electric-cyan/60 hover:border-electric-cyan",
          isOpen
            ? "border-electric-cyan ring-2 ring-electric-cyan/40 bg-zinc-900"
            : "shadow-xl"
        )}>
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border border-electric-cyan/50 flex items-center justify-center">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="Profile"
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <span className="text-electric-cyan font-black text-xs">
              {initial}
            </span>
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">
            {user.username}
          </p>
        </div>
        <ChevronDown
          size={14}
          className={cn(
            "text-zinc-500 transition-transform",
            isOpen && "rotate-180 text-electric-cyan"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={cn(
              "absolute right-0 mt-3 w-64 z-50 overflow-hidden",
              "bg-zinc-950/95 backdrop-blur-2xl",
              "rounded-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]",
              "before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/5 before:pointer-events-none" // Inner highlight
            )}>
            <div className="p-4 border-b border-white/10 bg-linear-to-b from-white/5 to-transparent">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-electric-cyan/80 mb-1">
                Verified Account
              </p>
              <p className="text-sm font-bold text-white truncate">
                {user.email}
              </p>
            </div>

            <div className="p-2 space-y-0.5">
              <DropdownItem
                icon={<User size={16} />}
                label="Profile"
                onClick={() => router.push("/profile")}
              />
              <DropdownItem
                icon={<Bookmark size={16} />}
                label="My Watchlist"
                onClick={() => router.push("/library")}
              />
              <DropdownItem
                icon={<Settings size={16} />}
                label="Settings"
                onClick={() => router.push("/profile?tab=account")}
              />
            </div>

            <div className="p-2 border-t border-white/10 bg-black/20">
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-[10px] font-black uppercase tracking-widest"
                onClick={() => signOut()}>
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.1em] group">
      <span className="text-zinc-500 group-hover:text-electric-cyan transition-colors">
        {icon}
      </span>
      {label}
    </button>
  );
}
