// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * axios configuration queue
 */
// config props
const MAX_REQUESTS_COUNT = 5
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0

/**
 * Axios Request Interceptor
 */
axios.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
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
axios.interceptors.response.use(function (response) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.resolve(response)
}, function (error) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.reject(error)
})

/**
 * actions
 */
export default {
  // ROUTE
  /**
    * get route from online (databasecall)
    */
  async setRoutepoints ({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.get('/route.json', { proxy: { host: '127.0.0.1', port: '3000' } }).then(({ data }) => {
        commit('setRoutepoints', data.features)
      })
    } catch (error) {
      throw error
    }
  },

  // POI
  /**
   * get points of intrest from online (databasecall)
   * @param {*} param0
   */
  async setPointsOfInterst ({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.get('/POI.json', { proxy: { host: '127.0.0.1', port: '3000' } }).then(({ data }) => {
        commit('setPointsOfInterst', data.features)
      })
    } catch (error) {
      throw error
    }
  },

  // SCANNER
  /**
   * get scanner info from online (databasecall)
   * @param {*} param0
   */
  async setScannerInfo ({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.get('/scanner.json', { proxy: { host: '127.0.0.1', port: '3000' } }).then(({ data }) => {
        commit('setScannerInfo', data)
      })
    } catch (error) {
      throw error
    }
  }
}
