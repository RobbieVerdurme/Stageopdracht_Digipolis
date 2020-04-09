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
  middleware: 'poi',
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
