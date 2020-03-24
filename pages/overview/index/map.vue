<template>
  <div>
    <client-only>
      <VueLayersMap :features.sync="features" :route.sync="route" />
    </client-only>
    <Cta />
  </div>
</template>

<script>
export default {
  async fetch({ store }){
    if(!store.getters['poi/getAllPointsOfIntrest'].length){
      // get poi
      store.dispatch('poi/setPointsOfInterst')
    }

    if(!store.getters['routes/getAllRoutes'].length){
      // get route
      store.dispatch('routes/setRoutepoints')
    }
  },
  components: {
    VueLayersMap: ()=> import('~/components/organisms/vuelayersmap'),
    Cta: () => import('~/components/molecules/cta')
  },
  computed: {
    features () {
      return this.$store.getters['poi/getAllPointsOfIntrest']
    },
    route () {
      return this.$store.getters['routes/getAllRoutes']
    }
  }
}
</script>

<style>

</style>
