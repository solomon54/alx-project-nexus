"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bookmark, User, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/classNames";

const MainNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/search", icon: Search },
  { name: "My Library", href: "/library", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden">
        <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-3 pb-6">
          <div className="flex justify-between items-center">
            {MainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex flex-col items-center">
                  <item.icon
                    size={24}
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-electric-cyan" : "text-zinc-500"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] mt-1 font-medium transition-colors duration-300",
                      isActive ? "text-electric-cyan" : "text-zinc-500"
                    )}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-3 w-10 h-1 bg-electric-cyan rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <nav className="fixed left-0 top-16 bottom-0 w-20 lg:w-64 hidden sm:flex flex-col bg-black border-r border-white/5 z-50">
        <div className="p-6 flex items-center gap-3">
          <div className=" w-10 h-10 bg-electric-cyan rounded-lg flex items-center justify-center">
            <Clapperboard className="text-white" size={24} />
          </div>
          <span className="hidden lg:block font-bebas text-2xl tracking-tighter text-white">
            NEXUS
          </span>
        </div>

        <div className="flex-1 px-4 py-10 space-y-4">
          {MainNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                  isActive
                    ? "bg-zinc-900 text-electric-cyan"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                )}>
                <item.icon size={22} />
                <span className="hidden lg:block font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="absolute left-0 w-1 h-8 bg-electric-cyan rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4">
          <div className="hidden lg:block p-4 bg-zinc-900/50 border border-white/5 rounded-2xl">
            <p className="text-xs text-zinc-500 mb-2">Logged in as</p>
            <p className="text-sm font-semibold text-white truncate">
              Sarah Jenkins
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
