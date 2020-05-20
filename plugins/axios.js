/**
 * axios configuration queue
 * https://medium.com/@matthew_1129/axios-js-maximum-concurrent-requests-b15045eb69d0
 * https://axios.nuxtjs.org/helpers.html#interceptors
 */
// config props
const MAX_REQUESTS_COUNT = 5
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0

export default function ({ $axios, redirect }) {
/**
* Axios Request Interceptor
*/
  $axios.onRequest((config) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
          PENDING_REQUESTS++
          clearInterval(interval)
          resolve(config)
        }
      }, INTERVAL_MS)
    })
  })

  /**
   * Axios Response Interceptor
   */
  $axios.onResponse((response) => {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.resolve(response)
  }, function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.reject(error)
  })
}
