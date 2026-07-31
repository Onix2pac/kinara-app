// ══════════════════════════════════════
// KINARA v24 — Service Worker
// Estrategia: Cache-first para assets, network-first para navegación
// ══════════════════════════════════════

const CACHE_NAME = 'kinara-v24';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap'
];

// Instalar — pre-cachear assets esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activar — limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — Network-first para API/datos, cache-first para assets estáticos
self.addEventListener('fetch', event => {
  // Ignorar requests que no son GET
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // ── NETWORK-ONLY: API de Supabase y version.json NUNCA se cachean ──
  if (url.includes('supabase.co') || url.includes('version.json')) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('{"error":"offline"}', {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // ── NETWORK-FIRST: navegación (HTML) ──
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('./')))
    );
    return;
  }

  // ── CACHE-FIRST: solo assets estáticos (CSS, fuentes, imágenes) ──
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./');
        }
      });
    })
  );
});
