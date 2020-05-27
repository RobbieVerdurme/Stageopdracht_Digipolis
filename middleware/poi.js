export default async function ({ store }) {
  // check if pointsOfInterst in store is filled
  if (!store.getters.getAllPointsOfIntrest.length) {
    // get pointsOfInterst from online
    await store.dispatch('setPointsOfInterest')
  }
}
