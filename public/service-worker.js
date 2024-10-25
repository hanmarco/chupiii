// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('image-cache').then((cache) => {
        return cache.addAll([
          // 여기에 캐시할 파일들 추가
          '/assets/bok_001/page-01.png',
          '/assets/bok_001/page-02.png',
          // 기타 필요한 정적 파일들 추가
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  