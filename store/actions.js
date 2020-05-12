// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * axios configuration queue
 * https://medium.com/@matthew_1129/axios-js-maximum-concurrent-requests-b15045eb69d0
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
      await axios.get('/route.json', { proxy: { host: process.env.baseUrl, port: process.env.port } }).then(({ data }) => {
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
      await axios.get('https://licht18qa.stad.gent/jsonapi/node/artwork').then(({ data }) => {
        const dataFeatures = []
        for (const index in data.data) {
          const el = data.data[index]
          dataFeatures.push({
            type: 'Feature',
            id: el.id,
            geometry: {
              type: el.attributes.field_coordinates.geo_type,
              coordinates: [el.attributes.field_coordinates.lon, el.attributes.field_coordinates.lat]
            },
            geometry_name: 'SHAPE',
            properties: {
              volgnummer: el.attributes.field_index,
              naam_nl: el.attributes.title,
              omschrijving_nl: el.attributes.field_introduction.value,
              detail_nl: el.attributes.field_main_content.value,
              link_nl: el.attributes.field_website.uri,
              symbol: null
            }
          })
        }
        commit('setPointsOfInterst', dataFeatures)
      })
    } catch (error) {
      throw error
    }
  },

  /**
   * send feedback from user to server
   */
  async sendFeedback (context, feedback) {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.post('/api/blabla', { text: feedback })
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
      await axios.get('/scanner.json', { proxy: { host: process.env.baseUrl, port: process.env.port } }).then(({ data }) => {
        commit('setScannerInfo', data)
      })
    } catch (error) {
      throw error
    }
  }
}
