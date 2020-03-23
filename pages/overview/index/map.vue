<template>
  <div>
    <client-only>
      <VueLayersMap :features="features" :route="route" />
    </client-only>
    <Cta />
  </div>
</template>

<script>
export default {
  async fetch({ store }){
    // get poi
    store.dispatch('poi/setPointsOfInterst')

    // get route
    store.dispatch('routes/setRoutepoints')
  },
  components: {
    VueLayersMap: ()=> import('~/components/organisms/vuelayersmap.vue'),
    Cta: () => import('~/components/molecules/cta.vue')
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
