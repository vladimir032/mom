const CACHE_NAME = 'wish-app-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Устанавливаем service worker и кешируем начальные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активируем service worker и чистим старые кэши если есть
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', name);
            return caches.delete(name);
          }
        })
      ))
  );
});

// Перехватываем запросы и пробуем отдать из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // если в кэше нашлось — возвращаем
        if (response) return response;
        // иначе грузим из сети
        return fetch(event.request);
      })
  );
});
