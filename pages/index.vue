<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <Info :item="item" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
      <Cta />
    </section>
  </main>
</template>

<script>
export default {
  components: {
    Info: () => import('~/components/molecules/info'),
    Cta: () => import('~/components/molecules/cta')
  },
  computed: {
    item () {
      return this.$store.state.routes.routeinfo[0]
    }
  }
}
</script>
