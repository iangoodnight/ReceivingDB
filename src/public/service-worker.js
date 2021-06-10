const CACHE_NAME = 'receiving-db';

const toCache = [
  '/',
  '/browse?start=6',
  '/login',
  '/search',
  '/javascripts/status.js',
  '/javascripts/browse.js',
  '/javascripts/login.js',
  '/javascripts/logout.js',
  '/javascripts/new.js',
  '/javascripts/pwa.js',
  '/javascripts/reset.js',
  '/javascripts/search.js',
  '/javascripts/user.js',
  '/javascripts/userForm.js',
  '/javascripts/view.js',
  '/stylesheets/main.css',
  '/stylesheets/main.css.map',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .catch((err) => console.log(err))
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
