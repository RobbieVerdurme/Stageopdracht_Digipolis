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
  },

  /**
   * get all points of intrest
   */
  getAllRoutes: (state) => {
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
  setRoutepoints(state, payload){
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
  async setRoutepoints({ commit }){
    // eslint-disable-next-line no-useless-catch
    try{
        await axios.get('/route.json', {proxy: {host: process.env.baseUrl, port: process.env.port}}).then(({ data }) => {
            commit('setRoutepoints', data.features)
        })
    }catch(error){
        throw error
    }
  }
}
