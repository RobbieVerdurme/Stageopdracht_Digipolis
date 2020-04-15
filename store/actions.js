// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

// make queue for requests
const queue = []

// observe the queue 

/**
 * actions
 */
export default {
// ROUTE
    /**
    * get route from online (databasecall)
    */
  async setRoutepoints({ commit }){
    // eslint-disable-next-line no-useless-catch
    try{
        await axios.get('/route.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
            commit('setRoutepoints', data.features)
        })
    }catch(error){
        throw error
    }
  },

// POI
    async setPointsOfInterst({ commit }){
        // eslint-disable-next-line no-useless-catch
        try{
            await axios.get('/POI.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
                commit('setPointsOfInterst', data.features)
            })
        }catch(error){
            throw error
        }
    },

// SCANNER
    setScannerInfo ({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try{
      var api = axios.get('/scanner.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
        commit('setScannerInfo', data)
      })
      queue.push(api)
    }catch(error){
      throw error
    }
  }
}