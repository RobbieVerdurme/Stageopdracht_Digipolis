<template>
  <div>
    <VueLayersMap />
    <Cta />
  </div>
</template>

<script>
export default {
    async fetch({ store }){
    // check if pointsOfInterst is emtpy
    if(!store.state.poi.pointsOfInterst.length){
      // get poi
      store.dispatch('poi/getPointsOfInterst')
    }

    // check if routepoints is empty
    if(!store.state.routes.routepoints.length){
      // get route
      store.dispatch('routes/getRoute')
    }

  },
  components: {
    VueLayersMap: () => import('~/components/organisms/vuelayersmap.vue'),
    Cta: () => import('~/components/molecules/cta.vue')
  }
}
</script>

<style>

</style>
