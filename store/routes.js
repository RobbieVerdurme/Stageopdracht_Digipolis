// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * state
 */
export const state = () => ({
  routepoints: []
})

/**
 * getters
 */
export const getters = {
  /**
   * get first route in list
   * @param {*} state 
   */
  getRoute: (state) => {
    return state.routepoints[0]
  },

  /**
   * get all routes
   * @param {*} state 
   */
  getAllRoute: (state) => {
    return state.routepoints
  }
}

/**
 * mutations
 */
export const mutations = {
  /**
   * sets the route
   * @param {*} state 
   * @param {Array} payload 
   */
  setRoute(state, payload){
      state.routepoints = payload
  }
}

 /**
  * actions
  */
 export const actions = {
   /**
    * get route from online (databasecall)
    */
  async getRoute({ commit }){
    // eslint-disable-next-line no-useless-catch
    try{
        await axios.get('/route.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
            commit('setRoute', data.features)
        })
    }catch(error){
        throw error
    }
  }
}
