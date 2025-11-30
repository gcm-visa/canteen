// Install & Activate
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

// Simple fetch handler (online-only)
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => {
    return new Response("You are offline. Please check your connection.");
  }));
});
