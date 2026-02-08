/* public/sw.js */

const VERSION = "v1.0.0";
const STATIC_CACHE = `nexus-static-${VERSION}`;
const RUNTIME_CACHE = `nexus-runtime-${VERSION}`;
const API_CACHE = `nexus-api-${VERSION}`;

const OFFLINE_FALLBACK = "/offline.html";

const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/favicon.ico",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

/* -------------------- INSTALL -------------------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

/* -------------------- ACTIVATE -------------------- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => ![STATIC_CACHE, RUNTIME_CACHE, API_CACHE].includes(key)
            )
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

/* -------------------- FETCH -------------------- */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /*  API: Network-first, cache fallback */
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  /*  Next.js static assets: Cache-first */
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/icons") ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|css|woff2?)$/)
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  /*  Pages: Network-first with offline fallback */
  event.respondWith(pageStrategy(request));
});

/* -------------------- STRATEGIES -------------------- */

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) return cached;

  const response = await fetch(request);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return cache.match(request);
  }
}

async function pageStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || caches.match(OFFLINE_FALLBACK);
  }
}
