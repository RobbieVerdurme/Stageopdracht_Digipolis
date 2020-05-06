<template>
  <main class="news-overview-page">
    <section class="overview-layout flow-container">
      <div class="left">
        <nuxt-child style="margin-bottom:2em" />
        <client-only>
          <vMap :features.sync="features" :route.sync="route" class="map" @locationChanged="locationChanged" />
        </client-only>
      </div>
      <div v-if="visitedPoiList.length" class="right">
        <h3>Bezochte punten</h3>
        <collection :items="filterdVisitedPoiList" />
        <pagination
          :items="visitedPoiList"
          :current-page="currentPage"
          :limit-total-pages="pageLimit"
          :to-page="$route.name"
          @updateFilterdItems="updateFilterdItems"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  middleware: ['poi', 'route'],
  components: {
    pagination: () => import('~/components/molecules/pagination'),
    collection: () => import('~/components/organisms/collection'),
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
      position: null,

      // list of visited poi
      visitedPoiList: [],
      filterdVisitedPoiList: [],

      // settings to configure pagination
      currentPage: null,
      pageLimit: 0
    }
  },
  computed: {
    visited () {
      return localStorage.getItem('visitedPOI') ? JSON.parse(localStorage.getItem('visitedPOI')) : [...Array(this.features.length)].map((x) => { return false })
    }
  },
  watch: {
    $route () {
      this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    },
    /**
     * when position changed check if it is close to a poi
     */
    position () {
      this.showClosedPOI()
    }
  },
  created () {
    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
  },
  mounted () {
    if (localStorage.visitedPOI) {
      const visited = JSON.parse(localStorage.getItem('visitedPOI'))
      for (const index in visited) {
        if (visited[index]) {
          this.visitedPoiList.push(this.features[index])
        }
      }
      this.pageLimit = this.visitedPoiList.length > 10 ? 3 : this.visitedPoiList.length > 5 ? 2 : 0
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
        if (inRangeOfLongitude && inRangeOfLangitude && !this.visited[index]) {
          this.visited[index] = true
          this.visitedPoiList.push(this.features[index])
          this.pageLimit = this.visitedPoiList.length > 10 ? 3 : this.visitedPoiList.length > 5 ? 2 : 0
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
      const parsed = JSON.stringify(this.visited)
      localStorage.setItem('visitedPOI', parsed)
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
    },
    updateFilterdItems (value) {
      this.filterdVisitedPoiList = value
    }
  }
}
</script>
<style scoped>
.map {
    max-height: 30em;
}
.flow-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0;
}
.flow-container > * {
  margin-bottom: 2rem;
  width: 100%;
}

.flow-container > .left {
  position: relative;
  font-size: .8rem;
  min-height: 7rem;
}

@media screen and (min-width: 770px) {
  .flow-container > .left {
  width: calc(8.4rem + (100% - 13.2rem)/12*8);
}
.flow-container > .right {
  width: calc(3.6rem + (100% - 13.2rem)/12*4);
  padding: 1.2rem;
}
}
</style>
