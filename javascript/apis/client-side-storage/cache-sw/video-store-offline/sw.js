self.addEventListener('install', e => {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.html',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.js',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/style.css'
     ]);
   })
 );
});

self.addEventListener('fetch', e => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
