<template>
  <div>
    <client-only>
      <VueLayersMap :features.sync="features" :route.sync="route" />
    </client-only>
    <Cta style="margin: 2rem;" />
  </div>
</template>

<script>
export default {
  components: {
    VueLayersMap: () => import('~/components/organisms/vuelayersmap'),
    Cta: () => import('~/components/molecules/cta')
  },
  async fetch ({ store }) {
    if (!store.getters['poi/getAllPointsOfIntrest'].length) {
      // get poi
      await store.dispatch('poi/setPointsOfInterst')
      this.features = store.getters['poi/getAllPointsOfIntrest']
    }

    if (!store.getters['routes/getAllRoutes'].length) {
      // get route
      await store.dispatch('routes/setRoutepoints')
      this.route = store.getters['routes/getAllRoutes']
    }
  },
  data () {
    return {
      features: this.$store.getters['poi/getAllPointsOfIntrest'],
      route: this.$store.getters['routes/getAllRoutes']
    }
  }
}
</script>
