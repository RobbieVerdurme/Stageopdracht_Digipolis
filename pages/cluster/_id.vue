<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="cluster" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
      <Programme :munten="cluster.munten" />
    </section>
  </main>
</template>

<script>
export default {
  components: {
    Info: () => import('~/components/molecules/info'),
    Programme: () => import('~/components/organisms/programme')
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    cluster () {
      return this.$store.state.clusters.all.find(c => c.id === this.id)
    }
  }
}
</script>
