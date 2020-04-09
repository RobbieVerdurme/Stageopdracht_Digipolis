export default async function ({ store }) {
    //check if pointsOfInterst in store is filled
    if (!store.state.poi.pointsOfInterst.length) {
      // get pointsOfInterst from online
      await store.dispatch('poi/setPointsOfInterst')
    }
}