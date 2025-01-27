/* eslint-disable handle-callback-err */
/* eslint-disable no-undef */
// ADD TO QUEUE
const queue = new workbox.backgroundSync.Queue('offlineQueue', {
  maxRetentionTime: 24 * 60 // In MINUTES
})

self.addEventListener('fetch', (event) => {
  // Clone the request to ensure it's safe to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone()).catch((err) => {
    return queue.pushRequest({ request: event.request })
  })

  event.waitUntil(promiseChain)
})

// SYNC EVENT
self.addEventListener('sync', function (event) {
  if (event.tag === 'offlineQueue') {
    queue.replayRequests()
  }
})
