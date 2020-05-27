import Converter from '~/converter/convertBackendPoiData.js'

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
      const data = await this.$axios.$get('/route.json')
      commit('setRoutepoints', data.features)
    } catch (error) {
      throw error
    }
  },

  // POI
  /**
   * get points of intrest from online (databasecall)
   * @param {*} param0
   */
  async setPointsOfInterest ({ commit, dispatch }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$axios.$get('/api/node/artwork')
      await commit('setPointsOfInterest', Converter.convertBackendDataPOI(data))
      await Promise.all(data.map(({ id }) => dispatch('setImage', id)))
    } catch (error) {
      throw error
    }
  },
  /**
   * gets the image from the poi
   * @param {*} param0
   * @param {number} id
   */
  async setImage ({ commit }, id) {
    try {
      const data = await this.$axios.$get(`/api/node/artwork/${id}/field_images?ResourceVersion=id%3A340`)
      const url = 'https://licht18qa.stad.gent' + data.data[0].attributes.uri.url
      await commit('setImagePoi', { id, data: url })
    } catch (error) {
      throw new Error(error)
    }
  },
  /**
   * send feedback from user to server
   */
  async sendFeedback (context, feedback) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.$axios.$post('https://httpbin.org/anything', { text: feedback })
    } catch (error) {
      throw error
    }
  },

  // INFO
  async setInfoPointsOfInterst ({ commit }) {
    try {
      const data = await this.$axios.$get('/api/node/facility')
      commit('setInfoPointsOfInterst', Converter.convertBackendDataInfoPOI(data))
    } catch (error) {
      throw new Error(error)
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
      const data = await this.$axios.$get('/scanner.json')
      commit('setScannerInfo', data)
    } catch (error) {
      throw error
    }
  }
}
