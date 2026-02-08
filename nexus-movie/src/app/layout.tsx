// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import Providers from "./providers";
import MainNavigation from "@/components/navigation/MainNavigation";
import { InstallPWA } from "@/components/navigation/InstallPWA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Nexus Movie | AI Discovery",
    template: "%s | Nexus Movie",
  },
  description: "Advanced AI-powered movie discovery and library management.",
  applicationName: "Nexus Movie",

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nexus Movie",
  },

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: "Nexus Movie",
    title: "Nexus Movie",
    description: "Tailor your cinema experience with AI.",
    images: [{ url: "/og-image.png" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexus Movie",
    description: "AI-Powered Movie Discovery",
  },

  icons: {
    icon: "/icon-192x192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning>
      <body className="bg-black text-white antialiased selection:bg-electric-cyan selection:text-black">
        <Providers>
          {/* Floating Install CTA */}
          <InstallPWA />

          {/* Global Navigation */}
          <MainNavigation />

          {/* App Content */}
          <main className="sm:ml-20 lg:ml-64 pb-24 sm:pb-0 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
