// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/** 
 * state
 */
export const state = () => ({
    pointsOfInterst: [],
    selectedPointOfIntrest: {}
  })

/**
 * getters
 */
export const getters = {
    /**
     * get all points of intrest
     */
    getAllPointsOfIntrest: (state) => {
        return state.pointsOfInterst
    },

    /**
    * get all poi's
    * @param {*} state 
    */
    getAllPOIDetail: (state) => {
        return state.pointsOfInterst
    },

    /**
     * get max length of list of poi
     */
    getMaxLengthPOI: (state) => {
        return state.pointsOfInterst.length
    },

    /**
     * get poi with id
     */
    getPOIDetailById: (state) => (id) => {
        return state.pointsOfInterst.find(p => p.properties.volgnummer === id)
    },

    /**
     * get selected poi
     */
    getSelectedPOI: (state) => {
        return state.selectedPointOfIntrest
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
    },

    /**
     * set the current selected poi this is for the hero-img on the header
     * @param {*} state 
     * @param {Object} payload 
     */
    setCurrentPOI(state, payload){
        state.selectedPointOfIntrest = payload
    }
}

/**
 * actions
 */
export const actions = {
    async setPointsOfInterst({ commit }){
        // eslint-disable-next-line no-useless-catch
        try{
            await axios.get('/POI.json', {proxy: {host: process.env.baseUrl, port: process.env.port}}).then(({ data }) => {
                commit('setPointsOfInterst', data.features)
            })
        }catch(error){
            throw error
        }
      }
  }