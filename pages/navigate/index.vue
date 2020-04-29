<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <client-only>
        <vMap :features.sync="features" :route.sync="route" class="map" @locationChanged="locationChanged" />
      </client-only>
      <nuxt-child />
    </section>
  </main>
</template>

<script>
export default {
  middleware: ['poi', 'route'],
  components: {
    vMap: () => import('~/components/organisms/vuelayersmap.vue')
  },
  /**
   * fetch method to get the featuers and routes
   */
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
      rangeFromPOI: 10,

      // map features
      features: this.$store.getters.getAllPointsOfIntrest,
      route: this.$store.getters.getAllRoutes,

      // position
      position: null
    }
  },
  watch: {
    /**
     * when position changed check if it is close to a poi
     */
    position () {
      this.showClosedPOI()
    }
  },
  methods: {
    /**
     * show poi if you are close to one
     */
    showClosedPOI () {
      for (const index in this.features) {
        // get the point from features
        const corPoint = this.features[index].geometry.coordinates
        // check if the poi is in range of the position
        const inRangeOfLongitude = this.between(this.position[0], corPoint[0] - this.rangeFromPOI, corPoint[0] + this.rangeFromPOI)
        const inRangeOfLangitude = this.between(this.position[1], corPoint[1] - this.rangeFromPOI, corPoint[1] + this.rangeFromPOI)

        // check if the poi is in range
        if (inRangeOfLongitude && inRangeOfLangitude) {
          // change nuxt child with the id of the item
          // this.$router.push({ name: 'navigate-index-id', params: { id: this.features[index].properties.volgnummer } })
          // break
          this.$toast.show('Je bent in de buurt van ' + this.features[index].properties.naam_nl, {
            action: {
              text: 'Toon',
              onClick: (e, toastobject) => {
                this.$router.push({ name: 'navigate-index-id', params: { id: this.features[index].properties.volgnummer } })
                toastobject.goAway(0)
              }
            },
            icon: {
              name: 'info'
            }
          })
        }
      }
    },
    /**
     * check if value is between min and max
     */
    between (x, min, max) {
      return x >= min && x <= max
    },
    /**
     * if location changes on map update location
     */
    locationChanged (value) {
      this.position = value
    }
  }
}
</script>
<style scoped>
.map {
    max-height: 20em;
}
@media screen and (min-width: 770px) {
  .map {
    max-height: 30em;
  }
}
</style>
