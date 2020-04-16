// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * state
 */
export const state = () => ({
  scannerInfo: {}
})

/**
 * getters
 */
export const getters = {
  /**
   * get scanner info
   */
  getScannerInfo: (state) => {
    return state.scannerInfo
  }
}

/**
 * mutations
 */
export const mutations = {
  /**
   * Set scanner info
   * @param {*} state
   * @param {Object} payload
   */
  setScannerInfo (state, payload) {
    state.scannerInfo = payload
  }
}

/**
 * actions
 */
export const actions = {
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
