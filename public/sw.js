const CACHE_NAME = 'swasthai-v1'
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ))
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  if (e.request.url.includes('/api/')) return // Don't cache API calls
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200) return response
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone))
        return response
      }).catch(() => caches.match('/'))
    })
  )
})

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || { title: 'SwasthAI', body: 'New notification' }
  self.registration.showNotification(data.title, {
    body: data.body, icon: '/favicon.svg', badge: '/favicon.svg',
    tag: 'swasthai', renotify: true
  })
})