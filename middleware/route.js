export default async function ({ store }) {
    // check if routepoints is empty
    if(!store.state.routepoints.length){
      // get routes
      await store.dispatch('setRoutepoints')
    }
}