<template>
  <main class="news-overview-page">
    <section class="overview-layout flow-container">
      <div class="left">
        <nuxt-child style="margin-bottom:2em" />
        <client-only>
          <vMap :features.sync="features" :route.sync="route" :info-features="infoFeatures" class="map" @locationChanged="locationChanged" />
        </client-only>
      </div>
      <div v-if="visitedPoiList.length" class="right">
        <h2>Bezochte punten</h2>
        <collection :items="filterdVisitedPoiList" :navigate-to-page="'navigate-index-id'" />
        <button v-if="visitedPoiList.length > 5" class="button button-secondary" @click="readMoreClicked">
          Toon meer
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  middleware: ['poi', 'route'],
  components: {
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
    // check if getInfoPointsOfInterst in store is filled
    if (!store.getters.getInfoPointsOfInterst.length) {
    // get getInfoPointsOfInterst from online
      await store.dispatch('setInfoPointsOfInterst')
      this.infoFeatures = store.getters.getInfoPointsOfInterst
    }
  },
  data () {
    return {
      // configuration range
      rangeFromPOI: 0.001,

      // map features
      features: this.$store.getters.getAllPointsOfIntrest,
      route: this.$store.getters.getAllRoutes,
      infoFeatures: this.$store.getters.getInfoPointsOfInterst,

      // position
      position: null,
      accuracy: Number.MAX_VALUE,
      minAccuracy: 20,

      // list of visited poi
      visitedPoiList: [],
      filterdVisitedPoiList: [],

      // lees meer config
      offset: 0,
      limit: 5
    }
  },
  computed: {
    ...mapGetters(['getLocalStorageItem']),
    /**
     * create a boolean array if the point if visited
     */
    visited () {
      return this.getLocalStorageItem('visitedPOI')
    }
  },
  watch: {
    limit (value) {
      // give filterdlist this.limit items
      this.filterdVisitedPoiList = this.visitedPoiList.slice(this.offset, value)
    },
    /**
     * when position changed check if it is close to a poi
     */
    position () {
      this.showClosedPOI()
    }
  },
  mounted () {
    // request permissiton to give notification
    Notification.requestPermission()
    navigator.geolocation.watchPosition(this.locationChanged)

    // create a list of visited points
    if (this.visited.length) {
      this.visited.forEach((element) => {
        this.visitedPoiList.push(this.features.find(f => f.properties.volgnummer === element))
      })
      // fill filterd list for first time
      this.filterdVisitedPoiList = this.visitedPoiList.slice(this.offset, this.limit)
    }
  },
  methods: {
    ...mapMutations({
      setLocalstorage: 'setLocalStorageItem'
    }),
    /**
     * show poi if you are close to one
     */
    showClosedPOI () {
      this.features.forEach((element) => {
        // get the point from features
        const corPoint = element.geometry.coordinates
        const volgnummer = element.properties.volgnummer

        // check if the poi is in range of the position
        const inRangeOfLongitude = this.between(this.position[0], corPoint[0] - this.rangeFromPOI, corPoint[0] + this.rangeFromPOI)
        const inRangeOfLangitude = this.between(this.position[1], corPoint[1] - this.rangeFromPOI, corPoint[1] + this.rangeFromPOI)

        // check if the poi is in range
        if (inRangeOfLongitude && inRangeOfLangitude && !this.visited.includes(volgnummer) && this.accuracy < this.minAccuracy) {
          // set point to visited
          this.visited.push(volgnummer)
          this.visitedPoiList.push(element)

          // refresh filterdlist
          this.filterdVisitedPoiList = this.visitedPoiList.slice(this.offset, this.limit)

          // show notification
          navigator.serviceWorker.getRegistration().then((reg) => {
            const options = {
              body: 'Je bent in de buurt van ' + element.properties.naam_nl,
              data: {
                url: 'https://' + process.env.baseUrl + '/navigate/' + volgnummer
              },
              actions: [
                { action: 'visit', title: 'Bezoek' },
                { action: 'close', title: 'Sluit' }
              ]
            }
            reg.showNotification('Er is een nieuw punt in de buurt', options)
          })
        }
      })

      // set visited points
      const parsed = JSON.stringify(this.visited)
      this.setLocalstorage({
        item: 'visitedPOI',
        data: parsed
      })
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
      this.position = [value.coords.longitude, value.coords.latitude]
      this.accuracy = value.coords.accuracy
    },
    /**
     * add 5 items to the filterd list
     */
    readMoreClicked () {
      this.limit += 5
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
