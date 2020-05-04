/**
 * mutations
 */
export default {
  // PWA
  setInstallable (state, payload) {
    state.installable = payload
  },
  setInstallablePrompt (state, payload) {
    state.installablePrompt = payload
  },
  // ROUTE
  /**
   * sets the route
   * @param {*} state
   * @param {Array} payload
   */
  setRoutepoints (state, payload) {
    state.routepoints = payload
  },

  // POI
  /**
     * set the pointofinterst with the gotten payload
     * @param {*} state
     * @param {Array} payload
     */
  setPointsOfInterst (state, payload) {
    state.pointsOfInterst = payload
  },

  /**
     * set the current selected poi this is for the hero-img on the header
     * @param {*} state
     * @param {Object} payload
     */
  setCurrentPOI (state, payload) {
    state.selectedPointOfIntrest = payload
  },

  // SCANNER
  /**
   * Set scanner info
   * @param {*} state
   * @param {Object} payload
   */
  setScannerInfo (state, payload) {
    state.scannerInfo = payload
  }
}
