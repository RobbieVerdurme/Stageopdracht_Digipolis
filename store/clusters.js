// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * state
 */
export const state = () => ({
  clusterInfo: []
})

/**
 * getters
 */
export const getters = {}

/**
 * mutations
 */
export const mutations = {
  setClusters(state, payload) {
    state.clusterInfo = payload
  }
}

/**
 * actions
 */
export const actions = {
  async getClusters({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.get('/clusters.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
        commit('setClusters', data)
      })
    } catch (error) {
      throw error
    }
  }
}
