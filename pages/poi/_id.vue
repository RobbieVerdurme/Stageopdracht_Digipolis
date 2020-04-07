<template>
  <main class="info-page">
    <section class="detail-layout">
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
      await store.dispatch('poi/setPointsOfInterst')
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
      id: this.$route.params.id
    }
  },
  computed: {
    poi () {
      return this.$store.getters['poi/getPOIDetailById'](this.id)
    }
  }
}
</script>
