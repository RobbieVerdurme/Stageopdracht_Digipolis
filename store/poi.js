// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/** 
 * state
 */
export const state = () => ({
    pointsOfInterst: []
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
    }
}

/** 
 * mutations
 */
export const mutations = {
    setPointsOfInterst(state, payload){
        state.pointsOfInterst = payload
    }
}

/**
 * actions
 */
export const actions = {
    async setPointsOfInterst({ commit }){
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