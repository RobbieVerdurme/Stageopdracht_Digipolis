export default async function ({ store }) {
  // check if getInfoPointsOfInterst in store is filled
  if (!store.getters.getInfoPointsOfInterst.length) {
    // get getInfoPointsOfInterst from online
    await store.dispatch('setInfoPointsOfInterst')
  }
}
