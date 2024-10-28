/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// Workbox가 프리캐시 매니페스트를 주입합니다
precacheAndRoute(self.__WB_MANIFEST);

// 책 이미지를 위한 커스텀 캐시 설정
registerRoute(
  ({ request }) => request.url.includes('/assets/books/'),
  new CacheFirst({
    cacheName: 'book-image-cache-v1'
  })
);

// 서비스 워커 활성화 시 이전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'book-image-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
