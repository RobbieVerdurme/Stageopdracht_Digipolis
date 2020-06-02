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
      const data = await this.$axios.$get(`/api/node/artwork/${id}/field_hero_image`)
      const split = data.data.attributes.uri.url.split('artwork')
      const fieldImage = process.env.APIUrl + split[0] + '/styles/teaser_rectangle_400x285/public/artwork' + split[1]
      const heroImage = 'https://lichtfestival-2018.stad.gent' + split[0] + '/styles/hero_1440x440/public/artwork' + split[1]
      await commit('setImagePoi', { id, fieldImage, heroImage })
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
