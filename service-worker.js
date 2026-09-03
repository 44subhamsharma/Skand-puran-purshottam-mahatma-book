/*
  Service worker for नीलाचल पाठागार (offline reader).

  HOW TO USE THIS WHEN YOU DEPLOY THE REAL SITE:
  1. Put this file, manifest.json, index.html, and a /books/ folder
     containing book b1.pdf (Part 1) and b2.pdf (Part 2) all in the same
     folder on your web server (must be served over https:// — or
     http://localhost during testing — for service workers to be allowed
     to run at all; this is a browser security rule, not something we can
     work around).
  2. Update PRECACHE_URLS below if you rename any files.
  3. The very first time a visitor opens the site online, this file caches
     the app shell and both PDFs. After that, the books and the reading UI
     keep working even with no internet connection.
*/

const CACHE_NAME = "neelachal-patagar-v1";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./books/b1.pdf",
  "./books/b2.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((err) => {
        // If a book file isn't there yet at build time, don't block
        // installation of the rest of the app shell.
        console.warn("Some files could not be pre-cached:", err);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first, falling back to network, and quietly saving anything new
// (fonts, pdf.js from the CDN, etc.) so the next offline visit has it too.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // offline and not cached — nothing more we can do
    })
  );
});

