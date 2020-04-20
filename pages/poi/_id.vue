<template>
  <main v-touch="{left: () => swipe('Left'), right: () => swipe('Right')}" class="info-page">
    <section class="detail-layout">
      <Info :item="poi.properties" />
      <div>
        <nuxt-link :to="{name: 'overview-index-map'}" class="button button-secondary">
          Bekijk op kaart
        </nuxt-link>
      </div>
      <feedback />
      <ul>
        <li>
          <nuxt-link v-if="previousPoi > 0 " :to="{name: 'poi-id', params: {'id': nextPoi}}" class="standalone-link back">
            Vorige
          </nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="nextPoi <= maxlength" :to="{name: 'poi-id', params: {'id': previousPoi}}" class="standalone-link right">
            Volgende
          </nuxt-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    Info: () => import('~/components/molecules/info'),
    feedback: () => import('~/components/molecules/feedback')
  },
  data () {
    return {
      /**
       * id of the cluster
       */
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    poi () {
      return this.$store.getters.getPOIDetailById(this.id)
    },
    // get max length of poi list
    maxlength () {
      return this.$store.getters.getMaxLengthPOI
    },
    // next poi
    nextPoi () {
      return this.id + 1
    },
    // vorig poi
    previousPoi () {
      return this.id - 1
    }
  },
  created () {
    this.$store.commit('setCurrentPOI', this.poi)
  },
  created () {
    this.$store.commit('poi/setCurrentPOI', this.poi)
  },
  methods: {
    swipe (direction) {
      // check if direction is left and there is a previous poi
      if (direction === 'Left' && this.previousPoi > 0) {
        this.$router.push({ name: 'poi-id', params: { id: this.previousPoi } })

        // check if the direction is right and there is a next poi
      } else if (direction === 'Right' && this.nextPoi <= this.maxlength) {
        this.$router.push({ name: 'poi-id', params: { id: this.nextPoi } })
      }
    }
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
ul li {
  display: inline;
}
.right{
  right: 0px;
  position: absolute;
}
</style>
