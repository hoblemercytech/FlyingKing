// Flying Kings Draughts — Service Worker
const CACHE_NAME = 'flying-kings-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/README.md',
  '/icon-192.png', 
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

// Install — cache all core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.log('Cache addAll partial fail (ok):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', e => {
  // Skip Supabase API calls — always need live network for multiplayer
  if (e.request.url.includes('supabase.co') ||
    e.request.url.includes('esm.sh')) {
    return;
  }
  
  e.respondWith(
    fetch(e.request)
    .then(response => {
      // Cache successful responses
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return response;
    })
    .catch(() => {
      // Offline fallback
      return caches.match(e.request).then(cached => {
        if (cached) return cached;
        // If navigating and no cache, return index
        if (e.request.mode === 'navigate') {
          return caches.match('/index.html') || caches.match('/');
        }
      });
    })
  );
});