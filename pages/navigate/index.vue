<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <client-only>
        <vMap :features.sync="features" :route.sync="route" class="map" />
      </client-only>
      <nuxt-child :item="item" />
    </section>
  </main>
</template>

<script>
export default {
  components: {
    vMap: () => import('~/components/organisms/vuelayersmap.vue')
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
      // configuration range
      rangeFromPOI: 50,

      // selected poi
      item: {},

      // map features
      features: this.$store.getters.getAllPointsOfIntrest,
      route: this.$store.getters.getAllRoutes
    }
  },
  mounted () {
    navigator.geolocation.watchPosition(this.showClosedPOI)
  },
  methods: {
    showClosedPOI (position) {
      for (const index in this.features) {
        const corPoint = this.features[index].geometry.coordinates
        if (this.between(corPoint[0], position.coords.latitude - this.rangeFromPOI, position.coords.longitude + this.rangeFromPOI) && this.between(corPoint[1], position.coords.latitude - this.rangeFromPOI, position.coords.longitude + this.rangeFromPOI)) {
          this.item = this.features[index]
          this.$router.push({ name: 'navigate-index-poi' })
        }
      }
    },
    between (x, min, max) {
      return x >= min && x <= max
    }
  }
}
</script>
<style scoped>
.map {
    max-height: 30em;
}
</style>
