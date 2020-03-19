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
export const getters = {
  /**
   * get cluster with id
   * @param {*} state 
   * @param {number} id 
   */
  getClusterById: (state) => (id) => {
    return state.clusterInfo.find(c => c.id === id)
  },

  /**
   * get all clusters
   * @param {*} state 
   */
  getAllClusters: (state) => {
    return state.clusterInfo
  },

/**
 * get the max length from the arrray clusterinfo
 * @param {*} state 
 */
  getLengthClusters: (state) =>{
    return state.clusterInfo.length
  }
}

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
      await axios.get('/clusters.json', {proxy: {host: 'localhost', port: '3000'}}).then(({ data }) => {
        commit('setClusters', data)
      })
    } catch (error) {
      throw error
    }
  }
}
