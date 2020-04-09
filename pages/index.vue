<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="item.properties" />
      <div>
        <nuxt-link :to="{name: 'overview-index-map'}" class="button button-secondary">
          Bekijk op kaart
        </nuxt-link>
      </div>
      <Cta />
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'route',
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
