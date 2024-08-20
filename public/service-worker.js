const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.ico'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serving cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return the response from the cache
      if (response) {
        return response;
      }
      // Cache miss - fetch the resource from the network
      return fetch(event.request);
    })
  );
});


self.addEventListener('updatefound', () => {
  const installingWorker = registration.installing;
  installingWorker.onstatechange = () => {
    if (installingWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        // New or updated content is available.
        console.log('New content is available; please refresh.');
      } else {
        // Content is cached for offline use.
        console.log('Content is cached for offline use.');
      }
    }
  };
});
