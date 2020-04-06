<template>
  <main class="info-page">
    <section class="detail-layout">
      <figure>
        <img v-if="!imageError" :src="poi.properties.symbol" :alt="poi.properties.naam_nl" :onerror="imageError = true">
        <div v-else class="image-wrapper" data-ratio="8:5"><img src="http://example.com/broken-url.jpg" :alt="poi.properties.naam_nl" /></div>
      </figure>
      <Info :item="poi.properties" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
    </section>
  </main>
</template>

<script>
export default {
  async fetch ({ store }) {
    //check if pointsOfInterst in store is filled
    if(!store.state.poi.pointsOfInterst.length){
      // get pointsOfInterst from online
      await store.dispatch('poi/getPointsOfInterst')
    }
  },
  components: {
    Info: () => import('~/components/molecules/info'),
  },
  data () {
    return {
      /**
       * id of the cluster
       */
      id: this.$route.params.id,
      imageError: false
    }
  },
  computed: {
    poi () {
      return this.$store.getters['poi/getPOIDetailById'](this.id)
    }
  }
}
</script>
