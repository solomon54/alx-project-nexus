// src/app/robot.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/_next/", "/onboarding"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
    ],
    sitemap: "https://nexus-movie.app/sitemap.xml",
    host: "https://nexus-movie.app",
  };
}
