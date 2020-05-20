<template>
  <div>
    <client-only>
      <VueLayersMap :features.sync="features" :route.sync="route" :info-features="infoFeatures" />
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

    // check if getInfoPointsOfInterst in store is filled
    if (!store.getters.getInfoPointsOfInterst.length) {
    // get getInfoPointsOfInterst from online
      await store.dispatch('setInfoPointsOfInterst')
      this.infoFeatures = store.getters.getInfoPointsOfInterst
    }
  },
  data () {
    return {
      features: this.$store.getters.getAllPointsOfIntrest,
      route: this.$store.getters.getAllRoutes,
      infoFeatures: this.$store.getters.getInfoPointsOfInterst
    }
  }
}
</script>
