/* eslint-disable no-undef */
// import { Queue } from 'workbox-background-sync'

const queue = new workbox.backgroundSync.Queue()
//  new Queue('myQueueName', {
//   // onSync: {}, // Function that gets invoked whenever the 'sync' event fires
//   maxRetentionTime: 24 * 60 // max time to live before removed in the queue IN MINUTES
// })

self.addEventListener('fetch', (event) => {
  // Clone the request to ensure it's safe to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone()).catch((err) => {
    console.log(err)
    return queue.pushRequest({ request: event.request })
  })

  event.waitUntil(promiseChain)
})
