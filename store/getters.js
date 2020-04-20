/**
 * getters
 */
export default {
// POI
  /**
     * get all points of intrest
     */
  getAllPointsOfIntrest: (state) => {
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
  getPOIDetailById: state => (id) => {
    return state.pointsOfInterst.find(p => p.properties.volgnummer === id)
  },

  /**
     * get selected poi
     */
  getSelectedPOI: (state) => {
    return state.selectedPointOfIntrest
  },

  // ROUTE
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
  },

  // SCANNER
  /**
   * get scanner info
   */
  getScannerInfo: (state) => {
    return state.scannerInfo
  }
}
