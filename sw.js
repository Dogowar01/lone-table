const CACHE = 'lone-table-v1';
const ASSETS = [
  '/lone-table/',
  '/lone-table/index.html',
  '/lone-table/sw.js',
  '/lone-table/manifest.webmanifest',
  '/lone-table/bg.png',
  '/lone-table/icon-192.png',
  '/lone-table/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
