const CACHE_NAME = 'obsupport-pwa-20260908-sophia-v12';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './maskable-512.png',
  './docs/device-manual.pdf',
  './docs/user-guide.pdf',
  './manual-pages/device/page-1.png',
  './manual-pages/device/page-2.png',
  './manual-pages/device/page-3.png',
  './manual-pages/device/page-4.png',
  './manual-pages/device/page-5.png',
  './manual-pages/guide/page-1.png',
  './manual-pages/guide/page-2.png',
  './manual-pages/guide/page-3.png',
  './manual-pages/guide/page-4.png',
  './manual-pages/guide/page-5.png',
  './manual-pages/guide/page-6.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  var sameOrigin = url.origin === self.location.origin;

  // ページ本体はオンライン時に最新版を優先し、失敗時だけキャッシュへフォールバック。
  if (event.request.mode === 'navigate' && sameOrigin) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copy);
          cache.put('./index.html', response.clone());
        });
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // 同一オリジンの静的ファイルはキャッシュ優先。未保存時は取得して保存。
  if (sameOrigin) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
          }
          return response;
        });
      })
    );
  }
});
