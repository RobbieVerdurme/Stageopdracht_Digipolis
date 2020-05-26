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
  async setPointsOfInterst ({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await this.$axios.$get('/api/node/artwork')
      commit('setPointsOfInterst', Converter.convertBackendDataPOI(data))
    } catch (error) {
      throw error
    }
  },
  /**
   * send feedback from user to server
   */
  async sendFeedback (context, feedback) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.$axios.$post('/api/blabla', { text: feedback })
    } catch (error) {
      throw error
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
