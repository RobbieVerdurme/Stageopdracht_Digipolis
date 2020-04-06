<template>
  <main class="info-page">
    <section class="detail-layout">
      <figure>
        <img v-if="!imageError" :src="poi.properties.symbol" :alt="poi.properties.naam_nl" :onerror="imageError = true">
        <div v-else class="image-wrapper" data-ratio="8:5"><img src="http://example.com/broken-url.jpg" :alt="poi.properties.naam_nl" /></div>
      </figure>
      <Info :item="poi.properties" />
      <div>
        <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
          Bekijk op kaart
        </nuxt-link>
      </div>

      <div>
          <nuxt-link v-if="previousPoi > 0 " :to="{name: 'poi-id', params: {'id': this.id + 1}}" class="button button-primary left icon-arrow-left"> Vorige</nuxt-link>
          <nuxt-link v-if="nextPoi <= maxlength" :to="{name: 'poi-id', params: {'id': this.id - 1}}" class="button button-primary right icon-arrow-right">Volgende</nuxt-link>
      </div>
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
    },
    // get max length of poi list
    maxlength () {
      return this.$store.getters['poi/getMaxLengthPOI']
    },
    // next poi
    nextPoi () {
      return this.id + 1
    },
    // vorig poi
    previousPoi () {
      return this.id - 1
    }
  }
}
</script>
<style scoped>
.left {
  left: 0px;
  position: absolute !important;
}
.right {
  right: 0px;
  position: absolute !important;
}
</style>
