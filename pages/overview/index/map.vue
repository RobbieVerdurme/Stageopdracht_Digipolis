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
    if (!store.getters.getAllPointsOfIntrest.length) {
      // get poi
      await store.dispatch('setPointsOfInterst')
      this.features = store.getters.getAllPointsOfIntrest
    }

    if (!store.getters.getAllRoutes.length) {
      // get route
      await store.dispatch('setRoutepoints')
      this.route = store.getters.getAllRoutes
    }
  },
  data () {
    return {
      features: this.$store.getters.getAllPointsOfIntrest,
      route: this.$store.getters.getAllRoutes
    }
  }
}
</script>
