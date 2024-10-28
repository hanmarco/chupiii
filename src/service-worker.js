/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// GitHub Pages의 base URL을 고려한 경로 설정
const BASE_URL = '/chupiii';

// 기본 프리캐시
precacheAndRoute(self.__WB_MANIFEST);

// assets 폴더의 모든 리소스를 캐시하는 함수
async function cacheAssets() {
  const cache = await caches.open('assets-cache-v1');
  
  try {
    // assets 매니페스트 파일 가져오기
    const manifestResponse = await fetch(`${BASE_URL}/asset-manifest.json`);
    const manifest = await manifestResponse.json();
    
    // assets 경로에 있는 모든 파일 필터링
    const assetUrls = Object.values(manifest)
      .filter(path => path.startsWith('/assets/'))
      .map(path => BASE_URL + path);

    // 모든 assets 파일 캐시
    await cache.addAll(assetUrls);
    console.log('All assets cached successfully');
  } catch (error) {
    console.error('Failed to cache assets:', error);
  }
}

// 서비스 워커 설치 시 assets 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(cacheAssets());
});

// assets 요청에 대한 캐시 우선 전략
registerRoute(
  ({ request }) => request.url.includes('/assets/'),
  new CacheFirst({
    cacheName: 'assets-cache-v1'
  })
);

// 기타 정적 리소스에 대한 캐시 전략
registerRoute(
  ({ request }) => 
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font',
  new CacheFirst({
    cacheName: 'static-resources-v1'
  })
);

// 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!['assets-cache-v1', 'static-resources-v1'].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
