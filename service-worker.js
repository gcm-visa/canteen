const CACHE_NAME = 'chilleat-cache-v1';
const URLs_TO_CACHE = [
  '/canteen/',
  '/canteen/index.html',
  '/canteen/script.js',
  '/canteen/manifest.json',
  '/canteen/icon-192x192.png',
  '/canteen/icon-512x512.png'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLs_TO_CACHE))
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// Activate
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
