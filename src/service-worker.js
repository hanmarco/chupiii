/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// GitHub Pages의 base URL을 고려한 경로 설정
const BASE_URL = '/chupiii';

// Workbox 프리캐시 설정
precacheAndRoute(self.__WB_MANIFEST);

// 책 이미지를 위한 커스텀 캐시 설정
registerRoute(
  ({ request }) => request.url.includes(`${BASE_URL}/assets/books/`),
  new CacheFirst({
    cacheName: 'book-image-cache-v1'
  })
);

// 서비스 워커 스코프 내의 모든 요청에 대한 기본 캐시 전략
registerRoute(
  ({ request }) => request.destination === 'script' ||
                   request.destination === 'style' ||
                   request.destination === 'image',
  new CacheFirst({
    cacheName: 'static-resources'
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
