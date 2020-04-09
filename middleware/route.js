export default async function ({ store }) {
    // check if routepoints is empty
    if(!store.state.routes.routepoints.length){
      // get routes
      await store.dispatch('routes/setRoutepoints')
    }
}