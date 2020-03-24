// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/** 
 * state
 */
export const state = () => ({
    pointsOfInterst: []
  })

export const getters = {
  /**
   * get poi with id
   * @param {*} state 
   * @param {number} id 
   */
    getPOIDetailById: (state) => (id) => {
        return state.pointsOfInterst.find(p => p.properties.volgnummer === id)
    },

    /**
    * get all poi's
    * @param {*} state 
    */
    getAllPOIDetail: (state) => {
        return state.pointsOfInterst
    }
}

/** 
 * mutations
 */
export const mutations = {
    /**
     * set the pointofinterst with the gotten payload
     * @param {*} state 
     * @param {Array} payload 
     */
    setPointsOfInterst(state, payload){
        state.pointsOfInterst = payload
    }
}

/**
 * actions
 */
export const actions = {
    async getPointsOfInterst({ commit }){
        // eslint-disable-next-line no-useless-catch
        try{
            await axios.get('/POI.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
                commit('setPointsOfInterst', data.features)
            })
        }catch(error){
            throw error
        }
      }
  }