<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <Info :item="item.properties" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
      <Cta />
    </section>
  </main>
</template>

<script>
export default {
  async fetch({ store }){
    // check if routepoints is empty
    if(!store.state.routes.routepoints.length){
      // get routes
      await store.dispatch('routes/getRoute')
    }
  },
  components: {
    Info: () => import('~/components/molecules/info'),
    Cta: () => import('~/components/molecules/cta')
  },
  computed: {
    item () {
      /**
       * get routeinfo
       */
      return this.$store.getters['routes/getRoute']
    }
  }
}
</script>
