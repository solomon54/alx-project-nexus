// src/app/manifest.ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Nexus Movie",
    short_name: "Nexus",
    description:
      "Nexus Movie is an AI-powered PWA for discovering, saving, and curating movies based on mood, taste, and intent.",

    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",

    background_color: "#000000",
    theme_color: "#00ffff",

    categories: ["entertainment", "movies", "lifestyle"],

    lang: "en",
    dir: "ltr",

    prefer_related_applications: false,

    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    screenshots: [
      {
        src: "/screens/PWAHomeDashboard-desk.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screens/MobileFirstPWA-mob.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
