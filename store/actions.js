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
      const dataFeatures = []
      for (const index in data.data) {
        const el = data.data[index]
        dataFeatures.push({
          type: 'Feature',
          id: el.id,
          geometry: {
            type: el.attributes.field_coordinates.geo_type,
            coordinates: [el.attributes.field_coordinates.lon, el.attributes.field_coordinates.lat]
          },
          geometry_name: 'SHAPE',
          properties: {
            volgnummer: el.attributes.field_index,
            naam_nl: el.attributes.title,
            omschrijving_nl: el.attributes.field_introduction.value,
            detail_nl: el.attributes.field_main_content.value,
            link_nl: el.attributes.field_website.uri,
            symbol: null
          }
        })
      }
      commit('setPointsOfInterst', dataFeatures)
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
