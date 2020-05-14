/* eslint-disable no-undef */
const savePostResponsePlugin = {
  // eslint-disable-next-line require-await
  cacheKeyWillBeUsed: async ({ request, mode }) => {
    if (mode === 'write') {
      // Use the same URL as `POST` request as the cache key.
      // Alternatively, use a different URL.
      return request.url
    }
  }
}

workbox.routing.registerRoute(
  new RegExp('/api/*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'apiCache',
    plugins: [
      // Add the custom plugin to your strategy.
      savePostResponsePlugin,
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24
      })
    ]
  }),
  'POST'
)
